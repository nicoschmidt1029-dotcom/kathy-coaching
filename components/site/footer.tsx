import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./wordmark";

/*
 * The page's second and last coloured ground.
 *
 * Petrol-deep, matching the mission band. A footer on the same cream as the
 * body has no bottom edge — the page just stops. Giving it the band colour
 * closes the scroll and pairs the two grounds instead of scattering colour.
 */
export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--petrol-deep)] text-[var(--primary-foreground)]">
      <div className="container-page py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Wordmark onDark />
            {/* Katey's own line, from her brand document, where it sits
                directly under the name. It replaces the blurb we wrote
                ("holistic coaching for body, nutrition and soul…") — hers is
                shorter and it is actually hers. `footer.blurb` is kept in the
                message files in case the longer version is wanted back. */}
            <p className="mt-5 max-w-[22ch] font-display text-[1.15rem] leading-snug italic text-[var(--primary-foreground)]/80">
              {t("claim")}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-[0.92rem] text-[var(--primary-foreground)]/70 sm:flex-row sm:gap-6">
            <Link
              href="/imprint"
              className="transition-colors hover:text-[var(--primary-foreground)]"
            >
              {t("imprint")}
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[var(--primary-foreground)]"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/kontakt"
              className="transition-colors hover:text-[var(--primary-foreground)]"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--primary-foreground)]/15 pt-6 text-[0.8rem] text-[var(--primary-foreground)]/50 sm:flex-row sm:items-center">
          {/* String, not number — ICU would format 2026 with a thousands separator */}
          <p>{t("copyright", { year: String(year) })}</p>
          {/* .caption hardcodes a charcoal tint for the cream ground; on petrol
              it comes out near-black. Overridden here rather than in the class
              — every other use of .caption is on cream and is fine. */}
          <p className="caption text-[var(--primary-foreground)]/50">
            {t("madeWithCare")}
          </p>
        </div>
      </div>
    </footer>
  );
}
