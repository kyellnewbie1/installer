"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function RegisterForm() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState("");
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
  async function submit(e:React.FormEvent) { e.preventDefault(); setError(""); if(password!==confirm){setError("Konfirmasi password tidak sama.");return;} setBusy(true);
    try { const r=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||"Registrasi gagal"); router.push("/dashboard"); router.refresh(); }
    catch(err){setError(err instanceof Error?err.message:"Terjadi kesalahan");} finally{setBusy(false);}
  }
  return <form onSubmit={submit} className="space-y-4">
    <label className="block text-sm font-semibold">Email<input className="field mt-2" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@email.com"/></label>
    <label className="block text-sm font-semibold">Password<input className="field mt-2" type="password" minLength={10} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimal 10 karakter"/></label>
    <label className="block text-sm font-semibold">Ulangi password<input className="field mt-2" type="password" required value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Ulangi password"/></label>
    <p className="muted text-xs">Gunakan password unik minimal 10 karakter.</p>
    {error&&<p className="text-sm text-rose-400">{error}</p>}
    <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">{busy?"Membuat akun...":"Buat akun"}</button>
  </form>;
}