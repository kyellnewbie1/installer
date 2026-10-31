import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NewInstallation } from "@/components/NewInstallation";
import { LogoutButton } from "@/components/LogoutButton";
import { Cloud, Server, Activity, ShieldCheck, LayoutDashboard, Boxes, Settings, ChevronRight } from "lucide-react";

export default async function DashboardPage() {
 const userId=await getSessionUserId(); if(!userId) redirect("/login");
 const user=await prisma.user.findUnique({where:{id:userId},select:{email:true}});
 if(!user) redirect("/login");
 const installations=await prisma.installation.findMany({where:{userId},orderBy:{createdAt:"desc"}});
 const stats=[{label:"Total servers",value:installations.length,icon:Server},{label:"Active panels",value:0,icon:Activity},{label:"Active nodes",value:0,icon:Boxes},{label:"Security",value:"Protected",icon:ShieldCheck}];
 return <main className="shell min-h-screen md:flex">
  <aside className="desktop-sidebar w-64 border-r border-white/5 p-5 flex flex-col min-h-screen sticky top-0 h-screen">
   <div className="flex items-center gap-3 px-2 py-3"><div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center font-black text-xl">H</div><div><div className="font-bold">Hutao Cloud</div><div className="muted text-xs">Control workspace</div></div></div>
   <div className="text-[10px] tracking-[.2em] muted font-bold mt-10 mb-3 px-3">WORKSPACE</div>
   <nav className="space-y-1"><a className="navlink active" href="/dashboard"><LayoutDashboard size={18}/> Overview</a><a className="navlink" href="#installations"><Server size={18}/> Installations</a><a className="navlink" href="#eggs"><Boxes size={18}/> Egg manager <span className="ml-auto text-[10px] muted">SOON</span></a></nav>
   <div className="mt-auto panel rounded-xl p-4"><div className="flex items-center gap-2 text-sm font-semibold"><span className="dot"/> System ready</div><p className="muted text-xs mt-2">Installer engine is not connected yet.</p></div>
  </aside>
  <section className="flex-1 min-w-0 p-4 sm:p-7 lg:p-10">
   <header className="flex flex-wrap items-center justify-between gap-4 mb-9"><div><p className="muted text-sm">Workspace / Overview</p><h1 className="text-2xl sm:text-3xl font-bold mt-1">Dashboard</h1><p className="muted text-sm mt-2">Selamat datang kembali, {user.email}</p></div><div className="flex gap-2"><NewInstallation/><LogoutButton/></div></header>
   <div className="panel rounded-2xl p-5 sm:p-7 mb-7 overflow-hidden relative"><div className="relative z-10 max-w-xl"><div className="text-rose-400 text-xs tracking-[.2em] uppercase font-bold">Hutao Cloud · V1 workspace</div><h2 className="text-2xl sm:text-3xl font-bold mt-3 leading-tight">Your servers,<br/>one clear workspace.</h2><p className="muted text-sm mt-3 max-w-md">Kelola target VPS dan persiapkan deployment Pterodactyl Panel serta Wings dari satu tempat.</p></div><Cloud className="absolute right-7 bottom-4 text-rose-400/10" size={170}/></div>
   <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-9">{stats.map(({label,value,icon:Icon})=><div key={label} className="panel rounded-2xl p-4 sm:p-5"><div className="flex justify-between items-center"><span className="muted text-xs sm:text-sm">{label}</span><Icon size={18} className="text-rose-400"/></div><div className="text-xl sm:text-2xl font-bold mt-4">{value}</div></div>)}</div>
   <section id="installations"><div className="flex items-end justify-between mb-4"><div><h2 className="text-xl font-bold">Your installations</h2><p className="muted text-sm mt-1">Daftar VPS yang tersimpan di akun ini.</p></div><span className="muted text-xs">{installations.length} total</span></div>
    {installations.length===0?<div className="panel rounded-2xl p-9 sm:p-14 text-center"><div className="w-14 h-14 rounded-2xl bg-white/5 mx-auto flex items-center justify-center"><Server className="text-rose-400" size={25}/></div><h3 className="font-bold text-lg mt-4">Belum ada server</h3><p className="muted text-sm mt-2 max-w-sm mx-auto">Tambahkan target VPS untuk mulai menyiapkan instalasi Pterodactyl.</p><div className="mt-5"><NewInstallation/></div></div>:<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{installations.map(item=><article key={item.id} className="panel rounded-2xl p-5"><div className="flex items-center justify-between"><div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center"><Server size={19}/></div><span className="text-xs rounded-full bg-amber-400/10 text-amber-300 px-3 py-1">{item.status}</span></div><h3 className="font-bold mt-4">{item.name}</h3><p className="muted text-sm mt-1">{item.serverIp}</p><div className="border-t border-white/5 mt-4 pt-3 space-y-2 text-xs"><p className="flex justify-between gap-2"><span className="muted">Panel</span><span>{item.panelDomain}</span></p><p className="flex justify-between gap-2"><span className="muted">Node</span><span>{item.nodeDomain}</span></p></div><div className="mt-4 flex items-center justify-between muted text-xs"><span>{item.createdAt.toLocaleDateString("id-ID")}</span><ChevronRight size={16}/></div></article>)}</div>}
   </section>
   <section id="eggs" className="mt-9 panel rounded-2xl p-5 flex items-center justify-between gap-4"><div><h3 className="font-bold">Egg library</h3><p className="muted text-sm mt-1">Minecraft, Node.js, Python, dan WhatsApp bot runtime.</p></div><span className="text-xs text-amber-300 bg-amber-400/10 rounded-full px-3 py-1">Coming soon</span></section>
   <footer className="muted text-xs mt-10 flex justify-between gap-3"><span>© 2026 Hutao Cloud</span><span>V1.0 · Multi-user</span></footer>
  </section>
 </main>;
}