import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DisplayTitle } from "./display-title";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

const THREADS = [
  { key: "train", image: TEMP_PHOTOS.approachTrain },
  { key: "nourish", image: TEMP_PHOTOS.approachNourish },
  { key: "soul", image: TEMP_PHOTOS.approachSoul },
] as const;

/**
 * The three threads, as alternating bands rather than a card grid.
 *
 * The grid version put three small boxes side by side with a lucide glyph in
 * each — the same three threads that are illustrated on /about and
 * /programme, drawn here as generic icons. It was also the reason the home
 * page ran 3700px with a single image on it.
 *
 * Bands read slower and give each thread a picture at a size worth looking
 * at. Odd rows put the image left, even rows right, which is the one bit of
 * rhythm a page of full-width sections needs.
 */
export function ApproachTeaser() {
  const t = useTranslations("approach");

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">{t("systemName")}</p>
          <DisplayTitle className="mt-6">{t("title")}</DisplayTitle>
          <p className="section-lede mt-8">{t("definition")}</p>
        </div>

        <ul className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {THREADS.map(({ key, image }, i) => (
            <li
              key={key}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14"
            >
              {image && (
                <div
                  className={
                    i % 2 === 1
                      ? "md:order-2 md:col-span-6"
                      : "md:col-span-6"
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

              <div className={i % 2 === 1 ? "md:order-1 md:col-span-6" : "md:col-span-6"}>
                <span className="caption">
                  {t("threadLabel", { number: String(i + 1) })}
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight font-normal">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-4 max-w-md text-pretty text-foreground/68 sm:text-lg sm:leading-[1.7]">
                  {t(`${key}.teaser`)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-[0.95rem] text-[var(--plum)] transition-colors hover:text-foreground"
          >
            {t("readMore")}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
