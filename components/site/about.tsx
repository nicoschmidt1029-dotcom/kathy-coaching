import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Placeholder } from "./placeholder";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

const QUAL_KEYS = ["qualTrainer", "qualNutrition"] as const;

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
          <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal">
            {t("title")}
          </h2>

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

          <div className="mt-10 rounded-2xl border border-[var(--clay)]/15 bg-[var(--sand)]/40 p-6 sm:p-7">
            <p className="caption text-[var(--plum)]">
              {t("qualificationsTitle")}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-1">
              {QUAL_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-[0.95rem]">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[var(--plum)]"
                    aria-hidden
                  />
                  <span className="text-foreground/80">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
