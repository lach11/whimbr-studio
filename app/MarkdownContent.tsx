"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

function youtubeId(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return /^[\w-]{11}$/.test(parsed.pathname.slice(1)) ? parsed.pathname.slice(1) : null;
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(parsed.hostname)) {
      const id = parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:embed|shorts)\/([\w-]{11})/)?.[1];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }
  } catch { return null; }
  return null;
}

export default function MarkdownContent({ source, className = "markdown-content" }: { source: string; className?: string }) {
  return <div className={className}><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSanitize]} components={{
    img({src,alt}) { const id = alt?.startsWith("youtube:") ? youtubeId(src) : null; if (id) { const title = alt?.slice(8).trim() || "YouTube video"; return <figure className="video-embed"><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/><figcaption><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Watch {title} on YouTube ↗</a></figcaption></figure> } return <img src={src} alt={alt || ""} loading="lazy"/> },
    a({href,children}) { return <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>{children}</a> }
  }}>{source}</ReactMarkdown></div>;
}
