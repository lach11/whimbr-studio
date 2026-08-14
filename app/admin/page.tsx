import { notFound } from "next/navigation"; import AdminEditor from "./AdminEditor"; import { requireChatGPTUser } from "../chatgpt-auth"; import { canManage } from "../admin-access";
export const dynamic="force-dynamic"; export const metadata={title:"Content manager | Whimbr Studio",robots:{index:false,follow:false}};
async function Protected(){if(process.env.NODE_ENV!=="development"){await requireChatGPTUser("/admin");if(!await canManage())notFound()}return <AdminEditor/>}
export default function Admin(){return <main className="admin-page"><Protected/></main>}
