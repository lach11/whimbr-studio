import { and, desc, eq } from "drizzle-orm";
import { ensureContentSchema, getDb } from "../../../db";
import { contentEntries } from "../../../db/schema";
import { canManage } from "../../admin-access";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") as "project" | "post" | "support" | "map" | "course" | null;
  const admin = url.searchParams.get("admin") === "1" && await canManage(request);
  try {
    await ensureContentSchema();
    const db = getDb();
    const filters = [admin ? undefined : eq(contentEntries.status, "published"), type ? eq(contentEntries.type, type) : undefined].filter(Boolean);
    const rows = await db.select().from(contentEntries).where(filters.length ? and(...filters as ReturnType<typeof eq>[]) : undefined).orderBy(desc(contentEntries.updatedAt));
    return Response.json({ entries: rows });
  } catch { return Response.json({ entries: [] }); }
}

export async function POST(request: Request) {
  if (!await canManage(request)) return Response.json({ error: "Owner access required" }, { status: 403 });
  const input = await request.json() as Record<string, string | number>;
  const title = String(input.title || "").trim();
  const slug = String(input.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")).trim();
  if (!title || !slug || !["project", "post", "support", "map", "course"].includes(String(input.type))) return Response.json({ error: "Title, type and slug are required" }, { status: 400 });
  const values = { type: input.type as "project"|"post"|"support"|"map"|"course", slug, title, summary: String(input.summary || ""), body: String(input.body || ""), category: String(input.category || "General"), imageUrl: String(input.imageUrl || ""), linkUrl: String(input.linkUrl || ""), status: input.status === "published" ? "published" as const : "draft" as const, publishedAt: input.status === "published" ? new Date() : null, updatedAt: new Date() };
  await ensureContentSchema(); const db = getDb();
  const id = Number(input.id || 0);
  const [entry] = id ? await db.update(contentEntries).set(values).where(eq(contentEntries.id, id)).returning() : await db.insert(contentEntries).values(values).returning();
  return Response.json({ entry });
}

export async function DELETE(request: Request) {
  if (!await canManage(request)) return Response.json({ error: "Owner access required" }, { status: 403 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "Valid id required" }, { status: 400 });
  await ensureContentSchema(); await getDb().delete(contentEntries).where(eq(contentEntries.id, id));
  return Response.json({ ok: true });
}
