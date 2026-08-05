import { useTranslations } from "next-intl";

export function Mission() {
  const t = useTranslations("mission");

  return (
    <section className="section-pad bg-[var(--sand)]/40">
      {/* Measure is constrained inside the page container, not by shrinking
          it — otherwise this block centres and its left edge stops lining up
          with every other section. */}
      <div className="container-page">
        <div className="max-w-[70ch]">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title">{t("title")}</h2>

          <div className="mt-8 space-y-5 text-pretty text-foreground/75 sm:text-lg sm:leading-[1.7]">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p className="font-display text-foreground text-[1.2rem] leading-snug sm:text-[1.6rem]">
              {t("p3")}
            </p>
            <p className="text-foreground/80">{t("p4")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
