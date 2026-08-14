import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export async function ensureContentSchema() {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS content_entries (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, type TEXT NOT NULL, slug TEXT NOT NULL, title TEXT NOT NULL, summary TEXT DEFAULT '' NOT NULL, body TEXT DEFAULT '' NOT NULL, category TEXT DEFAULT 'General' NOT NULL, image_url TEXT DEFAULT '' NOT NULL, link_url TEXT DEFAULT '' NOT NULL, status TEXT DEFAULT 'draft' NOT NULL, published_at INTEGER, updated_at INTEGER NOT NULL)`).run();
  const columns = await env.DB.prepare("PRAGMA table_info(content_entries)").all<{ name: string }>();
  if (!columns.results.some(column => column.name === "link_url")) {
    await env.DB.prepare("ALTER TABLE content_entries ADD COLUMN link_url TEXT DEFAULT '' NOT NULL").run();
  }
  await env.DB.batch([
    env.DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS content_entries_slug_unique ON content_entries (slug)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_content_entries_type_status ON content_entries (type, status)"),
  ]);
}
