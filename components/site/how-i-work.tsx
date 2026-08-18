import Image from "next/image";
import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";

const STEPS = [
  { key: "step1", img: "/images/illustrations/step-talk.png" },
  { key: "step2", img: "/images/illustrations/step-start.png" },
  { key: "step3", img: "/images/illustrations/step-plan.png" },
  { key: "step4", img: "/images/illustrations/step-adjust.png" },
] as const;

/**
 * The method, step by step.
 *
 * Deliberately a sequence rather than a feature list: competence reads as
 * "she has done this before and knows what happens in week three", which a
 * grid of benefits cannot say.
 *
 * Each step carries a small drawing in the same hand as the approach
 * illustrations. Four paragraphs in a row is a wall; four objects — two cups,
 * a pair of shoes, a notebook, a plant — let the eye move through it and give
 * the section something to look at besides type.
 */
export function HowIWork() {
  const t = useTranslations("howIWork");

  return (
    <section id="how-i-work" className="section-pad">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <DisplayTitle className="mt-6">{t("title")}</DisplayTitle>
          <p className="section-lede">{t("intro")}</p>
        </div>

        {/* Mobile-only compact pass (2026-08-18): four full-width square
            image + title + body blocks in a single column meant a very
            long scroll with a lot of empty vertical air between blocks on
            phones. Below sm this becomes a tight stacked-card row instead
            — a small square thumbnail beside the number/title/body rather
            than stacked above it, with a hairline divider doing the
            separation work instead of a big gap-y. sm+ (unchanged) reverts
            to the original full-width image-on-top grid layout exactly as
            it was. No copy, count, or order changed — same STEPS/t keys. */}
        <ol className="mt-10 flex flex-col divide-y divide-foreground/[0.08] sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:divide-y-0 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.key}
              className="flex items-start gap-4 py-5 first:pt-0 sm:flex-col sm:gap-0 sm:py-0"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[var(--sand)]/25 sm:aspect-square sm:size-auto sm:w-full sm:rounded-2xl">
                <Image
                  src={step.img}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 sm:mt-6">
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span
                    aria-hidden
                    className="font-mono text-[0.68rem] tracking-[0.14em] text-[var(--clay)] sm:text-[0.72rem] sm:tracking-[0.18em]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="card-title text-[1rem] sm:text-[1.15rem]">
                    {t(`${step.key}.title`)}
                  </h3>
                </div>
                <p className="mt-1.5 text-[0.85rem] leading-[1.55] text-foreground/68 sm:mt-3 sm:text-[0.92rem] sm:leading-[1.7]">
                  {t(`${step.key}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
