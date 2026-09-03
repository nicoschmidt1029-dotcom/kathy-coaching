import { saveEditorialSection } from "@/app/admin/actions";
import { EDITORIAL_SECTION_FIELDS, type EditorialSectionKey } from "@/lib/admin-section-fields";
import { Field, LanguageEditingNote, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import { GuardedForm, SaveButton } from "@/components/admin/form-guard";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
type SectionData = Record<string, Partial<Record<(typeof locales)[number], string>>>;

export function EditorialSectionForm({ contentKey, title, description, entry, defaults, previewEnabled = true }: { contentKey: EditorialSectionKey; title: string; description: string; entry?: CmsEntry; defaults: SectionData; preview?: string; previewEnabled?: boolean }) {
  const stored = (entry?.data as SectionData | undefined) ?? {};
  const data = { ...defaults, ...stored };
  const fields = EDITORIAL_SECTION_FIELDS[contentKey];

  return <details className={panelClass} open><summary className="cursor-pointer font-display text-2xl text-[var(--plum)]">{title}</summary><p className="mt-2 text-sm leading-relaxed text-foreground/55">{description}</p><div className="mt-5"><LanguageEditingNote /></div><GuardedForm action={saveEditorialSection} className="mt-6 space-y-5"><input type="hidden" name="content_key" value={contentKey} />{locales.map((locale) => <LocaleFields key={locale} locale={locale}>{fields.map((field) => field.multiline ? <TextArea key={field.key} label={field.label} name={`${field.key}_${locale}`} defaultValue={data[field.key]?.[locale] ?? ""} rows={4} /> : <Field key={field.key} label={field.label} name={`${field.key}_${locale}`} defaultValue={data[field.key]?.[locale] ?? ""} />)}</LocaleFields>)}<div className="flex flex-wrap items-center gap-3"><SaveButton value="published">Save & update website</SaveButton><SaveButton value="draft" variant="secondary">Save draft (not live)</SaveButton>{previewEnabled && <SaveButton value="preview" variant="secondary">Preview without saving</SaveButton>}</div></GuardedForm></details>;
}
