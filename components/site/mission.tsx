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
type EditableContent = { eyebrow?: string; headline?: string; body?: string; image?: string | null };

export function Mission({ content }: { content?: EditableContent }) {
  const t = useTranslations("mission");
  const suppliedParagraphs = content?.body?.split(/\n\s*\n/).filter(Boolean) ?? [];
  const statement = suppliedParagraphs[0] || t("p3");
  const bodyParagraphs = suppliedParagraphs.length > 1 ? suppliedParagraphs.slice(1) : t("body").split(/\n\s*\n/).filter(Boolean);
  const photo = content?.image
    ? { url: content.image, alt: t("eyebrow") }
    : TEMP_PHOTOS.homeBand;

  return (
    <section id="mission" className="section-pad section-pad-top-tight relative overflow-hidden">
      {/* gap-12 -> gap-8 on mobile only (md:gap-16 unchanged): keeps
          Katarina's photo closer under the statement instead of a large
          gap, per her mobile-pass note.
          2026-08-19 mobile-refinement pass: gap-8 -> gap-6 on mobile only
          (md:gap-16 still untouched) — client felt the empty space before
          the photo was still too large; title/lede margins below tightened
          to match, same treatment. */}
      <div className="container-page grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="eyebrow">{content?.eyebrow || t("eyebrow")}</p>

          {/* mt-8 -> mt-5 on mobile (md:mt-8 restores desktop). */}
          <DisplayTitle as="h1" className="mt-5 max-w-[16ch] md:mt-8">
            {content?.headline || t("title")}
          </DisplayTitle>

          {/* mt-10 -> mt-5 on mobile (md:mt-10 restores desktop). */}
          <p className="mt-5 max-w-md font-display text-[1.35rem] leading-snug italic text-foreground/80 sm:text-[1.6rem] md:mt-10">
            {statement}
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
      <div className="container-page mt-8 md:mt-10">
        <div className="max-w-xl space-y-7 md:ml-[12.5%] md:space-y-9 lg:ml-[16.666%]">
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={index === 0
                ? "whitespace-pre-line text-pretty text-[1.16rem] leading-[1.85] text-foreground/82 sm:text-xl md:text-[1.34rem] md:leading-[1.85]"
                : "whitespace-pre-line text-pretty text-[1.02rem] leading-[1.8] text-foreground/70 sm:text-lg md:text-[1.16rem] md:leading-[1.85]"}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
