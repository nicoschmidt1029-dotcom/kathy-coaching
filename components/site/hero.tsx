import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TEMP_PHOTOS } from "@/lib/temp-photos";
import { TempPill } from "./placeholder";

/**
 * Split hero on the site's own cream, photo on the right.
 *
 * It used to be text laid over a darkened full-bleed photo. That reads moody,
 * but two gradient scrims are needed to keep the type legible, and everything
 * ends up sitting in a grey haze. On a light ground the type is simply black
 * on cream, the photo is unmuddied, and the page reads as considered rather
 * than atmospheric — which is what "expensive" actually means here.
 *
 * The ground is petrol-deep — a deep bronze-gold now, matching Katey's own
 * brand board (gold, mustard, beige, white). Cream was chosen to get away
 * from the grey haze of the old scrim-over-photo hero, and that reasoning
 * still holds — but a light hero on a light page meant the site opened with
 * no colour at all. Dark ground, unmuddied photo beside it, type simply
 * cream on bronze: the contrast comes from the layout, not from a gradient
 * laid over a picture.
 *
 * The mustard accent stays mustard here — it is the one accent with enough
 * warmth to carry on a dark bronze ground.
 *
 * The eyebrow names the reader, not the coach. "Holistic coaching ·
 * faith-rooted" described Katey; a visitor deciding in two seconds needs to
 * know whether this is for them.
 *
 * One CTA, not two: a single "choose a program" button that scrolls to
 * /#programme, in the site's dark-petrol-blue primary colour (Katarina's
 * request). The old second link ("see how I work") and the credential
 * badges are gone — the badges duplicated what the Katey/about section
 * already says about her qualifications, and she asked for that to live
 * in exactly one place.
 */
export function Hero() {
  const t = useTranslations("hero");
  const photo = TEMP_PHOTOS.hero;

  return (
    <section className="relative overflow-hidden bg-[var(--petrol-deep)] text-[var(--primary-foreground)]">
      <div className="container-page grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:gap-14 md:py-24 lg:gap-20">
        <div className="md:col-span-6">
          <p
            className="animate-rise eyebrow text-[var(--primary-foreground)]/60"
            style={{ animationDelay: "80ms" }}
          >
            {t("eyebrow")}
          </p>

          <h1
            /* Capped lower than a full-bleed hero would allow: the emphasised
               fragment carries the underline and must not wrap, so it has to
               fit the text column in the longest language, not just English. */
            className="animate-rise mt-6 font-display text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.06] font-normal"
            style={{ animationDelay: "160ms" }}
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
            className="animate-rise mt-8 max-w-md text-pretty text-[var(--primary-foreground)]/75 sm:text-lg sm:leading-[1.7]"
            style={{ animationDelay: "240ms" }}
          >
            {t("body")}
          </p>

          <div
            className="animate-rise mt-10"
            style={{ animationDelay: "340ms" }}
          >
            <Button
              asChild
              size="lg"
              className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] ring-1 ring-[var(--primary-foreground)]/15 hover:bg-[var(--plum)]/90"
            >
              <Link href="/#programme">
                {t("cta")}
                <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {photo && (
          <div className="animate-rise-slow md:col-span-6">
            <div className="relative aspect-[4/5] min-h-[26rem] overflow-hidden rounded-2xl md:min-h-[34rem] lg:min-h-[40rem]">
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[28%_50%]"
              />
              {photo.credit && (
                <TempPill credit={photo.credit} slot="Hero" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
