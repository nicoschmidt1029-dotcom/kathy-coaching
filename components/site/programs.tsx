import Link from "next/link";
import { Dumbbell, Salad, Heart, Check, ArrowRight, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Block = {
  name: string;
  blurb: string;
  price: number;
  Icon: LucideIcon;
};

const BLOCKS: Block[] = [
  {
    name: "Personal training",
    blurb:
      "Programming, technique, accountability. Weekly sessions, adjusted to your life.",
    price: 280,
    Icon: Dumbbell,
  },
  {
    name: "Nutrition coaching",
    blurb:
      "A plan you can actually live with. Real food, real flexibility, no fear.",
    price: 180,
    Icon: Salad,
  },
  {
    name: "Spiritual mentoring",
    blurb:
      "Honest conversation, prayer, and biblical perspective on worth.",
    price: 160,
    Icon: Heart,
  },
];

const COMPLETE_INCLUDES = [
  "All three threads, held together with intention",
  "Direct WhatsApp check-ins between sessions",
  "Weekly prayer & scripture guidance woven through",
  "Priority when new client spots open",
  "A quiet message when I notice you’ve gone silent",
];

const ENTRY_PACKAGES = [
  {
    name: "Training only",
    price: 280,
    blurb: "Start with movement. Add the rest later, if it fits.",
  },
  {
    name: "Training + nutrition",
    price: 420,
    blurb: "Strength and a calmer relationship with food.",
  },
];

const SUM = BLOCKS.reduce((acc, b) => acc + b.price, 0);
const COMPLETE_PRICE = 560;

export function Programs() {
  return (
    <section id="programs" className="section-pad">
      <div className="container-page">
        {/* Intro + commitment */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow">The programs</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
              Three parts. One path. Choose where to begin.
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
              Real change asks for real participation. I take on a small
              number of clients each month so I can be fully present for
              each one — this isn&rsquo;t a course you consume, it&rsquo;s a
              six-week walk we take together.
            </p>
          </div>
        </div>

        {/* Building blocks */}
        <div className="mt-16 md:mt-20">
          <p className="caption">The three threads · individually</p>

          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {BLOCKS.map(({ name, blurb, price, Icon }) => (
              <li
                key={name}
                className="flex flex-col rounded-2xl border border-foreground/[0.08] bg-card p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-full bg-[var(--clay)]/10 text-[var(--plum)] ring-1 ring-[var(--clay)]/20">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg leading-tight font-normal">
                  {name}
                </h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-foreground/70">
                  {blurb}
                </p>
                <p className="mt-5 border-t border-foreground/[0.08] pt-4 text-[0.85rem] text-foreground/60">
                  Alone{" "}
                  <span className="ml-1 font-display text-[1.15rem] text-foreground">
                    €{price}
                  </span>
                </p>
              </li>
            ))}
          </ul>

          {/* Visual sum */}
          <div className="mt-8 flex flex-col items-end gap-1">
            <div className="flex items-center gap-3 text-foreground/55">
              <Plus className="size-4" aria-hidden />
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase">
                Individually
              </span>
              <span className="h-px w-8 bg-foreground/20" />
              <span className="font-display text-2xl leading-none text-foreground/85">
                €{SUM}
              </span>
            </div>
          </div>
        </div>

        {/* Complete package — featured */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-[var(--plum)] text-[var(--primary-foreground)] shadow-[0_40px_80px_-40px_rgba(60,40,52,0.5)] md:mt-16">
          <div className="grid grid-cols-1 gap-10 p-8 md:grid-cols-12 md:gap-12 md:p-14">
            <div className="md:col-span-6">
              <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/60">
                The complete path
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.1] font-normal text-balance text-[var(--primary-foreground)]">
                Body, plate, and soul —
                <br />
                worked on together.
              </h3>

              <div className="mt-8 flex items-baseline gap-4">
                <span className="font-display text-[3.25rem] leading-none font-normal text-[var(--primary-foreground)]">
                  €{COMPLETE_PRICE}
                </span>
                <span className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55 line-through decoration-[var(--primary-foreground)]/40">
                  €{SUM} individually
                </span>
              </div>
              <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-[var(--primary-foreground)]/75">
                Less than the sum. And more than the parts — because a few
                things only happen when all three threads are held at once.
              </p>
            </div>

            <div className="md:col-span-6">
              <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-[var(--primary-foreground)]/55">
                What&rsquo;s only in the complete path
              </p>
              <ul className="mt-4 space-y-3">
                {COMPLETE_INCLUDES.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-[0.98rem] leading-[1.55] text-[var(--primary-foreground)]/90"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-[var(--primary-foreground)]"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/50">
                Six weeks · 1:1
              </p>
            </div>
          </div>
        </div>

        {/* Entry packages */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-end justify-between gap-6 border-b border-foreground/[0.1] pb-4">
            <div>
              <p className="caption">Prefer to start smaller?</p>
              <h3 className="mt-2 font-display text-2xl leading-tight font-normal">
                Two entry points, no pressure to add more later.
              </h3>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {ENTRY_PACKAGES.map((pkg) => (
              <li
                key={pkg.name}
                className="flex items-start justify-between gap-6 rounded-2xl border border-foreground/[0.08] bg-card p-6"
              >
                <div>
                  <p className="caption">Entry</p>
                  <h4 className="mt-2 font-display text-xl leading-tight font-normal">
                    {pkg.name}
                  </h4>
                  <p className="mt-2 max-w-sm text-[0.92rem] leading-relaxed text-foreground/70">
                    {pkg.blurb}
                  </p>
                  <p className="caption mt-4">Six weeks · 1:1</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-display text-2xl leading-none font-normal">
                    €{pkg.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Single CTA */}
        <div className="mt-16 flex flex-col items-center gap-5 text-center md:mt-20">
          <p className="max-w-lg text-pretty text-foreground/72 sm:text-[1.05rem] sm:leading-[1.7]">
            Not sure which fits? That&rsquo;s exactly what the discovery
            call is for — a real conversation, no pressure either way.
          </p>
          <Button
            asChild
            size="lg"
            className="group/button h-12 bg-[var(--plum)] px-6 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
          >
            <Link href="#contact">
              Book a free discovery call
              <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
