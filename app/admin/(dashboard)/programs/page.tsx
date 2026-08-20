import Link from "next/link";
import { panelClass } from "@/components/admin/fields";
import { getCmsEntries } from "@/lib/cms";
import { PROGRAMS } from "@/lib/programs";

export default async function AdminPrograms() {
  const entries = await getCmsEntries("program");
  const map = new Map(entries.map((entry) => [entry.content_key, entry]));
  const defaultKeys = new Set(PROGRAMS.map((program) => program.slug));
  const rows = [...PROGRAMS.map((program) => ({ key: program.slug, title: program.content.en.title, entry: map.get(program.slug) })), ...entries.filter((entry) => !defaultKeys.has(entry.content_key)).map((entry) => ({ key: entry.content_key, title: (entry.data.title as Record<string, string> | undefined)?.en || entry.content_key, entry }))];
  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Content</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Programs</h1><p className="mt-3 max-w-xl text-sm text-foreground/55">Edit, publish, reorder or add real programs. The public layout remains protected.</p></div><Link href="/admin/programs/new" className="rounded-xl bg-[var(--plum)] px-4 py-2.5 text-sm text-white">Add program</Link></div><div className="mt-7 space-y-3">{rows.filter((row) => !row.entry?.deleted_at).map((row) => <Link key={row.key} href={`/admin/programs/${row.key}`} className={`${panelClass} flex items-center justify-between gap-4 py-4 transition hover:border-[var(--clay)]/40`}><div><h2 className="font-display text-xl text-[var(--plum)]">{row.title}</h2><p className="mt-1 text-xs text-foreground/50">{row.entry ? row.entry.status === "published" ? `Published · order ${row.entry.sort_order}` : "Draft" : "Published · website default"}</p></div><span className="text-sm text-[var(--plum)]">Edit →</span></Link>)}</div></>;
}
