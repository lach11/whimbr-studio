import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "../../components";
import { posts } from "../../content";
import { getPublishedBySlug } from "../../content-db";
import MarkdownContent from "../../MarkdownContent";

export function generateStaticParams(){return posts.map(({slug})=>({slug}));}
export const dynamic="force-dynamic";

export default async function Article({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const managed=await getPublishedBySlug("post",slug); const base=posts.find(p=>p.slug===slug); if(!managed&&!base)notFound();
  const post=managed?{...managed,excerpt:managed.summary,date:managed.publishedAt?.toLocaleDateString("en-AU")||"Recently",read:"5 min read"}:base!;
  const related=posts.filter(item=>item.slug!==slug).slice(0,2);
  return <Page><article className="article">
    <header className="article-head shell"><Link href="/blog" className="back">Blog › {post.category}</Link><div className="article-heading-grid"><div><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="lede">{post.excerpt}</p><div className="author"><span className="logo-mark">W</span><b>Whimbr Studio</b><small>{post.date} · {post.read}</small></div></div></div></header>
    {managed?.imageUrl?<img className="article-cover real-cover shell" src={managed.imageUrl} alt=""/>:<div className="article-cover shell"/>}
    <div className="article-layout shell"><div className="article-body">{managed?<MarkdownContent source={managed.body}/>:<><p className="intro">The best small tools rarely announce their complexity. They meet a specific need, fit naturally into a person’s day and then quietly get out of the way.</p><h2>Begin with the useful part</h2><p>It is tempting to start a new project by listing everything it could become. A better place to begin is the smallest meaningful change it can make for someone.</p><blockquote>Good editing is a form of generosity: less to learn, less to manage and more room for the thing that matters.</blockquote><h2>Clarity is part of the craft</h2><p>A clear product does not need to be plain or impersonal.</p></>}</div>
    <aside className="article-sidebar" aria-label="Article information"><div className="sidebar-card"><p className="eyebrow">Article details</p><dl><div><dt>Category</dt><dd>{post.category}</dd></div><div><dt>Published</dt><dd>{post.date}</dd></div><div><dt>Reading time</dt><dd>{post.read}</dd></div></dl><a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`I thought you might enjoy this article: https://whimbr.studio/blog/${slug}`)}`}>Share by email ↗</a></div><div className="sidebar-related"><p className="eyebrow">Keep reading</p>{related.map(item=><Link href={`/blog/${item.slug}`} key={item.slug}><span>{item.category}</span><b>{item.title}</b><small>{item.read}</small></Link>)}<Link href="/blog" className="all-notes">View all articles →</Link></div></aside></div>
  </article></Page>
}
