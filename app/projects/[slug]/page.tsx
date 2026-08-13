import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Page } from "../../components";
import { getPublishedBySlug } from "../../content-db";
import MarkdownContent from "../../MarkdownContent";
export const dynamic="force-dynamic";
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=await getPublishedBySlug("project",slug);if(!project)notFound();return <Page><article className="reference-detail shell"><div className="breadcrumbs">Projects › {project.category} › {project.title}</div><div className="detail-grid"><div><small className="status">Published</small><h1>{project.title}</h1><p className="lede">{project.summary}</p><section><h2>About this project</h2><MarkdownContent source={project.body}/></section></div><div><div className="project-hero-photo mint" style={project.imageUrl?{backgroundImage:`url(${project.imageUrl})`}:undefined}><span/></div><div className="project-links"><h2>Project links</h2><a href="mailto:hello@whimbr.studio">Ask about this project <Arrow/></a><Link href="/support">Get support <Arrow/></Link></div></div></div><Link href="/projects" className="back">← Back to all projects</Link></article></Page>}
