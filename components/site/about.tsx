import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";
import { Placeholder } from "./placeholder";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

/**
 * Certifications, spelled out with the issuing institution rather than left
 * as a bare "Certified Personal Trainer" — the institution is the part that
 * carries weight. SNF Academy and Awakening School of Ministry are named in
 * Katey's own bio text. The exact certificate designations and stats below
 * (years coaching, people accompanied) are still pending from Katarina — see
 * the reminder note in lib/content-status.ts. Katarina asked for the visible
 * "NOCH AUSZUFÜLLEN" flags to come off the live page rather than sit there
 * as a permanent placeholder; the outstanding-info list lives in code
 * comments and project memory instead.
 */
const QUALS = [
  { title: "qualTrainerTitle", issuer: "qualTrainerIssuer" },
  { title: "qualNutritionTitle", issuer: "qualNutritionIssuer" },
  { title: "qualMinistryTitle", issuer: "qualMinistryIssuer" },
] as const;

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

          {/* One line per qualification, no card. The boxed three-row version
              with a separate issuer line under each was four elements deep for
              information that fits on one line. No TODO flags: Katarina asked
              for the page to look finished, not to sit there flagged as
              incomplete — see lib/content-status.ts for what's still pending
              from her. */}
          <div className="mt-10">
            <p className="caption">{t("qualificationsTitle")}</p>
            <ul className="mt-4 space-y-2.5">
              {QUALS.map((qual) => (
                <li
                  key={qual.title}
                  className="flex flex-wrap items-baseline gap-x-2 text-[0.95rem] text-foreground/80"
                >
                  <span>{t(qual.title)}</span>
                  <span aria-hidden className="text-foreground/30">
                    ·
                  </span>
                  <span className="text-foreground/55">{t(qual.issuer)}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
