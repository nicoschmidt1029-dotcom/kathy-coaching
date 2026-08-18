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
          phones per the mobile pass; desktop untouched.
          Second pass (2026-08-18): still read too tall/spacious at 190px
          logo — gap 6 -> 5 tightens logo/claim/nav a touch further. */}
      <div className="container-page py-8 md:py-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-sm">
            {/* 2026-08-18 same-day follow-up: 190px read as too dominant on
                phones ("too big"). Dropped to 112px — meaningfully smaller
                than the header's mobile logo (136px, see wordmark.tsx),
                since the footer no longer needs to out-size a hamburger the
                way it once justified being wider than the header. Checked
                against Wordmark's internal proportions (1000x860 source,
                tagline row baked into the same image): at 112px the
                "HEALTH · FITNESS · FAITH" tagline text is still legible,
                same trade-off the header's 136px already accepts at a
                slightly larger size. md: stays the shared 148px, matching
                the header on desktop, unchanged. */}
            <Wordmark onDark className="w-[112px] md:w-[148px]" />
            {/* Katey's own line, from her brand document, where it sits
                directly under the name. It replaces the blurb we wrote
                ("holistic coaching for body, nutrition and soul…") — hers is
                shorter and it is actually hers. `footer.blurb` is kept in the
                message files in case the longer version is wanted back.
                mt-4 -> mt-3 on mobile (md:mt-5 unchanged) as part of the
                second tightening pass. */}
            <p className="mt-3 max-w-[22ch] font-display text-[1.15rem] leading-snug italic text-[var(--primary-foreground)]/80 md:mt-5">
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

        {/* mt-6 -> mt-5 and pt-5 -> pt-4 on mobile (md: unchanged) — second
            tightening pass, matches the gap-6 -> gap-5 change above. */}
        <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-[var(--primary-foreground)]/15 pt-4 text-[0.8rem] text-[var(--primary-foreground)]/50 sm:flex-row sm:items-center md:mt-10 md:pt-6">
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
