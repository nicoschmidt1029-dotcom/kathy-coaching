import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";
import { Placeholder } from "./placeholder";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

/**
 * Katarina's rule for this section: "What I studied is written in Katey —
 * I don't need to be mentioned anywhere else." The separate qualifications
 * list (SNF Academy, Awakening School of Ministry, one row per cert) used
 * to sit below the bio and repeated exactly what the `story` paragraph
 * already says. Removed — the bio text is now the only place her training
 * is mentioned on the whole site. Exact certificate designations are still
 * pending from her; see lib/content-status.ts.
 */
export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-pad section-pad-top-tight">
      <div className="container-page">
        <p className="eyebrow">{t("eyebrow")}</p>

        {/* Used to straddle the photograph — the hollow first word landing on
            the portrait, following a different design reference. Katarina
            asked for text to stay off photos, so the title now sits above
            the grid like every other section on the site.
            2026-08-19: mt-6 -> mt-4 (small, per request) so the eyebrow and
            title read as one tighter unit — same nudge as the section's
            top padding below, not a new pattern. */}
        <DisplayTitle className="mt-4">{t("overlapTitle")}</DisplayTitle>

        {/* 2026-08-19 mobile-refinement pass: gap-12 -> gap-8 on mobile
            only (md:gap-16 untouched) — part of the same "reduce excessive
            mobile gaps" pass as Mission/Programs; the outer mt-10 is
            unchanged since it's the photo/text column gap, not a large
            empty band. */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              {TEMP_PHOTOS.about ? (
                <Placeholder
                  label={t("portraitLabel")}
                  aspect="portrait"
                  tone="sand"
                  src={TEMP_PHOTOS.about.url}
                  alt={TEMP_PHOTOS.about.alt}
                  credit={TEMP_PHOTOS.about.credit}
                />
              ) : (
                <PortraitPlaceholder label={t("portraitLabel")} />
              )}
              {/* Mobile-only follow-up (2026-08-18): the role label
                  ("Katey · Personal Trainerin · Ernährungsberaterin") was
                  wrapping onto two/three lines under the portrait at phone
                  widths — .caption's 0.18em tracking is wide enough that
                  the full string doesn't fit as a single line at its
                  default 0.72rem below md. Smaller size + tighter tracking
                  keeps it on one row at realistic phone widths (~360px+);
                  natural wrap is left as the fallback at the narrowest
                  widths (down to 320px) rather than forcing nowrap and
                  letting it overflow. md+ reverts to the untouched
                  .caption defaults. */}
              <p className="caption mt-4 text-[0.62rem] tracking-[0.08em] md:text-[0.72rem] md:tracking-[0.18em]">
                {t("portraitCaption")}
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
          {/* The small subheading ("Strength, nourishment, and a quiet kind
              of confidence.") sat here — removed 2026-08-19 at Katarina's
              explicit request, not replaced with another decorative line.
              `calling` is now the first thing in this column, so it carries
              the opening beat on its own instead of following a second
              headline that repeated the same job. mt-0 (was mt-8) since
              it's no longer following the removed h3 — still lines up with
              the photo column's top via the grid's items-start. */}
          <p className="mt-0 max-w-lg font-display text-[1.4rem] italic leading-snug text-foreground/88 sm:text-[1.7rem]">
            {t.rich("calling", {
              em: (chunks) => <span className="not-italic">{chunks}</span>,
            })}
          </p>
          {/* Bio expanded 2026-08-18 with Katarina's new biography (movement
              -> nourishment/inner health -> education -> mission) — split
              into four short paragraphs with real vertical space between
              them rather than one dense block, per her explicit brief that
              a wall of text would read wrong on this page. Written for
              English first, then translated into the same four blocks for
              DE/SK. The original single `story` line is kept as a fallback
              via `t.has` in case a locale is ever added without the split
              content, so nothing breaks — every locale currently shipped
              carries the new structure. Widened to max-w-xl (~576px) from
              the previous max-w-md (~448px) — comfortably inside the
              520-650px readable-width range for four paragraphs instead of
              one short one.

              2026-08-19: storyMovement and storyNourish reverted to
              Katarina's own unedited sentences — those two were the only
              two blocks the original brief showed in both a raw and a
              "polished" form, and the polished rewrite read as too
              changed from what she actually wrote. storyEducation and
              storyMission were only ever given in one form (never shown
              raw separately), so they're untouched here. */}
          {/* 2026-08-19 mobile-refinement pass: content/length unchanged
              per client's explicit request — only reading rhythm tuned.
              space-y-5 -> space-y-6 on mobile (sm:space-y-5 restores the
              original desktop gap exactly) for a clearer break between
              the four blocks, and an explicit leading-[1.65] on mobile
              (was inheriting the browser default ~1.5; sm:leading-[1.7]
              still wins at sm+ same as before) for a more comfortable
              line-height at phone widths. */}
          {t.has("storyMovement") ? (
            <div className="mt-6 max-w-xl space-y-6 sm:space-y-5">
              {(
                [
                  "storyMovement",
                  "storyNourish",
                  "storyEducation",
                  "storyMission",
                ] as const
              ).map((key) => (
                <p
                  key={key}
                  className="text-pretty leading-[1.65] text-foreground/72 sm:text-lg sm:leading-[1.7]"
                >
                  {t.rich(key, {
                    em: (chunks) => (
                      <em className="not-italic font-display italic">
                        {chunks}
                      </em>
                    ),
                  })}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-xl text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
              {t.rich("story", {
                em: (chunks) => (
                  <em className="not-italic font-display italic">{chunks}</em>
                ),
              })}
            </p>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
