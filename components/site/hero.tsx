import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackgroundVideo } from "./hero-background-video";
// STOCK PLACEHOLDER – replace with Kathy's own content before launch
import { TEMP_PHOTOS, TEMP_HERO_VIDEO } from "@/lib/temp-photos";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* STOCK PLACEHOLDER – replace with Kathy's own content before launch */}
      <HeroBackgroundVideo
        src={TEMP_HERO_VIDEO?.src}
        poster={TEMP_HERO_VIDEO?.poster ?? TEMP_PHOTOS.hero?.url}
        ariaLabel="Hero background — training and nature loop"
      />

      {/* Darkening for legibility. Two stacked gradients so the text side
          (bottom-left on desktop) stays readable while the top-right of
          the image can breathe. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--foreground)]/85 via-[var(--foreground)]/45 to-[var(--foreground)]/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--foreground)]/50 via-[var(--foreground)]/15 to-transparent"
      />

      <div className="relative container-page flex min-h-[680px] flex-col justify-end py-16 md:min-h-[800px] md:py-24">
        <div className="max-w-2xl">
          {/* Brand mark — prominent on the hero, echoes the header wordmark
              at display scale so the site identifies itself instantly. */}
          <div className="animate-rise mb-8 flex items-baseline gap-3.5 md:mb-10">
            <span className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-none text-[var(--primary-foreground)]">
              <span className="italic">K</span>athy
            </span>
            <span className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[var(--clay)] md:text-[0.78rem]">
              Coaching
            </span>
          </div>

          <p
            className="animate-rise font-mono text-[0.75rem] tracking-[0.2em] uppercase text-[var(--primary-foreground)]/80"
            style={{ animationDelay: "80ms" }}
          >
            Holistic coaching · faith-rooted
          </p>

          <h1
            className="animate-rise mt-5 font-display text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.02] font-normal text-[var(--primary-foreground)]"
            style={{ animationDelay: "160ms" }}
          >
            See your body the way{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="not-italic font-display italic">God created it.</em>
              <svg
                aria-hidden
                viewBox="0 0 420 32"
                className="absolute left-0 -bottom-3 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 22 C 70 8, 160 6, 230 14 S 380 26, 416 12"
                  fill="none"
                  stroke="var(--clay)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="underline-draw"
                />
              </svg>
            </span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-xl text-pretty text-base text-[var(--primary-foreground)]/85 sm:text-lg sm:leading-[1.65]"
            style={{ animationDelay: "240ms" }}
          >
            Personal training, nutrition guidance, and Christian mentoring —
            three threads woven into one path. Built with women in mind,
            openly for men too.
          </p>

          <div
            className="animate-rise mt-9"
            style={{ animationDelay: "340ms" }}
          >
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

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] text-[var(--primary-foreground)]/75"
            style={{ animationDelay: "440ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--clay)]" />
              Certified Personal Trainer
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--clay)]" />
              Certified Nutrition Coach
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
