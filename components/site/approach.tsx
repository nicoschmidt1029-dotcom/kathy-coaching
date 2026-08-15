import Image from "next/image";
import { useTranslations } from "next-intl";
import { Apple, Dumbbell, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DisplayTitle } from "./display-title";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

const PILLARS = [
  // icon: the same three glyphs (dumbbell, apple, heart) that ring the
  // figure on Katey's own logo — one per thread, in the same order.
  //
  // zoom: block-training.png was drawn as a small chip icon for the pricing
  // cards — a kettlebell and towel centred in a lot of empty canvas. Nourish
  // and Soul are full table-top scenes that fill their frame edge to edge;
  // dropped in at the same crop, training would read as mostly blank space.
  // Scaling and re-centring it onto just the kettlebell/towel cluster gets
  // it to fill the frame the same way the other two do.
  { key: "train", image: TEMP_PHOTOS.approachTrain, icon: Dumbbell, zoom: true },
  { key: "nourish", image: TEMP_PHOTOS.approachNourish, icon: Apple, zoom: false },
  { key: "soul", image: TEMP_PHOTOS.approachSoul, icon: Heart, zoom: false },
] as const;

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
    <section id="approach" className="bg-[var(--petrol-tint)] section-pad relative overflow-hidden">
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
          {PILLARS.map(({ key, image, icon: Icon, zoom }, i) => (
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
                        zoom && "scale-[2.3] object-[48%_54%]"
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
      </div>
    </section>
  );
}
