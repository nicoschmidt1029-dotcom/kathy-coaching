import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPublicPrograms } from "@/lib/cms";

export async function Programs({ locale }: { locale: Locale }) {
  const [programs, t] = await Promise.all([
    getPublicPrograms(locale),
    getTranslations({ locale, namespace: "programs" }),
  ]);

  return (
    <section id="programme" className="section-pad section-pad-top-tight">
      <div className="container-page">
        <p className="eyebrow">{t("realEyebrow")}</p>
        <div className="mt-8 space-y-16 md:mt-10">
          {programs.map((program) => (
            <article
              key={program.slug}
              className="grid items-start gap-8 border-t border-foreground/10 pt-8 md:grid-cols-12 md:gap-14 md:pt-10"
            >
              <Link
                href={`/programme/${program.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sand)] md:col-span-5"
              >
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </Link>
              <div className="md:col-span-7">
                <Link href={`/programme/${program.slug}`}>
                  <h1 className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-[1.05] text-[var(--plum)]">
                    {program.title}
                  </h1>
                </Link>
                <h2 className="mt-7 font-display text-xl text-foreground/90">
                  {program.targetHeading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {program.targetAudience.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground/72">
                      <Check className="mt-1 size-4 shrink-0 text-[var(--clay)]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-display text-xl italic text-foreground/85">
                  {program.transition}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 pt-6">
                  <p className="font-display text-2xl text-[var(--plum)]">
                    {program.price} {program.currency} / {program.duration}
                  </p>
                  <Link
                    href={`/programme/${program.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--plum)] underline-offset-4 hover:underline"
                  >
                    {t("viewProgram")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
