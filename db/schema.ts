import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentEntries = sqliteTable("content_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["project", "post", "support"] }).notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  body: text("body").notNull().default(""),
  category: text("category").notNull().default("General"),
  imageUrl: text("image_url").notNull().default(""),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("idx_content_entries_type_status").on(table.type, table.status)]);
