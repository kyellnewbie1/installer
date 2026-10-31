import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hutao Cloud — Server Control",
  description: "A clean workspace for Pterodactyl deployments."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}