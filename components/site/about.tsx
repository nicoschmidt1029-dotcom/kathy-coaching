import { useTranslations } from "next-intl";
import { Placeholder } from "./placeholder";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { Todo } from "./todo";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

/**
 * Certifications, spelled out with the issuing institution rather than left
 * as a bare "Certified Personal Trainer" — the institution is the part that
 * carries weight. SNF Academy and Awakening School of Ministry are named in
 * Katie's own bio text; the exact certificate designations still need to come
 * from her, hence the TODO markers.
 */
const QUALS = [
  { title: "qualTrainerTitle", issuer: "qualTrainerIssuer", todo: "todoCertificate" },
  { title: "qualNutritionTitle", issuer: "qualNutritionIssuer", todo: "todoCertificate" },
  { title: "qualMinistryTitle", issuer: "qualMinistryIssuer", todo: "todoGraduation" },
] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-pad">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
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
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title max-w-[20ch]">{t("title")}</h2>

          <div className="mt-8 space-y-5 text-pretty text-foreground/75 sm:text-lg sm:leading-[1.7]">
            <p>
              {t.rich("calling", {
                em: (chunks) => (
                  <em className="not-italic font-display">{chunks}</em>
                ),
              })}
            </p>
            <p>
              {t.rich("story", {
                em: (chunks) => (
                  <em className="not-italic font-display">{chunks}</em>
                ),
              })}
            </p>
          </div>

          {/* Concrete numbers. Two of the three are waiting on Katie — shown
              as TODO rather than filled with a plausible-looking guess. */}
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-foreground/[0.08] sm:grid-cols-3">
            {/* Placeholders stay at body size — at display scale the pill
                wraps over three lines and the row reads as broken rather
                than as pending. Only a real figure gets the big type. */}
            <div className="bg-background px-5 py-5">
              <dt className="caption">{t("statYearsLabel")}</dt>
              <dd className="mt-2.5 leading-snug">
                <Todo>{t("todoYears")}</Todo>
              </dd>
            </div>
            <div className="bg-background px-5 py-5">
              <dt className="caption">{t("statClientsLabel")}</dt>
              <dd className="mt-2.5 leading-snug">
                <Todo>{t("todoClients")}</Todo>
              </dd>
            </div>
            <div className="bg-background px-5 py-5">
              <dt className="caption">{t("statFormatLabel")}</dt>
              <dd className="mt-2 font-display text-[1.6rem] leading-none">
                {t("statFormatValue")}
              </dd>
            </div>
          </dl>

          {/* One line per qualification, no card. The boxed three-row version
              with a separate issuer line under each was four elements deep for
              information that fits on one line. */}
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
                  <Todo>{t(qual.todo)}</Todo>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
