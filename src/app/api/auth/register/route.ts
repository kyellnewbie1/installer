import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { credentialsSchema, hashPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = credentialsSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({error:"Email tidak valid atau password kurang dari 10 karakter."},{status:400});
    const email = parsed.data.email.toLowerCase();
    const exists = await prisma.user.findUnique({where:{email},select:{id:true}});
    if (exists) return NextResponse.json({error:"Email sudah terdaftar."},{status:409});
    const user = await prisma.user.create({data:{email,passwordHash:await hashPassword(parsed.data.password)},select:{id:true}});
    await createSession(user.id);
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({error:"Tidak dapat membuat akun. Periksa konfigurasi server."},{status:500}); }
}