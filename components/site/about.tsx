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
    <section id="about" className="section-pad">
      <div className="container-page">
        <p className="eyebrow">{t("eyebrow")}</p>

        {/* Used to straddle the photograph — the hollow first word landing on
            the portrait, following a different design reference. Katarina
            asked for text to stay off photos, so the title now sits above
            the grid like every other section on the site. */}
        <DisplayTitle className="mt-6">{t("overlapTitle")}</DisplayTitle>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
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
              <p className="caption mt-4">{t("portraitCaption")}</p>
            </div>
          </div>

          <div className="md:col-span-7">
          <h3 className="mt-0 max-w-[20ch] font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] font-normal">
            {t("title")}
          </h3>

          {/* The two paragraphs used to run at identical size and weight —
              same font, same size, one em-phrase each — which is exactly
              what read as flat/wrong here. Now they carry different jobs:
              `calling` is a short pull-quote statement, set large and
              italic; `story` is the actual biographical detail, set as
              plain body copy. The emphasised fragment inside the quote
              flips to upright serif, the same roman-in-italic move the
              hero headline uses. */}
          <p className="mt-8 max-w-lg font-display text-[1.4rem] italic leading-snug text-foreground/88 sm:text-[1.7rem]">
            {t.rich("calling", {
              em: (chunks) => <span className="not-italic">{chunks}</span>,
            })}
          </p>
          <p className="mt-6 max-w-md text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
            {t.rich("story", {
              em: (chunks) => (
                <em className="not-italic font-display italic">{chunks}</em>
              ),
            })}
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
