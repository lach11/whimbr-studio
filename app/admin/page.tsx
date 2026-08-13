import Link from "next/link"; import AdminEditor from "./AdminEditor"; import { requireChatGPTUser } from "../chatgpt-auth";
export const dynamic="force-dynamic"; export const metadata={title:"Content manager | Whimbr Studio",robots:{index:false,follow:false}};
async function Protected(){if(process.env.NODE_ENV!=="development")await requireChatGPTUser("/admin");return <AdminEditor/>}
export default function Admin(){return <main className="admin-page"><header className="admin-bar"><Link href="/" className="logo"><span className="logo-mark">W</span><span>whimbr <small>studio</small></span></Link><Link href="/" target="_blank">View website ↗</Link></header><Protected/></main>}
