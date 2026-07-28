import Image from "next/image";
import { Dumbbell, Salad, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// STOCK PLACEHOLDER – replace with Kathy's own content before launch
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
    // STOCK PLACEHOLDER – replace with Kathy's own content before launch
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
    // STOCK PLACEHOLDER – replace with Kathy's own content before launch
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
        <div className="max-w-2xl">
          <p className="eyebrow">The approach</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            Three threads. One whole person.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
            Training without nutrition is incomplete. Nutrition without rest
            of soul is exhausting. We work all three — gently, deliberately.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-3 md:gap-8">
          {PILLARS.map(({ number, title, body, Icon, image }) => (
            <li key={number} className="flex flex-col">
              {/* Top: image (Nourish / Soul) or tinted panel with icon (Train) */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {image ? (
                  <>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute right-2 top-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
                      <span className="rounded-sm bg-white/20 px-1 py-px text-[0.55rem] tracking-widest">
                        TEMP
                      </span>
                      <span className="truncate">
                        {image.slot} · {image.credit}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--sand)] to-[var(--sand)]/50">
                    <Icon
                      className="size-16 text-[var(--plum)]/40"
                      strokeWidth={1.4}
                      aria-hidden
                    />
                  </div>
                )}
              </div>

              {/* Overlapping text card, offset upward into the image */}
              <div
                className={cn(
                  "relative z-10 mx-3 -mt-14 rounded-2xl bg-card p-6 ring-1 ring-foreground/[0.08]",
                  "shadow-[0_24px_50px_-24px_rgba(60,40,52,0.22)] md:mx-5 md:-mt-16 md:p-7"
                )}
              >
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
