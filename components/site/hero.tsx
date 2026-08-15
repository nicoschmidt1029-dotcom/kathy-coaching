import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TEMP_PHOTOS } from "@/lib/temp-photos";
import { TempPill } from "./placeholder";

/**
 * Full-bleed photo hero, text laid over it — Katarina's own instruction
 * ("nice photo as a background"). An earlier version of this hero tried the
 * same thing and moved away from it because two gradient scrims were needed
 * to keep the type legible; the fix here is one scrim, not two: a single
 * left-to-right gradient in --petrol-deep (the site's own dark ground
 * colour, not plain black) so the text sits on a "surface" that belongs to
 * the palette, and the photo stays clear on the right where nothing needs
 * to be read.
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
    <section className="relative isolate flex min-h-[34rem] items-center overflow-hidden py-20 md:min-h-[42rem] md:py-28 lg:min-h-[46rem]">
      {photo && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[32%_42%]"
          />
          {/* One scrim, not two: dark on the left where the type sits, clear
              on the right where the photo needs to stay a photo. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--petrol-deep)]/92 via-[var(--petrol-deep)]/55 to-[var(--petrol-deep)]/10" />
          {/* A second, much lighter pass bottom-to-top keeps the CTA button
              and credential dots legible even where the horizontal scrim
              alone would be thin. */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--petrol-deep)]/45 via-transparent to-transparent" />
          {photo.credit && <TempPill credit={photo.credit} slot="Hero" />}
        </div>
      )}

      <div className="container-page text-[var(--primary-foreground)]">
        <div className="max-w-xl">
          <p
            className="animate-rise eyebrow text-[var(--primary-foreground)]/65"
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
            className="animate-rise mt-8 max-w-md text-pretty text-[var(--primary-foreground)]/80 sm:text-lg sm:leading-[1.7]"
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
      </div>
    </section>
  );
}
