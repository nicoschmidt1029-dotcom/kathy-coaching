import { useTranslations } from "next-intl";

const STEPS = ["step1", "step2", "step3", "step4"] as const;

/**
 * The method, step by step.
 *
 * Deliberately a sequence rather than a feature list: competence reads as
 * "she has done this before and knows what happens in week three", which a
 * grid of benefits cannot say.
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

        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-foreground/[0.08] md:mt-16 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step} className="card-pad bg-background">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="font-display text-[2.25rem] leading-none text-[var(--clay)]/45"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="card-title">{t(`${step}.title`)}</h3>
              </div>
              <p className="mt-4 max-w-prose text-[0.95rem] leading-[1.7] text-foreground/72">
                {t(`${step}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
