import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProgramsTeaser() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow">The programs</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
              Three programs. You choose where to begin.
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
              Training only, training + nutrition, or the complete path —
              body, plate, and soul held together. All one-on-one, all six
              weeks. Real change asks for real participation, so I take on a
              small number of clients each month.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Button
                asChild
                size="lg"
                className="group/button h-12 bg-[var(--plum)] px-6 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
              >
                <Link href="/programme">
                  See programs &amp; pricing
                  <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-1.5 text-[0.95rem] text-foreground/72 transition-colors hover:text-foreground"
              >
                Not sure? Talk on a call
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
