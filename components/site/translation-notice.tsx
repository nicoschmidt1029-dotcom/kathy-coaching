import { getTranslations } from "next-intl/server";
import { isDraftLocale } from "@/i18n/routing";

/**
 * Quiet strip shown on locales whose translation has not been reviewed by a
 * native speaker (see DRAFT_LOCALES in i18n/routing.ts).
 *
 * Deliberately understated — a thin band under the header, body-copy size,
 * no icon, no colour alarm. It is an honesty note, not a warning: a visitor
 * who hits an odd phrase should know why, without the page feeling broken.
 * The text lives in the draft locale's own messages, so it reads in the
 * language the notice is about.
 */
export async function TranslationNotice({ locale }: { locale: string }) {
  if (!isDraftLocale(locale)) return null;

  const t = await getTranslations({ locale, namespace: "translationNotice" });

  return (
    <div
      role="note"
      className="border-b border-[var(--clay)]/20 bg-[var(--sand)]/35"
    >
      <p className="container-page py-2.5 text-[0.82rem] leading-relaxed text-foreground/60">
        {t("draft")}
      </p>
    </div>
  );
}
