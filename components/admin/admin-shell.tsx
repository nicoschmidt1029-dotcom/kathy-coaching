import Link from "next/link";
import { BookOpen, Contact, Flag, Home, Images, LayoutDashboard, LogOut, Sparkles, CircleHelp, UserRound, PanelBottom } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { AdminSessionRefresh } from "@/components/admin/session-refresh";
import { AdminTutorials } from "@/components/admin/tutorials";
import { AdminFeedback } from "@/components/admin/admin-feedback";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/about", label: "About Katey", icon: UserRound },
  { href: "/admin/mission", label: "Mission", icon: Flag },
  { href: "/admin/programs", label: "Programs", icon: Sparkles },
  { href: "/admin/recipes", label: "Recipes", icon: BookOpen },
  { href: "/admin/contact", label: "Contact", icon: Contact },
  { href: "/admin/footer", label: "Footer", icon: PanelBottom },
  { href: "/admin/media", label: "Media", icon: Images },
  { href: "/admin/tutorials", label: "Tutorials", icon: CircleHelp },
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
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <AdminTutorials />
            <form action={logout}>
              <button className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm text-foreground/65 hover:bg-black/5 hover:text-foreground sm:px-3">
                <LogOut className="size-4" /> <span className="hidden sm:inline">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[210px_1fr] md:py-10">
        <aside className="min-w-0 max-w-full">
          <nav className="grid max-w-full grid-cols-2 gap-2 pb-2 md:flex md:flex-col">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex min-w-0 items-center gap-2 rounded-xl bg-white/45 px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-white hover:text-[var(--plum)] md:bg-transparent">
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </nav>
          <p className="mt-5 hidden break-all px-3 text-xs text-foreground/45 md:block">{email}</p>
        </aside>
        <main className="min-w-0"><AdminFeedback />{children}</main>
      </div>
    </div>
  );
}
