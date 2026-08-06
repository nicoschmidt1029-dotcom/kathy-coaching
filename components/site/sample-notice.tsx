import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { TESTIMONIALS_ARE_REAL } from "@/lib/content-status";

/**
 * Says plainly that the stories nearby are not from real clients.
 *
 * Same amber as the legal placeholders and the incomplete-document notice, so
 * "this part of the site isn't real yet" reads as one consistent signal
 * wherever it appears. Renders nothing once TESTIMONIALS_ARE_REAL is true.
 */
export function SampleNotice({ className }: { className?: string }) {
  const t = useTranslations("sampleNotice");

  if (TESTIMONIALS_ARE_REAL) return null;

  return (
    <div
      role="note"
      className={cn(
        "rounded-xl border border-[oklch(0.75_0.09_60)] bg-[oklch(0.94_0.06_78)]/55 px-5 py-4",
        className
      )}
    >
      <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-[oklch(0.35_0.09_50)]">
        {t("label")}
      </p>
      <p className="mt-2 max-w-prose text-[0.92rem] leading-relaxed text-[oklch(0.32_0.05_50)]">
        {t("body")}
      </p>
    </div>
  );
}
