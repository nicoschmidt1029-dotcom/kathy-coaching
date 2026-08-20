import type { Metadata } from "next";
import "../globals.css";
import { FONT_CLASSES } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Katey Coaching Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="de" className={`${FONT_CLASSES} h-full antialiased`}><body>{children}</body></html>;
}
