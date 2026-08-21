import { AdminPageHeading } from "@/components/admin/page-heading";
import { EditorialSectionForm } from "@/components/admin/editorial-section-form";
import { getCmsEntries } from "@/lib/cms";
import { localized } from "@/lib/admin-website-defaults";

export default async function RecipesPageContentAdmin() {
  const entry = (await getCmsEntries("website")).find((item) => item.content_key === "recipes-page");
  return <><AdminPageHeading eyebrow="Recipes" title="Recipes page text" description="Edit the headings and short introduction around the published recipe list." /><EditorialSectionForm contentKey="recipes-page" title="Recipes page introduction" description="Individual recipe content and images are managed from the main Recipes screen." entry={entry} preview="/en/recipes" defaults={{ eyebrow: localized((m) => m.recipes.eyebrow), title: localized((m) => m.recipes.title), intro: localized((m) => m.recipes.intro), featured: localized((m) => m.recipes.featured), exploreEyebrow: localized((m) => m.recipes.exploreEyebrow), exploreTitle: localized((m) => m.recipes.exploreTitle) }} /></>;
}
