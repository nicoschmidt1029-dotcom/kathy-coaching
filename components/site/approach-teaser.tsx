import { useTranslations } from "next-intl";
import { Dumbbell, Salad, Heart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

const THREADS: { key: "train" | "nourish" | "soul"; Icon: LucideIcon }[] = [
  { key: "train", Icon: Dumbbell },
  { key: "nourish", Icon: Salad },
  { key: "soul", Icon: Heart },
];

export function ApproachTeaser() {
  const t = useTranslations("approach");

  return (
    <section className="section-pad relative overflow-hidden bg-[var(--sand)]/40">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
            {t("intro")}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {THREADS.map(({ key, Icon }) => (
            <li
              key={key}
              className="flex flex-col rounded-2xl border border-foreground/[0.06] bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--clay)]/30 hover:shadow-[0_20px_40px_-28px_rgba(60,40,52,0.4)]"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-[var(--clay)]/10 text-[var(--plum)] ring-1 ring-[var(--clay)]/20">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-lg leading-tight font-normal">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-foreground/70">
                {t(`${key}.teaser`)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-[0.95rem] text-[var(--plum)] transition-colors hover:text-foreground"
          >
            {t("readMore")}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
