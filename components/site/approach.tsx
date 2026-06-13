import { Dumbbell, Salad, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Pillar = {
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Train the body",
    body: "Strength work that meets you where you are. Progressive, sustainable, and built around the life you actually live — not someone else's.",
    Icon: Dumbbell,
  },
  {
    number: "02",
    title: "Nourish with intention",
    body: "A relationship with food that isn't about rules or guilt. Real meals, real flexibility, real understanding of what your body needs to thrive.",
    Icon: Salad,
  },
  {
    number: "03",
    title: "Soul & identity in Jesus",
    body: "Offered, never imposed: honest conversation, prayer, and biblical perspective on worth. For anyone wanting confidence rooted in something deeper than a mirror.",
    Icon: Heart,
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="section-pad relative overflow-hidden bg-[var(--sand)]/40"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow">The approach</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
              Three threads.
              <br />
              One whole person.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
              Training without nutrition is incomplete. Nutrition without rest
              of soul is exhausting. We work all three — gently, deliberately.
            </p>
          </div>

          <div className="md:col-span-7">
            <ul className="grid gap-4 sm:gap-5">
              {PILLARS.map(({ number, title, body, Icon }) => (
                <li
                  key={number}
                  className="group relative grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-foreground/[0.06] bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--sage)]/30 hover:shadow-[0_20px_40px_-28px_rgba(60,80,60,0.4)] sm:p-7"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--sage)]/10 text-[var(--sage-deep)] ring-1 ring-[var(--sage)]/20 transition-colors group-hover:bg-[var(--sage)]/15">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.7rem] tracking-[0.18em] text-foreground/45">
                        {number}
                      </span>
                      <h3 className="font-display text-xl leading-tight font-normal">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-foreground/72">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
