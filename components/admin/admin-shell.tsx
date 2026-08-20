import Link from "next/link";
import { BookOpen, FileText, Images, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { AdminSessionRefresh } from "@/components/admin/session-refresh";

const links = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/programs", label: "Programs", icon: Sparkles },
  { href: "/admin/recipes", label: "Recipes", icon: BookOpen },
  { href: "/admin/website", label: "Website Content", icon: FileText },
  { href: "/admin/media", label: "Media", icon: Images },
];

export function AdminShell({ children, email }: { children: React.ReactNode; email: string }) {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#252927]">
      <AdminSessionRefresh />
      <header className="border-b border-black/10 bg-[#fbf8f2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/admin" className="font-display text-xl text-[var(--plum)]">
            Katey Coaching <span className="text-sm italic text-foreground/55">Admin</span>
          </Link>
          <form action={logout}>
            <button className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground">
              <LogOut className="size-4" /> Log out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[210px_1fr] md:py-10">
        <aside>
          <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-white hover:text-[var(--plum)]">
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </nav>
          <p className="mt-5 hidden break-all px-3 text-xs text-foreground/45 md:block">{email}</p>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
