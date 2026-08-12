import Link from "next/link";
import { Arrow, Page } from "./components";
import { posts, projects } from "./content";

const disciplines = [
  ["01", "Productivity Apps", "Small, focused tools that make everyday work feel lighter."],
  ["02", "Electronics Projects", "Physical experiments that connect code with the world around us."],
  ["03", "Data & Map Visualisations", "Clear visual stories that help patterns and places make sense."],
  ["04", "Udemy Courses", "Practical, project-led learning for curious people who like to make."],
];

export default function Home() { return <Page>
  <section className="hero shell"><div className="hero-copy"><p className="eyebrow">Independent maker studio</p><h1>Curious tools,<br/><em>thoughtfully made.</em></h1><p className="lede">Whimbr Studio is a home for useful software, playful electronics, expressive data and practical learning.</p><div className="actions"><Link href="/projects" className="button">Explore the work <Arrow/></Link><Link href="/about" className="text-link">Meet the studio <Arrow/></Link></div></div><div className="hero-art" aria-label="Abstract studio workspace illustration" role="img"><div className="art-window"><i/><i/><i/><div className="art-chart"><b/><b/><b/></div></div><div className="art-board"><span/><span/><span/><span/></div><div className="art-map"><i/><i/><i/></div><div className="art-sun"/></div></section>
  <section className="section shell"><div className="section-head"><div><p className="eyebrow">What’s on the bench</p><h2>A few things I’m working on</h2></div><p>Ideas move between screens, circuits, maps and classrooms. The common thread is simple: make something useful, and make it with care.</p></div><div className="discipline-grid">{disciplines.map(([n,title,text]) => <article className="discipline" key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  <section className="section tint"><div className="shell"><div className="section-head"><div><p className="eyebrow">Selected projects</p><h2>Made to be useful</h2></div><Link href="/projects" className="text-link">View all projects <Arrow/></Link></div><div className="project-grid">{projects.slice(0,3).map(p => <Link href={`/projects/${p.slug}`} className={`project-card ${p.color}`} key={p.slug}><div className="project-visual"><span className="visual-label">{p.category}</span><div className="visual-shape"/></div><div className="card-copy"><p>{p.category}</p><h3>{p.title}</h3><span>{p.summary}</span><b>View project <Arrow/></b></div></Link>)}</div></div></section>
  <section className="section shell"><div className="section-head"><div><p className="eyebrow">From the notebook</p><h2>Notes on making</h2></div><Link href="/blog" className="text-link">Read all notes <Arrow/></Link></div><div className="post-list">{posts.map(post => <Link href={`/blog/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.date} · {post.read}</small></Link>)}</div></section>
  <section className="shell callout"><div><p className="eyebrow">Need a hand?</p><h2>Support for the things I make.</h2></div><Link href="/support" className="button cream">Visit support <Arrow/></Link></section>
  </Page>; }
