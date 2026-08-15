import Image from "next/image";
import { useTranslations } from "next-intl";
import { Apple, Dumbbell, Heart } from "lucide-react";
import { DisplayTitle } from "./display-title";
import { cn } from "@/lib/utils";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

const PILLARS = [
  // onPhoto: the hollow half of the label lands on a photograph rather than
  // on a cream illustration, so its outline has to switch to white.
  // icon: the same three glyphs (dumbbell, apple, heart) that ring the
  // figure on Katey's own logo — one per thread, in the same order.
  { key: "train", image: TEMP_PHOTOS.approachTrain, onPhoto: true, icon: Dumbbell },
  { key: "nourish", image: TEMP_PHOTOS.approachNourish, onPhoto: false, icon: Apple },
  { key: "soul", image: TEMP_PHOTOS.approachSoul, onPhoto: false, icon: Heart },
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

        <ul className="mt-20 space-y-24 md:mt-28 md:space-y-40">
          {PILLARS.map(({ key, image, onPhoto, icon: Icon }, i) => (
            <li
              key={key}
              className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14"
            >
              {/* Straddles the photograph like the About title: the hollow
                  word lands on the image, the solid one on the cream. The
                  label sits on whichever side the image is, so the hollow
                  half is always the half over the picture. Off below md,
                  where the columns stack and there is no edge to cross. */}
              <h3
                className={cn(
                  "display-title pointer-events-none z-10 hidden md:absolute md:top-0 md:block",
                  i % 2 === 0 ? "md:right-0 md:text-right" : "md:left-0"
                )}
              >
                {i % 2 === 0 ? (
                  /* Image on the right: hollow word last, so the outline is
                     the half that lands on the picture. */
                  <>
                    {t(`${key}.label`).split(" ").slice(0, -1).join(" ")}{" "}
                    <span className={onPhoto ? "display-hollow-onphoto" : "display-hollow"}>
                      {t(`${key}.label`).split(" ").slice(-1)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className={onPhoto ? "display-hollow-onphoto" : "display-hollow"}>
                      {t(`${key}.label`).split(" ")[0]}
                    </span>{" "}
                    {t(`${key}.label`).split(" ").slice(1).join(" ")}
                  </>
                )}
              </h3>

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
                      className="object-cover"
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
