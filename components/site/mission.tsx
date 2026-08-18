import Image from "next/image";
import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

/**
 * Katey's mission, as one statement, with a Katarina photo opposite it.
 *
 * Used to sit on a dark charcoal band (previously plum). Katarina's own
 * review: the dark ground read as "brown" against the rest of the site's
 * warm ivory pages, and she asked for it gone — the same warm sand/ivory
 * ground as everywhere else, with dark charcoal type, matching the visual
 * language she'd already approved on the other pages.
 *
 * The image is new: with just the statement, the right half of the page
 * sat empty on wide screens. Originally reused the blazer-wide portrait —
 * but that is the same photo (just AI-widened) as the one the Contact page
 * uses in its narrower crop, so it read as a duplicate. Swapped 2026-08-18
 * to the `homeBand` track photo instead: a different shoot/pose, warm-toned,
 * and not otherwise rendered anywhere live (HomeBand, the component that
 * slot was built for, isn't imported by any page — see home-band.tsx).
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
  const photo = TEMP_PHOTOS.homeBand;

  return (
    <section id="mission" className="section-pad relative overflow-hidden">
      <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="eyebrow">{t("eyebrow")}</p>

          <DisplayTitle className="mt-8 max-w-[16ch]">
            {t("title")}
          </DisplayTitle>

          <p className="mt-10 max-w-md font-display text-[1.35rem] leading-snug italic text-foreground/80 sm:text-[1.6rem]">
            {t("p3")}
          </p>
        </div>

        {photo && (
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover object-[45%_30%]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
