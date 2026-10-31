import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  if (await getSessionUserId()) redirect("/dashboard");
  return <main className="shell min-h-screen flex items-center justify-center p-5">
    <div className="w-full max-w-md">
      <Brand />
      <section className="panel rounded-3xl p-7 sm:p-9 mt-8">
        <p className="text-xs uppercase tracking-[.22em] text-rose-400 font-bold">Welcome back</p>
        <h1 className="text-3xl font-bold mt-2">Sign in</h1>
        <p className="muted text-sm mt-2 mb-7">Masuk untuk mengelola deployment server kamu.</p>
        <LoginForm />
        <p className="text-sm muted text-center mt-6">Belum punya akun? <Link className="text-rose-400 font-semibold" href="/register">Buat akun</Link></p>
      </section>
      <p className="text-center muted text-xs mt-6">Hutao Cloud · Secure server workspace</p>
    </div>
  </main>;
}
function Brand() {
  return <div className="flex items-center justify-center gap-3">
    <div className="w-11 h-11 rounded-2xl bg-rose-500 flex items-center justify-center text-xl font-black shadow-lg shadow-rose-950/50">H</div>
    <div><div className="font-bold text-xl tracking-tight">Hutao Cloud</div><div className="muted text-xs">Deploy. Connect. Manage.</div></div>
  </div>;
}