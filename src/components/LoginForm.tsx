"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function LoginForm() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
  async function submit(e:React.FormEvent) { e.preventDefault(); setBusy(true); setError("");
    try { const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||"Login gagal"); router.push("/dashboard"); router.refresh(); }
    catch(err){setError(err instanceof Error?err.message:"Terjadi kesalahan");} finally{setBusy(false);}
  }
  return <form onSubmit={submit} className="space-y-4">
    <label className="block text-sm font-semibold">Email<input className="field mt-2" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@email.com"/></label>
    <label className="block text-sm font-semibold">Password<input className="field mt-2" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password akun"/></label>
    {error&&<p className="text-sm text-rose-400">{error}</p>}
    <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">{busy?"Memproses...":"Masuk ke Dashboard"}</button>
  </form>;
}