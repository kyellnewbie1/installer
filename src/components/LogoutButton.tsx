"use client";
import { useRouter } from "next/navigation";
export function LogoutButton(){const router=useRouter();async function out(){await fetch("/api/auth/logout",{method:"POST"});router.push("/login");router.refresh();}return <button onClick={out} className="btn btn-ghost">Logout</button>}