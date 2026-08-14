import Link from "next/link";
import {Page,PageTitle,SectionTitle} from "../components";
import {supportApps} from "../content";
import {FaqSearch} from "../ContentDiscovery";
import {getPublished} from "../content-db";
export const dynamic="force-dynamic";
export const metadata={title:"Support | Whimbr Studio",description:"Help, troubleshooting and feedback for Whimbr Studio products."};
export default async function Support(){
 const [faqEntries,guides]=await Promise.all([getPublished("faq"),getPublished("support")]);
 const faqs=faqEntries.map(entry=>[entry.title,entry.body] as [string,string]);
 return <Page><div className="cr-container cr-page"><PageTitle>Support &amp; FAQ</PageTitle><div className="cr-faq-layout"><section>{faqs.length?<FaqSearch items={faqs}/>:<div className="cr-empty">FAQs can now be created and published from the Content Studio.</div>}<SectionTitle>Product Help</SectionTitle><div className="cr-support-products">{guides.length?guides.map(guide=><article key={guide.slug}><small>{guide.category}</small><h3>{guide.title}</h3><p>{guide.summary}</p>{guide.body&&<details><summary>View help</summary><p>{guide.body}</p></details>}</article>):supportApps.map(app=><article key={app.title}><h3>{app.title}</h3><p>{app.text}</p><ul>{app.topics.map(topic=><li key={topic}>{topic}</li>)}</ul></article>)}</div></section><aside><SectionTitle>Popular Topics</SectionTitle><ul className="cr-square-list">{[...new Set([...faqEntries,...guides].map(entry=>entry.category))].map(category=><li key={category}>{category}</li>)}</ul><SectionTitle>Still Stuck?</SectionTitle><p>Send a question, report a bug or suggest an improvement.</p><Link href="/contact" className="cr-button">Contact support</Link><a className="cr-email-link" href="mailto:support@whimbr.studio">support@whimbr.studio</a></aside></div></div></Page>
}
