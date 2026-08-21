import { deleteEntry, saveRecipe } from "@/app/admin/actions";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Field, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { CmsEntry } from "@/lib/cms";
import { RECIPE_CATEGORIES, type Recipe } from "@/lib/recipes";
import { RepeatableList } from "@/components/admin/repeatable-list";
import { GuardedForm, SaveButton } from "@/components/admin/form-guard";

const locales = ["en", "de", "sk"] as const;

export function RecipeForm({ recipe, entry }: { recipe?: Recipe; entry?: CmsEntry }) {
  const data = (entry?.data as unknown as Recipe | undefined) ?? recipe;
  const key = entry?.content_key ?? recipe?.slug ?? "";
  const image = entry?.image_path ?? data?.image ?? "";

  return <GuardedForm action={saveRecipe} className="space-y-6">
    <input type="hidden" name="original_key" value={key} />
    <input type="hidden" name="sort_order" value={entry?.sort_order ?? 0} />
    <section className={`${panelClass} space-y-5`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={key} required readOnly={Boolean(key)} />
        <label className="block text-sm font-medium text-foreground/75">Category<select name="category" defaultValue={data?.category ?? "breakfast"} className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm">{RECIPE_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground/70"><input type="checkbox" name="featured" defaultChecked={data?.featured} /> Featured recipe</label>
      <ImageUpload folder="recipes" initialValue={image} />
    </section>

    {locales.map((locale) => <LocaleFields key={locale} locale={locale}>
      <Field label="Title" name={`title_${locale}`} defaultValue={data?.title?.[locale] ?? ""} required />
      <Field label="Image description" name={`image_alt_${locale}`} defaultValue={data?.imageAlt?.[locale] ?? ""} />
      <TextArea label="Short description" name={`short_description_${locale}`} defaultValue={data?.shortDescription?.[locale] ?? ""} rows={2} />
      <TextArea label="Introduction" name={`introduction_${locale}`} defaultValue={data?.introduction?.[locale] ?? ""} rows={4} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prep time" name={`prep_time_${locale}`} defaultValue={data?.prepTime?.[locale] ?? ""} />
        <Field label="Cook time" name={`cook_time_${locale}`} defaultValue={data?.cookTime?.[locale] ?? ""} />
        <Field label="Total time" name={`total_time_${locale}`} defaultValue={data?.totalTime?.[locale] ?? ""} />
        <Field label="Servings" name={`servings_${locale}`} defaultValue={data?.servings?.[locale] ?? ""} />
      </div>
      <TextArea label="Tags" name={`tags_${locale}`} defaultValue={(data?.tags?.[locale] ?? []).join("\n")} rows={3} hint="One tag per line" />
      <RepeatableList label="Ingredients" name={`ingredients_${locale}`} initialItems={(data?.ingredientGroups ?? []).flatMap((group) => group.items[locale] ?? [])} addLabel="Add ingredient" />
      <RepeatableList label="Instructions" name={`instructions_${locale}`} initialItems={data?.instructions?.[locale]} addLabel="Add step" multiline />
    </LocaleFields>)}

    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-[#fbf8f2]/95 p-4 shadow-lg backdrop-blur sm:sticky sm:bottom-3">
      <SaveButton value="draft" variant="secondary">Save draft</SaveButton>
      <SaveButton value="preview" variant="secondary">Preview changes</SaveButton>
      <SaveButton value="published">Save & publish</SaveButton>
    </div>
  </GuardedForm>;
}

export function RecipeDeleteForm({ contentKey }: { contentKey: string }) {
  return <form action={deleteEntry} className="mt-8 border-t border-black/10 pt-6"><input type="hidden" name="content_type" value="recipe" /><input type="hidden" name="content_key" value={contentKey} /><ConfirmSubmit message="This cannot be undone. Delete this recipe?">Delete recipe</ConfirmSubmit></form>;
}
