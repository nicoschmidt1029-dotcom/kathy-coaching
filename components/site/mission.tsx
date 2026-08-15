import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";

/**
 * Katey's mission, as one statement — and the page's one coloured ground.
 *
 * This used to sit on a plum band, which was removed because it was one of
 * five different section colours and a page that changes ground every time
 * you scroll reads as assembled rather than designed. Removing all of them
 * overcorrected: with no coloured surface anywhere, the whole page ran on
 * cream and read flat however warm the accents were.
 *
 * So the band is back, once. Deep bronze-gold, not plum — matching Katey's
 * own brand board — and this is the only full-bleed colour above the footer;
 * it marks the emotional centre of the page ("your
 * best years are not behind you") and gives the eye somewhere to land in a
 * long scroll. If a second band ever gets added here, the reasoning above is
 * the one to re-read first.
 *
 * No button: this sits directly above the contact form on the one-pager, and
 * a call to action that scrolls you to the section already under your thumb
 * is noise.
 *
 * The full text stays in messages/*.json — this renders `title` and `p3`,
 * which is the sentence the rest was building towards.
 */
export function Mission() {
  const t = useTranslations("mission");

  return (
    <section id="mission" className="section-pad relative overflow-hidden bg-[var(--petrol-deep)] text-[var(--primary-foreground)]">
      <div className="container-page">
        <p className="eyebrow text-[var(--primary-foreground)]/60">
          {t("eyebrow")}
        </p>

        <DisplayTitle className="mt-8 max-w-[16ch]" onDark>
          {t("title")}
        </DisplayTitle>

        <p className="mt-10 max-w-md font-display text-[1.35rem] leading-snug italic text-[var(--primary-foreground)]/70 sm:text-[1.6rem]">
          {t("p3")}
        </p>

      </div>
    </section>
  );
}
