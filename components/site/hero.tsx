import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TEMP_HERO_VIDEO, TEMP_PHOTOS } from "@/lib/temp-photos";
import { BackgroundAutoplayVideo } from "./background-autoplay-video";
import { TempPill } from "./placeholder";

/**
 * Full-bleed hero again, per Katarina's follow-up ("breitkant... wie
 * geplant") — she liked the split-card version's content (video starts on
 * the push-up, whole body visible) but wanted the wide background back.
 *
 * The vertical clip (720x1280) can't object-cover a wide band without
 * cropping her out of frame — that was the original problem. Fix here
 * instead of reverting to that crop: a blurred, scaled-up copy of the same
 * clip fills the full-bleed band edge-to-edge, and the real (sharp,
 * uncropped) video sits centred on top at its own aspect ratio, like a
 * video letterboxed on Instagram/YouTube. Full width, nobody cropped out.
 *
 * No eyebrow line — Katarina asked for "For women who want strength and
 * depth" to come off; the headline now carries the hero on its own.
 *
 * One CTA, not two: a single "choose a program" button that goes to the
 * Programs page, in the site's primary colour. The old second link ("see
 * how I work") and the credential badges are gone — the badges duplicated
 * what the Katey/about section already says about her qualifications, and
 * she asked for that to live in exactly one place.
 */
type HeroContent = { headline?: string; body?: string; ctaLabel?: string; ctaHref?: string };

function HeroCopy({ t, content }: { t: ReturnType<typeof useTranslations<"hero">>; content?: HeroContent }) {
  return (
    <>
      {/* Mobile-first pass (2026-08-18): the shared clamp(2.3rem,4vw,3.5rem)
          used 4vw as its scaling term, which stays tiny below md — so its
          2.3rem *floor* was what actually rendered at every mobile width,
          filling far more of the viewport than intended (~37px, reading as
          oversized against the compact new header). Fixed mobile sizes
          (2.6rem base / 2.75rem at sm, ~41.6-44px) replace it below md;
          the exact desktop clamp is restored unchanged at md+. */}
      <h1
        className="animate-rise font-display text-[2.4rem] leading-[1.08] font-normal sm:text-[2.7rem] md:text-[clamp(2.9rem,4.8vw,4.6rem)]"
        style={{ animationDelay: "80ms" }}
      >
        {content?.headline || t.rich("headline", {
          em: (chunks) => (
            <span className="relative inline-block whitespace-nowrap">
              <em className="not-italic font-display italic">{chunks}</em>
              <svg
                aria-hidden
                viewBox="0 0 420 32"
                className="absolute left-0 -bottom-2 h-[0.3em] w-full"
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
          ),
        })}
      </h1>

      {/* mt-8 -> mt-5 on mobile (md:mt-8 restores desktop exactly); base
          text size/line-height stepped down a touch for mobile too, sm+
          unchanged. */}
      <p
        className="animate-rise mt-4 max-w-md text-pretty text-[0.92rem] leading-[1.55] sm:text-lg sm:leading-[1.7] md:mt-8"
        style={{ animationDelay: "180ms" }}
      >
        {content?.body || t("body")}
      </p>

      {/* mt-10 -> mt-6 on mobile (md:mt-10 restores desktop). Button:
          h-12 (48px) was the same height at every breakpoint; mobile now
          gets h-14 (56px, within the client's 52-60px suggestion) and
          full width for a stronger tap target — sm+ reverts to the
          original h-12 auto-width button untouched. */}
      {/* CTA colour test (2026-08-19): --shoe-accent instead of --plum,
          on this one button only — a muted version of the coral shoes
          worn in the hero video/Programs photo. See the token's own
          comment in globals.css for the sampling/contrast reasoning.
          Every other --plum button on the site (Contact, Programs,
          approach, 404) is untouched. */}
      {/* 2026-08-19 mobile-refinement pass: mt-6 -> mt-8 on mobile only
          (md:mt-10 untouched) — a little more breathing room between the
          supporting text and the button, per client feedback. Color
          unchanged (--shoe-accent). */}
      <div className="animate-rise mt-8 md:mt-10" style={{ animationDelay: "280ms" }}>
        <Button
          asChild
          size="lg"
          className="group/button h-14 w-full bg-[var(--shoe-accent)] px-7 text-[0.95rem] text-[var(--primary-foreground)] ring-1 ring-[var(--primary-foreground)]/15 hover:bg-[var(--shoe-accent)]/90 sm:h-12 sm:w-auto"
        >
          <Link href={content?.ctaHref || "/programme"}>
            {content?.ctaLabel || t("cta")}
            <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </>
  );
}

