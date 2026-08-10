import Image from "next/image";
import { useTranslations } from "next-intl";

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
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-lede">{t("intro")}</p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.key} className="flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--sand)]/25">
                <Image
                  src={step.img}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="font-mono text-[0.72rem] tracking-[0.18em] text-[var(--clay)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="card-title">{t(`${step.key}.title`)}</h3>
              </div>
              <p className="mt-3 text-[0.92rem] leading-[1.7] text-foreground/68">
                {t(`${step.key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
