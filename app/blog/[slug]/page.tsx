import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "../../components";
import { getPublished, getPublishedBySlug } from "../../content-db";
import MarkdownContent from "../../MarkdownContent";

export const dynamic="force-dynamic";

export default async function Article({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const managed=await getPublishedBySlug("post",slug); if(!managed)notFound();
  const post={...managed,excerpt:managed.summary,date:managed.publishedAt?.toLocaleDateString("en-AU")||"Recently",read:"5 min read"};
  const related=(await getPublished("post")).filter(item=>item.slug!==slug).slice(0,2).map(item=>({...item,read:"5 min read"}));
  return <Page><article className="article">
    <header className="article-head shell"><Link href="/blog" className="back">Blog › {post.category}</Link><div className="article-heading-grid"><div><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="lede">{post.excerpt}</p><div className="author"><span className="logo-mark">W</span><b>Whimbr Studio</b><small>{post.date} · {post.read}</small></div></div></div></header>
    {managed.imageUrl?<img className="article-cover real-cover shell" src={managed.imageUrl} alt=""/>:<div className="article-cover shell"/>}
    <div className="article-layout shell"><div className="article-body"><MarkdownContent source={managed.body}/></div>
    <aside className="article-sidebar" aria-label="Article information"><div className="sidebar-card"><p className="eyebrow">Article details</p><dl><div><dt>Category</dt><dd>{post.category}</dd></div><div><dt>Published</dt><dd>{post.date}</dd></div><div><dt>Reading time</dt><dd>{post.read}</dd></div></dl><a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`I thought you might enjoy this article: https://whimbr.studio/blog/${slug}`)}`}>Share by email ↗</a></div><div className="sidebar-related"><p className="eyebrow">Keep reading</p>{related.map(item=><Link href={`/blog/${item.slug}`} key={item.slug}><span>{item.category}</span><b>{item.title}</b><small>{item.read}</small></Link>)}<Link href="/blog" className="all-notes">View all articles →</Link></div></aside></div>
  </article></Page>
}
