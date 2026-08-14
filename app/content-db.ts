import { and, desc, eq } from "drizzle-orm";
import { ensureContentSchema, getDb } from "../db";
import { contentEntries } from "../db/schema";

export async function getPublished(type:"project"|"post"|"support"|"map"|"course"|"faq"){
  try{await ensureContentSchema();return await getDb().select().from(contentEntries).where(and(eq(contentEntries.type,type),eq(contentEntries.status,"published"))).orderBy(desc(contentEntries.publishedAt));}catch{return []}
}
export async function getPublishedBySlug(type:"project"|"post"|"map",slug:string){
  try{await ensureContentSchema();const [entry]=await getDb().select().from(contentEntries).where(and(eq(contentEntries.type,type),eq(contentEntries.slug,slug),eq(contentEntries.status,"published"))).limit(1);return entry||null}catch{return null}
}
