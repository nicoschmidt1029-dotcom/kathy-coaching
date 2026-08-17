import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TEMP_HERO_VIDEO, TEMP_PHOTOS } from "@/lib/temp-photos";
import { TempPill } from "./placeholder";

/**
 * Split hero: text on one side, a full portrait video/photo card on the
 * other — replaces an earlier full-bleed version.
 *
 * The full-bleed approach (photo/video as the whole background, text laid
 * over a scrim) worked for the wide blazer portrait it was built for, but
 * broke once the source became a vertical phone clip (pike push-up into a
 * mobility flow): object-cover on a 9:16 clip stretched across a wide band
 * crops hands and feet at most viewport widths — Katarina's own complaint
 * ("man sieht die Person nur halb"). A card keeps the clip closer to its
 * native aspect, so the crop stays modest top/bottom instead of amputating
 * limbs left/right.
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
export function Hero() {
  const t = useTranslations("hero");
  const photo = TEMP_PHOTOS.hero;
  const video = TEMP_HERO_VIDEO;

  return (
    <section className="section-pad">
      <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6 lg:col-span-5">
          <h1
            className="animate-rise font-display text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.06] font-normal text-foreground"
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
            className="animate-rise mt-8 max-w-md text-pretty text-foreground/70 sm:text-lg sm:leading-[1.7]"
            style={{ animationDelay: "180ms" }}
          >
            {t("body")}
          </p>

          <div
            className="animate-rise mt-10"
            style={{ animationDelay: "280ms" }}
          >
            <Button
              asChild
              size="lg"
              className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
            >
              <Link href="/programme">
                {t("cta")}
                <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {(video || photo) && (
          <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
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
                      priority
                      sizes="(max-width: 768px) 100vw, 45vw"
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
