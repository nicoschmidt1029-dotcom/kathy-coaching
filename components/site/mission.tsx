import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";

/**
 * Katey's mission, as one statement.
 *
 * Used to sit on a dark charcoal band (previously plum). Katarina's own
 * review: the dark ground read as "brown" against the rest of the site's
 * warm ivory pages, and she asked for it gone — the same warm sand/ivory
 * ground as everywhere else, with dark charcoal type, matching the visual
 * language she'd already approved on the other pages.
 *
 * No button: this is its own page now, one thing to read, not a scroll
 * stop with a call to action pointing at the section already under your
 * thumb.
 *
 * The full text stays in messages/*.json — this renders `title` and `p3`,
 * which is the sentence the rest was building towards.
 */
export function Mission() {
  const t = useTranslations("mission");

  return (
    <section id="mission" className="section-pad relative overflow-hidden">
      <div className="container-page">
        <p className="eyebrow">{t("eyebrow")}</p>

        <DisplayTitle className="mt-8 max-w-[16ch]">
          {t("title")}
        </DisplayTitle>

        <p className="mt-10 max-w-md font-display text-[1.35rem] leading-snug italic text-foreground/80 sm:text-[1.6rem]">
          {t("p3")}
        </p>

      </div>
    </section>
  );
}
