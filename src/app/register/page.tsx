import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { RegisterForm } from "@/components/RegisterForm";

export default async function RegisterPage() {
  if (await getSessionUserId()) redirect("/dashboard");
  return <main className="shell min-h-screen flex items-center justify-center p-5">
    <div className="w-full max-w-md">
      <div className="flex items-center justify-center gap-3 mb-8"><div className="w-11 h-11 rounded-2xl bg-rose-500 flex items-center justify-center text-xl font-black">H</div><div><div className="font-bold text-xl">Hutao Cloud</div><div className="muted text-xs">Create your workspace</div></div></div>
      <section className="panel rounded-3xl p-7 sm:p-9">
        <p className="text-xs uppercase tracking-[.22em] text-rose-400 font-bold">Get started</p>
        <h1 className="text-3xl font-bold mt-2">Create account</h1>
        <p className="muted text-sm mt-2 mb-7">Buat akun untuk menyimpan konfigurasi server milikmu.</p>
        <RegisterForm />
        <p className="text-sm muted text-center mt-6">Sudah punya akun? <Link className="text-rose-400 font-semibold" href="/login">Masuk</Link></p>
      </section>
    </div>
  </main>;
}