export function Hero({ content }: { content?: HeroContent } = {}) {
  const t = useTranslations("hero");
  const photo = TEMP_PHOTOS.hero;
  const video = TEMP_HERO_VIDEO;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Desktop/tablet: genuine full-bleed, video object-cover like a
          normal wide hero band — per Katarina's explicit choice (asked
          directly: crop it wide rather than keep the blurred-pad/portrait
          look). Source is now a true 16:9 landscape clip (workout-hero.mp4),
          so a plain center crop keeps the whole movement in frame without
          the vertical-clip cropping bias the old phone-shot source needed. */}
      {/* Full-screen landing view now that Home is only this section —
          fills the viewport below the sticky header (h-16/h-20) so video +
          headline + nav is the entire first view, nothing else competing
          underneath. */}
      {/* Header height is intrinsic now (logo height + padding), not a fixed
          h-24 — it grew to fit the complete logo (was ~6rem, now ~10rem at
          md+ with the full KC + name + tagline lockup), so the offset here
          moved with it. */}
      <div className="relative hidden min-h-[calc(100svh-10rem)] items-center py-20 md:flex">
        {(video || photo) && (
          <div className="absolute inset-0 -z-10">
            {video ? (
              <BackgroundAutoplayVideo
                src={video.src}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              photo && (
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[22%_28%]"
                />
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--petrol-deep)]/92 via-[var(--petrol-deep)]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--petrol-deep)]/40 via-transparent to-transparent" />
            {!video && photo?.credit && <TempPill credit={photo.credit} slot="Hero" />}
          </div>
        )}

        <div className="container-page flex justify-end text-[var(--primary-foreground)]">
          <div className="w-full max-w-[46rem] lg:mr-[11vw] [&_p]:text-[var(--primary-foreground)]/80">
            <HeroCopy t={t} content={content} />
          </div>
        </div>
      </div>

      {/* Mobile (rebuilt 2026-08-18, second pass): now matches desktop's
          concept instead of stacking a separate video card below the copy —
          full-bleed video as an absolutely-positioned background, gradient
          scrim over it, HeroCopy on top in the light/cream text variant.
          The previous version put the video in normal flow *after* the
          text as its own rounded card; that read as a photo caption under
          an article rather than a hero, and pushed the CTA below the fold
          on short phones.

          min-h accounts for the actual mobile header: logo is 136px wide
          at a ~0.86 h/w ratio (~117px tall) inside a py-2.5 (20px) row
          plus its 1px hairline border, so 8.75rem (140px) subtracted from
          100svh clears the sticky header without leaving a dead gap
          (svh/dvh, not vh, so mobile browser chrome resizing doesn't
          leave a jump). */}
      <div className="relative flex min-h-[calc(100svh-8.75rem)] flex-col justify-center overflow-hidden py-16 md:hidden">
        {(video || photo) && (
          <div className="absolute inset-0 -z-10">
            {video ? (
              <BackgroundAutoplayVideo
                // Lighter mobile-specific re-encode (see lib/temp-photos.ts)
                // — falls back to the same file desktop uses if srcMobile
                // isn't set. Source is now a genuine portrait (9:16) clip,
                // not a landscape crop, so it needs barely any cropping
                // against a phone-shaped hero — plain object-center holds
                // her in frame through the whole movement.
                src={video.srcMobile ?? video.src}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              photo && (
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[22%_28%]"
                />
              )
            )}
            {/* Same gradient approach as desktop (from-[var(--petrol-deep)]
                via a mid stop to transparent, plus a top-down wash) but
                tuned lighter for mobile per the client's "light/warm/
                elegant, not too dark" note: opacities pulled down
                (92/50 -> 70/32, 40 -> 28) and the horizontal wash swapped
                for a bottom-up one, since the mobile card is a tall
                portrait band (copy sits low-center) rather than desktop's
                wide band (copy sits right). */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--petrol-deep)]/70 via-[var(--petrol-deep)]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--petrol-deep)]/28 via-transparent to-transparent" />
            {!video && photo?.credit && <TempPill credit={photo.credit} slot="Hero" />}
          </div>
        )}

        <div className="container-page text-[var(--primary-foreground)]">
          <div className="max-w-md [&_p]:text-[var(--primary-foreground)]/80">
            <HeroCopy t={t} content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}
