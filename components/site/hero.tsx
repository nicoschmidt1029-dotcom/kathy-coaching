import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "./hero-video";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-20 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-[-15%] -z-10 hidden h-[640px] w-[640px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.03 145 / 0.7), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] -z-10 h-[460px] w-[460px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.92 0.022 78 / 0.7), transparent 70%)",
        }}
      />

      <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="eyebrow animate-rise">
            Holistic coaching · faith-rooted
          </p>

          <h1 className="animate-rise mt-5 font-display text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.02] font-normal text-foreground">
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
                  stroke="var(--sage)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="underline-draw"
                />
              </svg>
            </span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-xl text-pretty text-base text-foreground/72 sm:text-lg sm:leading-[1.65]"
            style={{ animationDelay: "120ms" }}
          >
            Personal training, nutrition guidance, and Christian mentoring —
            three threads woven into one path. Built with women in mind,
            openly for men too.
          </p>

          <div
            className="animate-rise mt-9"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              asChild
              size="lg"
              className="group/button h-12 bg-[var(--sage-deep)] px-6 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--sage-deep)]/90"
            >
              <Link href="#contact">
                Book a free discovery call
                <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] text-foreground/55"
            style={{ animationDelay: "340ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--sage)]" />
              Certified Personal Trainer
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--sage)]" />
              Certified Nutrition Coach
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--sage)]" />
              5+ yrs mentoring
            </span>
          </div>
        </div>

        <div className="animate-rise-slow md:col-span-5">
          <HeroVideo
            poster={TEMP_PHOTOS.hero?.url}
            posterCredit={TEMP_PHOTOS.hero?.credit}
          />
        </div>
      </div>
    </section>
  );
}
