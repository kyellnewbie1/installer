import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import { z } from "zod";

const schema=z.object({
  name:z.string().trim().min(2).max(60),
  serverIp:z.string().trim().min(3).max(253),
  panelDomain:z.string().trim().min(3).max(253),
  nodeDomain:z.string().trim().min(3).max(253)
});
export async function GET() {
  const userId=await getSessionUserId();
  if(!userId) return NextResponse.json({error:"Unauthorized"},{status:401});
  const installations=await prisma.installation.findMany({where:{userId},orderBy:{createdAt:"desc"}});
  return NextResponse.json({installations});
}
export async function POST(req:Request) {
  const userId=await getSessionUserId();
  if(!userId) return NextResponse.json({error:"Unauthorized"},{status:401});
  const parsed=schema.safeParse(await req.json());
  if(!parsed.success) return NextResponse.json({error:"Data instalasi tidak valid."},{status:400});
  const item=await prisma.installation.create({data:{...parsed.data,userId,status:"draft"}});
  return NextResponse.json({installation:item},{status:201});
}