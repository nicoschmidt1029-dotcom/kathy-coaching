import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeFinalCta() {
  return (
    <section className="section-pad relative overflow-hidden bg-[var(--plum)] text-[var(--primary-foreground)]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-15%] h-[520px] w-[520px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.06 42), transparent 70%)",
        }}
      />
      <div className="container-page text-center">
        <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/70">
          When you&rsquo;re ready
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance text-[var(--primary-foreground)]">
          A free 30-minute discovery call — no commitment, just a conversation.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-[var(--primary-foreground)]/80 sm:text-lg sm:leading-[1.7]">
          Tell me where you are and where you&rsquo;d like to go. If we&rsquo;re
          a fit, we&rsquo;ll take it from there. If not, you&rsquo;ll leave with
          a clearer next step either way.
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group/button h-12 bg-[var(--primary-foreground)] px-6 text-[0.95rem] text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
          >
            <Link href="/kontakt">
              Book a free discovery call
              <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
