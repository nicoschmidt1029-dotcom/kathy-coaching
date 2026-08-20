import Link from "next/link";
import { panelClass } from "@/components/admin/fields";
import { getCmsEntries } from "@/lib/cms";
import { BUNDLES } from "@/lib/pricing";
import en from "@/messages/en.json";

export default async function AdminPrograms() {
  const entries = await getCmsEntries("program");
  const map = new Map(entries.map((entry) => [entry.content_key, entry]));
  const defaultKeys = new Set<string>(BUNDLES.map((bundle) => bundle.id));
  const customEntries = entries.filter((entry) => !defaultKeys.has(entry.content_key));
  const row = (key: string, title: string, detail: string) => <Link key={key} href={`/admin/programs/${key}`} className={`${panelClass} flex items-center justify-between gap-4 py-4 transition hover:border-[var(--clay)]/40`}><div><h2 className="font-display text-xl text-[var(--plum)]">{title}</h2><p className="mt-1 text-xs text-foreground/50">{detail}</p></div><span className="text-sm text-[var(--plum)]">Edit →</span></Link>;

  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Content</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Programs</h1><p className="mt-3 max-w-xl text-sm text-foreground/55">Edit, publish, reorder or add programs. Layout and calculations stay protected in code.</p></div><Link href="/admin/programs/new" className="rounded-xl bg-[var(--plum)] px-4 py-2.5 text-sm text-white">Add program</Link></div><div className="mt-7 space-y-3">{BUNDLES.map((bundle) => { const entry = map.get(bundle.id); return row(bundle.id, en.pricing.bundles[bundle.id].name, entry ? entry.status === "published" ? `Published · order ${entry.sort_order}` : "Draft" : "Published · website default"); })}{customEntries.map((entry) => row(entry.content_key, (entry.data.title as Record<string, string> | undefined)?.en || entry.content_key, `${entry.status === "published" ? "Published" : "Draft"} · order ${entry.sort_order}`))}</div></>;
}
