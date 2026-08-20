import Link from "next/link";
import { Plus } from "lucide-react";
import { panelClass } from "@/components/admin/fields";
import { getCmsEntries } from "@/lib/cms";
import { RECIPES } from "@/lib/recipes";

export default async function AdminRecipes() {
  const entries = await getCmsEntries("recipe");
  const entriesByKey = new Map(entries.map((entry) => [entry.content_key, entry]));
  const rows = RECIPES.map((recipe) => ({ key: recipe.slug, title: recipe.title.en, entry: entriesByKey.get(recipe.slug) }));
  const staticKeys = new Set(RECIPES.map((recipe) => recipe.slug));
  for (const entry of entries) if (!staticKeys.has(entry.content_key)) rows.push({ key: entry.content_key, title: String((entry.data.title as Record<string, string> | undefined)?.en ?? entry.content_key), entry });

  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Content</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Recipes</h1></div><Link href="/admin/recipes/new" className="inline-flex items-center gap-2 rounded-xl bg-[var(--plum)] px-4 py-2.5 text-sm text-white"><Plus className="size-4" />Add recipe</Link></div><div className="mt-7 space-y-3">{rows.filter((row) => !row.entry?.deleted_at).map((row) => <Link key={row.key} href={`/admin/recipes/${row.key}`} className={`${panelClass} flex items-center justify-between gap-4 py-4 transition hover:border-[var(--clay)]/40`}><div><h2 className="font-display text-xl text-[var(--plum)]">{row.title}</h2><p className="mt-1 text-xs text-foreground/50">{row.entry ? row.entry.status === "published" ? "Published" : "Draft" : "Published · website default"}</p></div><span className="text-sm text-[var(--plum)]">Edit →</span></Link>)}</div></>;
}
