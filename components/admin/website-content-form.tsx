import Link from "next/link";
import { saveWebsiteContent } from "@/app/admin/actions";
import { Field, LanguageEditingNote, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import { GuardedForm, SaveButton } from "@/components/admin/form-guard";
import { ImageUpload } from "@/components/admin/image-upload";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
type WebsiteData = { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string>; ctaLabel?: Record<string, string>; ctaHref?: string; submitLabel?: Record<string, string> };

export function WebsiteContentForm({ contentKey, title, description, entry, defaults, imageHint, showCta = false, showSubmitLabel = false }: { contentKey: string; title: string; description: string; entry?: CmsEntry; defaults: WebsiteData; imageHint?: string; showCta?: boolean; showSubmitLabel?: boolean }) {
  const data = { ...defaults, ...((entry?.data as WebsiteData | undefined) ?? {}) };
  const preview = contentKey === "homepage" ? "/en" : contentKey === "about" ? "/en/katey" : contentKey === "mission" ? "/en/mission" : "/en/kontakt";

  return (
    <details className={panelClass} open>
      <summary className="cursor-pointer font-display text-2xl text-[var(--plum)]">{title}</summary>
      <p className="mt-2 text-sm text-foreground/55">{description}</p>
      <div className="mt-5"><LanguageEditingNote /></div>
      <GuardedForm action={saveWebsiteContent} className="mt-6 space-y-5">
        <input type="hidden" name="content_key" value={contentKey} />
        {contentKey !== "homepage" && <ImageUpload folder="website" initialValue={entry?.image_path ?? ""} hint={imageHint} />}
        {locales.map((locale) => (
          <LocaleFields key={locale} locale={locale}>
            <Field label="Small heading" name={`eyebrow_${locale}`} defaultValue={data.eyebrow?.[locale] ?? ""} />
            <Field label="Main heading" name={`headline_${locale}`} defaultValue={data.headline?.[locale] ?? ""} />
            <TextArea label={contentKey === "about" ? "Biography text" : contentKey === "mission" ? "Mission text" : "Supporting text"} name={`body_${locale}`} defaultValue={data.body?.[locale] ?? ""} rows={8} hint="Separate paragraphs with a blank line. No HTML is needed." />
            {showCta && <Field label="Button label" name={`cta_label_${locale}`} defaultValue={data.ctaLabel?.[locale] ?? ""} />}
            {showSubmitLabel && <Field label="Form button label" name={`submit_label_${locale}`} defaultValue={data.submitLabel?.[locale] ?? ""} />}
          </LocaleFields>
        ))}
        {showCta && <Field label="Button destination" name="cta_href" defaultValue={data.ctaHref ?? "/programme"} />}
        <div className="flex flex-wrap items-center gap-3">
          <SaveButton value="draft" variant="secondary">Save draft</SaveButton>
          <SaveButton value="published">Save & publish</SaveButton>
          <Link href={preview} target="_blank" className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm text-[var(--plum)] underline underline-offset-4">Preview page</Link>
        </div>
      </GuardedForm>
    </details>
  );
}
