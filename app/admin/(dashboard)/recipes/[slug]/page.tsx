import { notFound } from "next/navigation";
import { RecipeDeleteForm, RecipeForm } from "@/components/admin/recipe-form";
import { getCmsEntries, staticRecipeForAdmin } from "@/lib/cms";

export default async function EditRecipe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entries = await getCmsEntries("recipe");
  const entry = entries.find((item) => item.content_key === slug);
  const recipe = staticRecipeForAdmin(slug);
  if (slug !== "new" && !entry && !recipe) notFound();
  return <><p className="eyebrow">Recipes</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">{slug === "new" ? "Add recipe" : "Edit recipe"}</h1><p className="mt-3 text-sm text-foreground/55">Content only — the public recipe layout remains controlled by the website.</p><div className="mt-7"><RecipeForm recipe={recipe} entry={entry} /></div>{slug !== "new" && <RecipeDeleteForm contentKey={slug} />}</>;
}
