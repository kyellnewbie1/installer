import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { z } from "zod";

const schema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(128)});
export async function POST(req:Request) {
  try {
    const parsed=schema.safeParse(await req.json());
    if(!parsed.success) return NextResponse.json({error:"Email atau password tidak valid."},{status:400});
    const user=await prisma.user.findUnique({where:{email:parsed.data.email.toLowerCase()}});
    if(!user || !(await verifyPassword(parsed.data.password,user.passwordHash))) return NextResponse.json({error:"Email atau password salah."},{status:401});
    await createSession(user.id);
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({error:"Login tidak dapat diproses."},{status:500}); }
}