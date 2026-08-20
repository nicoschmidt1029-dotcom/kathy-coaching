import Link from "next/link";
import { BookOpen, FileText, Images, Sparkles, CircleHelp, Mail } from "lucide-react";
import { panelClass } from "@/components/admin/fields";

const cards = [
  { href: "/admin/website", title: "Website Content", body: "Edit the homepage, About, Mission and Contact pages.", icon: FileText },
  { href: "/admin/programs", title: "Programs", body: "Manage coaching programs, prices, images and publishing.", icon: Sparkles },
  { href: "/admin/recipes", title: "Recipes", body: "Create recipes privately and publish only genuine finished recipes.", icon: BookOpen },
  { href: "/admin/media", title: "Media", body: "Review website images uploaded through the editors.", icon: Images },
  { href: "/admin/website", title: "Contact", body: "Edit the Contact page wording and image. The secure form stays protected.", icon: Mail },
  { href: "/admin/tutorials", title: "Tutorials", body: "Follow short, plain-English guides for every common task.", icon: CircleHelp },
];

export default function AdminDashboard() {
  return <><p className="eyebrow">Content management</p><h1 className="mt-3 font-display text-4xl text-[var(--plum)] sm:text-5xl">Welcome to your website.</h1><p className="mt-4 max-w-2xl text-foreground/65">Choose an area below. You can update content without changing the website design or technical settings.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{cards.map(({ href, title, body, icon: Icon }) => <Link key={title} href={href} className={`${panelClass} group transition hover:-translate-y-0.5 hover:border-[var(--clay)]/40`}><Icon className="size-5 text-[var(--clay)]" /><h2 className="mt-4 font-display text-2xl text-[var(--plum)]">{title}</h2><p className="mt-2 text-sm leading-relaxed text-foreground/60">{body}</p><span className="mt-5 inline-block text-sm text-[var(--plum)]">Open →</span></Link>)}</div></>;
}
