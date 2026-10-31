"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function NewInstallation() {
 const [open,setOpen]=useState(false); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const router=useRouter();
 const [form,setForm]=useState({name:"",serverIp:"",panelDomain:"",nodeDomain:""});
 function update(k:keyof typeof form,v:string){setForm(p=>({...p,[k]:v}));}
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");
  try{const r=await fetch("/api/installations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const d=await r.json();if(!r.ok)throw new Error(d.error||"Gagal menyimpan");setOpen(false);setForm({name:"",serverIp:"",panelDomain:"",nodeDomain:""});router.refresh();}
  catch(err){setError(err instanceof Error?err.message:"Terjadi kesalahan");}finally{setBusy(false);}
 }
 return <>
 <button onClick={()=>setOpen(true)} className="btn btn-primary">＋ New installation</button>
 {open&&<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"><div className="panel rounded-2xl w-full max-w-lg p-6">
  <div className="flex justify-between items-start mb-5"><div><h2 className="text-xl font-bold">New installation</h2><p className="muted text-sm mt-1">Simpan target server untuk proses setup berikutnya.</p></div><button onClick={()=>setOpen(false)} className="muted text-xl">×</button></div>
  <form onSubmit={submit} className="space-y-3">
   {([["name","Server name","Production VPS"],["serverIp","Server IP / hostname","203.0.113.10"],["panelDomain","Panel domain","panel.example.com"],["nodeDomain","Node domain","node.example.com"]] as const).map(([k,label,placeholder])=><label key={k} className="block text-sm font-semibold">{label}<input className="field mt-1.5" required value={form[k]} onChange={e=>update(k,e.target.value)} placeholder={placeholder}/></label>)}
   <p className="muted text-xs">V1 menyimpan metadata saja. Belum ada koneksi SSH atau perubahan pada VPS.</p>
   {error&&<p className="text-sm text-rose-400">{error}</p>}
   <div className="flex gap-2 pt-2"><button type="button" onClick={()=>setOpen(false)} className="btn btn-ghost flex-1">Batal</button><button disabled={busy} className="btn btn-primary flex-1">{busy?"Menyimpan...":"Simpan server"}</button></div>
  </form>
 </div></div>}
 </>;
}