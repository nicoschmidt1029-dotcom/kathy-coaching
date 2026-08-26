import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { LocalizedProgram } from "@/lib/programs";

export function ConversationProgram({ program, showBackLink = false }: { program: LocalizedProgram; showBackLink?: boolean }) {
  return (
    <article className="border-t border-foreground/10 py-14 md:py-20">
      <div className="container-page">
        {showBackLink && <Link href="/programme" className="group mb-8 inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-[var(--plum)]"><ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />Programs</Link>}
        <div className={program.image ? "grid items-start gap-10 md:grid-cols-12 md:gap-16" : ""}>
          <div className={program.image ? "md:col-span-7" : "max-w-3xl md:ml-[8.333%]"}>
            <p className="eyebrow">Program C</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-[var(--plum)]">{program.title}</h1>
            {program.intro && <p className="mt-8 max-w-2xl font-display text-xl leading-[1.55] text-foreground/82 sm:text-2xl">{program.intro}</p>}
            <div className="mt-9 max-w-2xl space-y-6 md:mt-11 md:space-y-7">
              {(program.paragraphs ?? []).map((paragraph, index) => <p key={`${index}-${paragraph}`} className={index === (program.paragraphs?.length ?? 0) - 1 ? "font-display text-xl italic leading-[1.55] text-foreground/86 sm:text-2xl" : "text-[1.02rem] leading-[1.8] text-foreground/72 sm:text-lg"}>{paragraph}</p>)}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 bg-[var(--plum)] px-7 text-white hover:bg-[var(--plum)]/90"><Link href={program.ctaHref || "/kontakt"}>{program.ctaLabel || "Reach Out to Me"}<ArrowRight className="ml-1 size-4" /></Link></Button>
              {program.secondaryCtaLabel && program.secondaryCtaHref && <Button asChild size="lg" variant="outline" className="h-12 border-[var(--plum)]/25 bg-transparent px-7 text-[var(--plum)] hover:bg-[var(--sand)]"><Link href={program.secondaryCtaHref}>{program.secondaryCtaLabel}<ArrowRight className="ml-1 size-4" /></Link></Button>}
            </div>
          </div>
          {program.image && <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--sand)] md:col-span-5"><Image src={program.image} alt={program.imageAlt || program.title} fill sizes="(max-width: 768px) 100vw, 38vw" className="object-cover" /></div>}
        </div>
      </div>
    </article>
  );
}
