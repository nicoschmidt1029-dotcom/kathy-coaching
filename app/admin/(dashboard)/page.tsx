import Link from "next/link";
import { BookOpen, FileText, Images, Sparkles } from "lucide-react";
import { panelClass } from "@/components/admin/fields";

const cards = [
  { href: "/admin/programs", title: "Programs", body: "Angebote, Preise und Leistungen bearbeiten.", icon: Sparkles },
  { href: "/admin/recipes", title: "Recipes", body: "Rezepte erstellen, bearbeiten und veröffentlichen.", icon: BookOpen },
  { href: "/admin/website", title: "Website Content", body: "Ausgewählte Texte und Bilder pflegen.", icon: FileText },
  { href: "/admin/media", title: "Media", body: "Hochgeladene Website-Bilder ansehen.", icon: Images },
];

export default function AdminDashboard() {
  return <><p className="eyebrow">Content management</p><h1 className="mt-3 font-display text-4xl text-[var(--plum)] sm:text-5xl">Welcome to your website.</h1><p className="mt-4 max-w-2xl text-foreground/65">Hier kannst du Inhalte ändern, ohne das Design oder den Code der Website anzufassen.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{cards.map(({ href, title, body, icon: Icon }) => <Link key={href} href={href} className={`${panelClass} group transition hover:-translate-y-0.5 hover:border-[var(--clay)]/40`}><Icon className="size-5 text-[var(--clay)]" /><h2 className="mt-4 font-display text-2xl text-[var(--plum)]">{title}</h2><p className="mt-2 text-sm leading-relaxed text-foreground/60">{body}</p><span className="mt-5 inline-block text-sm text-[var(--plum)]">Open →</span></Link>)}</div></>;
}
