import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TEMP_HERO_VIDEO, TEMP_PHOTOS } from "@/lib/temp-photos";
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
function HeroCopy({ t }: { t: ReturnType<typeof useTranslations<"hero">> }) {
  return (
    <>
      <h1
        className="animate-rise font-display text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.06] font-normal"
        style={{ animationDelay: "80ms" }}
      >
        {t.rich("headline", {
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

      <p
        className="animate-rise mt-8 max-w-md text-pretty sm:text-lg sm:leading-[1.7]"
        style={{ animationDelay: "180ms" }}
      >
        {t("body")}
      </p>

      <div className="animate-rise mt-10" style={{ animationDelay: "280ms" }}>
        <Button
          asChild
          size="lg"
          className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] ring-1 ring-[var(--primary-foreground)]/15 hover:bg-[var(--plum)]/90"
        >
          <Link href="/programme">
            {t("cta")}
            <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </>
  );
}

export function Hero() {
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
              <video
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
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
          <div className="max-w-xl [&_p]:text-[var(--primary-foreground)]/80">
            <HeroCopy t={t} />
          </div>
        </div>
      </div>

      {/* Mobile: stacked instead of overlaid — a full-width video/photo card
          above plain text on the ivory background, so nothing has to share
          space with the headline. */}
      <div className="section-pad flex flex-col gap-8 md:hidden">
        <div className="container-page text-foreground [&_p]:text-foreground/70">
          <HeroCopy t={t} />
        </div>
        {(video || photo) && (
          <div className="container-page">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(60,40,52,0.35)]">
              {video ? (
                <video
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                photo && (
                  <>
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    {photo.credit && <TempPill credit={photo.credit} slot="Hero" />}
                  </>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
