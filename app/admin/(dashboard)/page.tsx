import Link from "next/link";
import { BookOpen, Contact, Flag, Home, Sparkles, UserRound } from "lucide-react";
import { panelClass } from "@/components/admin/fields";

const cards = [
  { href: "/admin/homepage", title: "Homepage", body: "Edit the main headline, supporting text and button.", icon: Home },
  { href: "/admin/about", title: "About Katey", body: "Edit the biography, personal opening and portrait.", icon: UserRound },
  { href: "/admin/mission", title: "My Mission", body: "Edit the Mission wording and photograph.", icon: Flag },
  { href: "/admin/programs", title: "Programs", body: "Edit the coaching offer, price, lists and image.", icon: Sparkles },
  { href: "/admin/recipes", title: "Recipes", body: "Edit recipes, add drafts and change the Recipes page text.", icon: BookOpen },
  { href: "/admin/contact", title: "Contact", body: "Edit the Contact-page wording and photograph.", icon: Contact },
];

export default function AdminDashboard() {
  return <><p className="eyebrow">Content management</p><h1 className="mt-3 font-display text-4xl text-[var(--plum)] sm:text-5xl">What would you like to edit?</h1><p className="mt-4 max-w-2xl text-foreground/65">Choose the exact page below. Each area contains only the fields that belong to that page.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{cards.map(({ href, title, body, icon: Icon }) => <Link key={title} href={href} className={`${panelClass} group transition hover:-translate-y-0.5 hover:border-[var(--clay)]/40`}><Icon className="size-5 text-[var(--clay)]" /><h2 className="mt-4 font-display text-2xl text-[var(--plum)]">{title}</h2><p className="mt-2 text-sm leading-relaxed text-foreground/60">{body}</p><span className="mt-5 inline-block text-sm text-[var(--plum)]">Open →</span></Link>)}</div></>;
}
