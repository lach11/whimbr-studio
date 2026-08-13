/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  MEDIA: R2Bucket;
  SITE_OWNER_EMAIL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/media" && request.method === "POST") {
      const email = request.headers.get("oai-authenticated-user-email")?.toLowerCase();
      const isLocal = url.hostname === "localhost";
      if (!isLocal && (!env.SITE_OWNER_EMAIL || email !== env.SITE_OWNER_EMAIL.toLowerCase())) return Response.json({ error: "Owner access required" }, { status: 403 });
      const data = await request.formData(); const file = data.get("file"); const alt = String(data.get("alt") || "").trim();
      if (!(file instanceof File)) return Response.json({ error: "Choose an image" }, { status: 400 });
      const extensions: Record<string,string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }; const ext = extensions[file.type];
      if (!ext) return Response.json({ error: "Only JPEG, PNG and WebP images are allowed" }, { status: 415 });
      if (file.size > 10 * 1024 * 1024) return Response.json({ error: "Images must be 10 MB or smaller" }, { status: 413 });
      const bytes = new Uint8Array(await file.arrayBuffer()); const text = new TextDecoder();
      const valid = (file.type === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8) || (file.type === "image/png" && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) || (file.type === "image/webp" && text.decode(bytes.slice(0,4)) === "RIFF" && text.decode(bytes.slice(8,12)) === "WEBP");
      if (!valid) return Response.json({ error: "The file content does not match its image type" }, { status: 415 });
      const key = `blog/${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${ext}`;
      await env.MEDIA.put(key, bytes, { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" }, customMetadata: { alt } });
      return Response.json({ url: `/api/media/${key}`, alt });
    }

    if (url.pathname.startsWith("/api/media/") && request.method === "GET") {
      const key = url.pathname.slice("/api/media/".length); const object = await env.MEDIA.get(key);
      if (!object) return new Response("Not found", { status: 404 }); const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("etag", object.httpEtag); headers.set("x-content-type-options", "nosniff"); headers.set("content-security-policy", "default-src 'none'; img-src 'self'"); return new Response(object.body, { headers });
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
