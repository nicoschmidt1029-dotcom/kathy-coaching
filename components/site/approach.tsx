import Image from "next/image";
import { useTranslations } from "next-intl";
import { Apple, ArrowRight, Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { DisplayTitle } from "./display-title";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

const PILLARS = [
  // icon: the same three glyphs (dumbbell, apple, heart) that ring the
  // figure on Katey's own logo — one per thread, in the same order.
  { key: "train", image: TEMP_PHOTOS.approachTrain, icon: Dumbbell, zoom: false, photo: true },
  { key: "nourish", image: TEMP_PHOTOS.approachNourish, icon: Apple, zoom: false, photo: true },
  { key: "soul", image: TEMP_PHOTOS.approachSoul, icon: Heart, zoom: false, photo: true },
] as const;

// Black and white, not the earlier warm-toned colour grade — Katarina's
// later direction: the site should run on primarily monochrome editorial
// photography rather than several full-colour photos competing on one
// page. Applied uniformly across all three threads so they still read as
// one consistent set, just in the site's other agreed style now.
const PHOTO_GRADE = "grayscale contrast-[1.05]";

/**
 * The three threads in full, as alternating bands.
 *
 * Same shape as the home teaser, deliberately — one method, one way of
 * showing it. The difference is the copy: the teaser runs the one-line
 * `teaser`, this runs `body`, so the detail page earns its place instead of
 * repeating the home page word for word.
 *
 * The image starts on the opposite side to the home page's first band, so
 * somebody arriving through "read the full approach" does not land on what
 * looks like the screen they just left.
 *
 * Each thread used to carry a second, oversized title that straddled the
 * photograph — the hollow half landing on the picture, following a
 * different design reference. Katarina asked for text to stay off photos
 * entirely and for headings generally to read as headings rather than
 * posters, so that title is gone; the caption + heading below the image now
 * carries the label on its own.
 */
export function Approach() {
  const t = useTranslations("approach");

  return (
    <section id="approach" className="section-pad relative overflow-hidden">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">{t("systemName")}</p>
          <DisplayTitle className="mt-6">{t("title")}</DisplayTitle>
          <p className="section-lede mt-8">{t("definition")}</p>
          <p className="mt-4 max-w-xl text-pretty text-foreground/65 sm:text-[1.05rem] sm:leading-[1.7]">
            {t("intro")}
          </p>
        </div>

        <ul className="mt-20 space-y-20 md:mt-24 md:space-y-28">
          {PILLARS.map(({ key, image, icon: Icon, zoom, photo }, i) => (
            <li
              key={key}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14"
            >
              {image && (
                <div
                  className={
                    i % 2 === 0 ? "md:order-2 md:col-span-6" : "md:col-span-6"
                  }
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className={cn(
                        "object-cover",
                        zoom && "scale-[2.3] object-[48%_54%]",
                        photo && PHOTO_GRADE
                      )}
                    />
                  </div>
                </div>
              )}

              <div
                className={
                  i % 2 === 0 ? "md:order-1 md:col-span-6" : "md:col-span-6"
                }
              >
                <span className="inline-flex items-center gap-2">
                  <Icon
                    aria-hidden
                    className="size-4 text-[var(--clay)]"
                    strokeWidth={1.75}
                  />
                  <span className="caption">
                    {t("threadLabel", { number: String(i + 1) })}
                  </span>
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight font-normal">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-4 max-w-md text-pretty text-foreground/68 sm:text-lg sm:leading-[1.7]">
                  {t(`${key}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Programs moved to its own page (Katarina's request); the
            one-pager needs its own way there instead of relying on the
            header nav alone. */}
        <div className="mt-16 flex justify-center md:mt-20">
          <Button asChild size="lg" className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90">
            <Link href="/programme">
              {t("viewProgramsCta")}
              <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
