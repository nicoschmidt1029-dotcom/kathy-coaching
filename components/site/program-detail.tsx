import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { LocalizedProgram } from "@/lib/programs";

export async function ProgramDetail({ program, locale, showBackLink = true }: { program: LocalizedProgram; locale: Locale; showBackLink?: boolean }) {
  const [t, nav] = await Promise.all([getTranslations({ locale, namespace: "programs" }), getTranslations({ locale, namespace: "nav" })]);

  return (
    <article className="overflow-hidden pb-16 md:pb-24">
      <div className="container-page section-pad-top-tight">
        {showBackLink && <Link href="/programme" className="group inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-[var(--plum)]"><ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />{t("backToPrograms")}</Link>}
        <header className={showBackLink ? "mt-8" : ""}>
          <p className="eyebrow">{t("realEyebrow")}</p>
          <div className="mt-5 grid items-end gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-9 lg:col-span-8">
              <h1 className="max-w-5xl font-display text-[clamp(2.65rem,6.2vw,5.6rem)] leading-[0.98] tracking-[-0.025em] text-[var(--plum)]">{program.title}</h1>
              {program.intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground/68">{program.intro}</p>}
            </div>
            <p className="font-display text-2xl italic text-foreground/72 md:col-span-3 md:pb-2 lg:col-span-4 lg:text-3xl">{program.duration}</p>
          </div>
        </header>

        <div className="mt-12 grid items-start gap-10 md:mt-16 md:grid-cols-12 md:gap-14 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--sand)] md:col-span-5">
            <Image src={program.image} alt={program.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
          </div>
          <section className="md:col-span-7 md:pt-8 lg:pt-14">
            <h2 className="max-w-lg font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-[var(--plum)]">{program.targetHeading}</h2>
            <ul className="mt-8 border-t border-foreground/12">
              {program.targetAudience.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-foreground/12 py-4 text-foreground/74 sm:grid-cols-[2.5rem_1fr] sm:py-5"><span className="font-display text-sm text-[var(--clay)]">{String(index + 1).padStart(2, "0")}</span><span className="leading-relaxed">{item}</span></li>)}
            </ul>
            <p className="mt-8 max-w-xl font-display text-2xl italic leading-snug text-foreground/88 md:text-3xl">{program.transition}</p>
          </section>
        </div>
      </div>

      <section className="container-page mt-20 md:mt-28">
        <div className="grid gap-8 border-t border-foreground/12 pt-10 md:grid-cols-12 md:gap-14 md:pt-14">
          <div className="md:col-span-4"><p className="eyebrow">{t("realEyebrow")}</p><h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] text-[var(--plum)]">{program.includesHeading}</h2></div>
          <ol className="md:col-span-8">
            {program.includes.map((item, index) => <li key={item} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-foreground/12 py-5 first:border-t sm:grid-cols-[3.5rem_1fr] sm:py-6"><span className="font-display text-lg text-[var(--clay)]">{String(index + 1).padStart(2, "0")}</span><span className="text-base leading-relaxed text-foreground/76 sm:text-lg">{item}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="container-page mt-20 md:mt-28">
        <div className="rounded-[1.75rem] bg-[var(--plum)] px-6 py-10 text-white sm:px-10 md:flex md:items-end md:justify-between md:gap-10 md:px-14 md:py-14">
          <div><p className="text-xs font-medium uppercase tracking-[0.22em] text-white/62">{t("price")}</p><p className="mt-3 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none">{program.price} {program.currency}</p><p className="mt-3 text-base text-white/68">{program.duration}</p></div>
          <Button asChild size="lg" className="mt-8 h-12 bg-white px-7 text-[var(--plum)] hover:bg-white/90 md:mt-0"><Link href={program.ctaHref || "/kontakt"}>{program.ctaLabel || nav("contact")}<ArrowRight className="ml-1 size-4" /></Link></Button>
        </div>
      </section>
    </article>
  );
}
