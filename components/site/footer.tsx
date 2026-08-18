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
      {/* py-10 -> py-8 and the column gap 8 -> 6 on mobile (md: values
          unchanged) — tightens the logo/claim/nav/copyright rhythm on
          phones per the mobile pass; desktop untouched. */}
      <div className="container-page py-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-sm">
            {/* Footer logo gets its own, wider mobile size than the header's
                Wordmark (150px) — no hamburger/nav competing for width here,
                so the client's requested ~170-220px mobile range fits. md:
                stays the shared 148px, matching the header on desktop. */}
            <Wordmark onDark className="w-[190px] md:w-[148px]" />
            {/* Katey's own line, from her brand document, where it sits
                directly under the name. It replaces the blurb we wrote
                ("holistic coaching for body, nutrition and soul…") — hers is
                shorter and it is actually hers. `footer.blurb` is kept in the
                message files in case the longer version is wanted back. */}
            <p className="mt-4 max-w-[22ch] font-display text-[1.15rem] leading-snug italic text-[var(--primary-foreground)]/80 md:mt-5">
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

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-[var(--primary-foreground)]/15 pt-5 text-[0.8rem] text-[var(--primary-foreground)]/50 sm:flex-row sm:items-center md:mt-10 md:pt-6">
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
