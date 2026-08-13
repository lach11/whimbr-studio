import { getChatGPTUser } from "./chatgpt-auth";
export async function canManage(request?:Request){if(request&&new URL(request.url).hostname==="localhost")return true;if(process.env.NODE_ENV==="development")return true;const user=await getChatGPTUser();const owner=process.env.SITE_OWNER_EMAIL?.trim().toLowerCase();return Boolean(user&&owner&&user.email.toLowerCase()===owner)}
