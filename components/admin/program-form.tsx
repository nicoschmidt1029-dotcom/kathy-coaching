import { deleteEntry, saveProgram } from "@/app/admin/actions";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import {
  Field,
  LocaleFields,
  panelClass,
  TextArea,
} from "@/components/admin/fields";
import { GuardedForm, SaveButton } from "@/components/admin/form-guard";
import { ImageUpload } from "@/components/admin/image-upload";
import { RepeatableList } from "@/components/admin/repeatable-list";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
export type ProgramData = {
  image?: string;
  kind?: "coaching" | "conversation";
  title?: Record<string, string>;
  intro?: Record<string, string>;
  targetHeading?: Record<string, string>;
  targetAudience?: Record<string, readonly string[]>;
  transition?: Record<string, string>;
  includesHeading?: Record<string, string>;
  includes?: Record<string, readonly string[]>;
  howHeading?: Record<string, string>;
  howSteps?: Record<string, readonly string[]>;
  howClosing?: Record<string, string>;
  paragraphs?: Record<string, readonly string[]>;
  duration?: Record<string, string>;
  ctaLabel?: Record<string, string>;
  secondaryCtaLabel?: Record<string, string>;
  ctaHref?: string;
  secondaryCtaHref?: string;
  price?: number;
  currency?: string;
};

export function ProgramForm({
  contentKey,
  entry,
  defaults,
}: {
  contentKey?: string;
  entry?: CmsEntry;
  defaults: ProgramData;
}) {
  const data = {
    ...defaults,
    ...((entry?.data as ProgramData | undefined) ?? {}),
  };
  return (
    <GuardedForm action={saveProgram} className="space-y-6">
      <input type="hidden" name="content_key" value={contentKey ?? ""} />
      <input
        type="hidden"
        name="program_kind"
        value={data.kind ?? "coaching"}
      />
      <section className={`${panelClass} space-y-5`}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Price"
            name="price"
            type="number"
            defaultValue={data.price ?? 0}
          />
          <Field
            label="Currency"
            name="currency"
            defaultValue={data.currency ?? "CHF"}
          />
          <Field
            label="Display order"
            name="sort_order"
            type="number"
            defaultValue={entry?.sort_order ?? 0}
          />
        </div>
        <ImageUpload
          folder="programs"
          initialValue={entry?.image_path ?? data.image ?? ""}
          hint="Recommended: landscape image, at least 1600 px wide."
        />
      </section>
      {locales.map((locale) => (
        <LocaleFields key={locale} locale={locale}>
          <Field
            label="Program title"
            name={`title_${locale}`}
            defaultValue={data.title?.[locale] ?? ""}
            required={locale === "en"}
          />
          <TextArea
            label={
              data.kind === "conversation"
                ? "Opening line"
                : "Short introduction"
            }
            name={`intro_${locale}`}
            defaultValue={data.intro?.[locale] ?? ""}
            rows={3}
          />
          {data.kind === "conversation" ? (
            <RepeatableList
              label="Program text paragraphs"
              name={`paragraphs_${locale}`}
              initialItems={data.paragraphs?.[locale]}
              addLabel="Add paragraph"
              multiline
            />
          ) : (
            <>
              <Field
                label="Section heading: This program is for"
                name={`target_heading_${locale}`}
                defaultValue={data.targetHeading?.[locale] ?? ""}
              />
              <RepeatableList
                label="This program is for"
                name={`target_audience_${locale}`}
                initialItems={data.targetAudience?.[locale]}
                addLabel="Add audience point"
              />
              <Field
                label="Closing sentence"
                name={`transition_${locale}`}
                defaultValue={data.transition?.[locale] ?? ""}
              />
              <Field
                label="Section heading: This program includes"
                name={`includes_heading_${locale}`}
                defaultValue={data.includesHeading?.[locale] ?? ""}
              />
              <RepeatableList
                label="Program includes"
                name={`includes_${locale}`}
                initialItems={data.includes?.[locale]}
                addLabel="Add included item"
              />
              <Field
                label="Section heading: How it works"
                name={`how_heading_${locale}`}
                defaultValue={data.howHeading?.[locale] ?? ""}
              />
              <RepeatableList
                label="How it works steps"
                name={`how_steps_${locale}`}
                initialItems={data.howSteps?.[locale]}
                addLabel="Add step"
                multiline
              />
              <Field
                label="How it works closing sentence"
                name={`how_closing_${locale}`}
                defaultValue={data.howClosing?.[locale] ?? ""}
              />
            </>
          )}
          <Field
            label="Duration"
            name={`duration_${locale}`}
            defaultValue={data.duration?.[locale] ?? ""}
          />
          <Field
            label="Primary button label"
            name={`cta_label_${locale}`}
            defaultValue={data.ctaLabel?.[locale] ?? ""}
          />
          {data.kind === "conversation" && (
            <Field
              label="Secondary button label"
              name={`secondary_cta_label_${locale}`}
              defaultValue={data.secondaryCtaLabel?.[locale] ?? ""}
            />
          )}
        </LocaleFields>
      ))}
      <Field
        label="Primary button destination"
        name="cta_href"
        defaultValue={data.ctaHref ?? "/kontakt"}
      />
      {data.kind === "conversation" && (
        <Field
          label="Secondary button destination"
          name="secondary_cta_href"
          defaultValue={
            data.secondaryCtaHref ?? `/programme/${contentKey ?? ""}`
          }
        />
      )}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-[#fbf8f2]/95 p-4 shadow-lg sm:sticky sm:bottom-3">
        <SaveButton value="published">Save & update website</SaveButton>
        <SaveButton value="draft" variant="secondary">
          Save draft (not live)
        </SaveButton>
        <SaveButton value="preview" variant="secondary">
          Preview without saving
        </SaveButton>
      </div>
    </GuardedForm>
  );
}

export function ProgramDeleteForm({ contentKey }: { contentKey: string }) {
  return (
    <form action={deleteEntry} className="mt-8 border-t border-black/10 pt-6">
      <input type="hidden" name="content_type" value="program" />
      <input type="hidden" name="content_key" value={contentKey} />
      <ConfirmSubmit message="Delete this program? This action cannot be undone.">
        Delete program
      </ConfirmSubmit>
    </form>
  );
}
