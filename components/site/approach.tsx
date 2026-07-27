import Image from "next/image";
import { Dumbbell, Salad, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
// STOCK PLACEHOLDER – replace with Katarina's own content before launch
import { TEMP_PHOTOS } from "@/lib/temp-photos";

type Pillar = {
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  image?: { url: string; alt: string; credit: string; slot: string };
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
    // STOCK PLACEHOLDER – replace with Katarina's own content before launch
    image: TEMP_PHOTOS.approachNourish
      ? {
          url: TEMP_PHOTOS.approachNourish.url,
          alt: TEMP_PHOTOS.approachNourish.alt,
          credit: TEMP_PHOTOS.approachNourish.credit,
          slot: "Nourish",
        }
      : undefined,
  },
  {
    number: "03",
    title: "Soul & identity in Jesus",
    body: "Offered, never imposed: honest conversation, prayer, and biblical perspective on worth. For anyone wanting confidence rooted in something deeper than a mirror.",
    Icon: Heart,
    // STOCK PLACEHOLDER – replace with Katarina's own content before launch
    image: TEMP_PHOTOS.approachSoul
      ? {
          url: TEMP_PHOTOS.approachSoul.url,
          alt: TEMP_PHOTOS.approachSoul.alt,
          credit: TEMP_PHOTOS.approachSoul.credit,
          slot: "Soul",
        }
      : undefined,
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
              {PILLARS.map(({ number, title, body, Icon, image }) => (
                <li
                  key={number}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/[0.06] bg-card transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--sage)]/30 hover:shadow-[0_20px_40px_-28px_rgba(60,80,60,0.4)]"
                >
                  {image && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute right-2 bottom-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
                        <span className="rounded-sm bg-white/20 px-1 py-px text-[0.55rem] tracking-widest">
                          TEMP
                        </span>
                        <span className="truncate">
                          {image.slot} · {image.credit}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-[auto_1fr] gap-5 p-6 sm:p-7">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--sage)]/10 text-[var(--sage-deep)] ring-1 ring-[var(--sage)]/20 transition-colors group-hover:bg-[var(--sage)]/15">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="caption">{number}</span>
                        <h3 className="font-display text-xl leading-tight font-normal">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-foreground/72">
                        {body}
                      </p>
                    </div>
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
