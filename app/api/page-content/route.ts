import {canManage} from "../../admin-access";
import {getPageContent,savePageContent} from "../../../db/page-content";
import {pageContentDefaults,type PageContent,type PageKey} from "../../page-content-config";
const valid=(page:string):page is PageKey=>page in pageContentDefaults;
export async function GET(request:Request){if(!await canManage(request))return Response.json({error:"Owner access required"},{status:403});const page=new URL(request.url).searchParams.get("page")||"";if(!valid(page))return Response.json({error:"Unknown page"},{status:400});return Response.json({page,content:await getPageContent(page)})}
export async function POST(request:Request){if(!await canManage(request))return Response.json({error:"Owner access required"},{status:403});const input=await request.json() as {page:string;content:PageContent};if(!valid(input.page)||!input.content)return Response.json({error:"Valid page content is required"},{status:400});const allowed=Object.keys(pageContentDefaults[input.page]);const content=Object.fromEntries(allowed.map(key=>[key,String(input.content[key]??"")]));await savePageContent(input.page,content);return Response.json({page:input.page,content})}
