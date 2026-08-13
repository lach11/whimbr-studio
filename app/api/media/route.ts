import { env } from "cloudflare:workers";
import { canManage } from "../../admin-access";

const allowed = new Map([["image/jpeg","jpg"],["image/png","png"],["image/webp","webp"]]);
export async function POST(request:Request){
  if(!await canManage(request))return Response.json({error:"Owner access required"},{status:403});
  const data=await request.formData();const file=data.get("file");const alt=String(data.get("alt")||"").trim();
  if(!(file instanceof File))return Response.json({error:"Choose an image"},{status:400});
  const ext=allowed.get(file.type);if(!ext)return Response.json({error:"Only JPEG, PNG and WebP images are allowed"},{status:415});
  if(file.size>10*1024*1024)return Response.json({error:"Images must be 10 MB or smaller"},{status:413});
  const bytes=new Uint8Array(await file.arrayBuffer());
  const valid=(file.type==="image/jpeg"&&bytes[0]===0xff&&bytes[1]===0xd8)||(file.type==="image/png"&&bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47)||(file.type==="image/webp"&&new TextDecoder().decode(bytes.slice(0,4))==="RIFF"&&new TextDecoder().decode(bytes.slice(8,12))==="WEBP");
  if(!valid)return Response.json({error:"The file content does not match its image type"},{status:415});
  const key=`blog/${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}.${ext}`;
  await env.MEDIA.put(key,bytes,{httpMetadata:{contentType:file.type,cacheControl:"public, max-age=31536000, immutable"},customMetadata:{alt}});
  return Response.json({url:`/api/media/${key}`,alt});
}
