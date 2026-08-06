import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function LegalShell({
  eyebrow,
  title,
  updated,
  draft = false,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Date shown under the title. Suppressed while `draft` is set — an
   *  incomplete document must not carry a date that implies it is in force. */
  updated: string;
  /** Renders the incomplete-document notice and hides the "last updated" line. */
  draft?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("legal");

  return (
    <article className={cn("section-pad", className)}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="section-title">{title}</h1>
          <p className="caption mt-4">
            {draft ? t("draftLabel") : t("updatedLabel", { date: updated })}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            {draft && <DraftNotice />}
            <div className="prose-legal">{children}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Unmissable header for a legal document that is not finished.
 *
 * Without it, a page of confident legal prose with a few highlighted gaps
 * reads as authoritative — exactly the impression an incomplete Impressum
 * must not give. Styled in the same amber as the placeholders so the two
 * obviously belong together, and kept plain rather than alarming: this is a
 * factual status, not a warning banner.
 */
function DraftNotice() {
  const t = useTranslations("legal");

  return (
    <div
      role="note"
      className="mb-10 rounded-xl border border-[oklch(0.75_0.09_60)] bg-[oklch(0.94_0.06_78)]/55 px-5 py-4"
    >
      <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-[oklch(0.35_0.09_50)]">
        {t("noticeLabel")}
      </p>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-[oklch(0.32_0.05_50)]">
        {t.rich("noticeBody", {
          mark: (chunks) => (
            <span className="font-mono text-[0.85em]">{chunks}</span>
          ),
        })}
      </p>
    </div>
  );
}

// Lives in ./todo now — re-exported so the legal pages keep their import.
export { Todo } from "./todo";
