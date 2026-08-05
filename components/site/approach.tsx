import Image from "next/image";
import { useTranslations } from "next-intl";
import { Dumbbell, Salad, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// STOCK PLACEHOLDER – replace with Katie's own content before launch
import { TEMP_PHOTOS, type TempPhoto } from "@/lib/temp-photos";

type PillarKey = "train" | "nourish" | "soul";

type Pillar = {
  key: PillarKey;
  Icon: LucideIcon;
  image: TempPhoto;
};

const PILLARS: Pillar[] = [
  // STOCK PLACEHOLDER – replace with Katie's own content before launch
  { key: "train", Icon: Dumbbell, image: TEMP_PHOTOS.approachTrain },
  { key: "nourish", Icon: Salad, image: TEMP_PHOTOS.approachNourish },
  { key: "soul", Icon: Heart, image: TEMP_PHOTOS.approachSoul },
];

export function Approach() {
  const t = useTranslations("approach");

  return (
    <section
      id="approach"
      className="section-pad relative overflow-hidden bg-[var(--sand)]/40"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          {/* Same name as on home and /programme — see approach.systemName. */}
          <p className="eyebrow">{t("systemName")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-lede">{t("definition")}</p>
          <p className="mt-4 max-w-xl text-pretty text-foreground/72 sm:text-[1.05rem] sm:leading-[1.7]">
            {t("intro")}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-3 md:gap-8">
          {PILLARS.map(({ key, Icon, image }, i) => (
            <li key={key} className="flex flex-col">
              {/* Every thread card uses the same 4:3 frame, image or not. */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {image ? (
                  <>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    {image.credit && (
                      <div className="pointer-events-none absolute right-2 top-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
                        <span className="rounded-sm bg-white/20 px-1 py-px text-[0.55rem] tracking-widest">
                          TEMP
                        </span>
                        <span className="truncate">
                          {t(`${key}.slot`)} · {image.credit}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--sand)] to-[var(--sand)]/50">
                    <Icon
                      className="size-16 text-[var(--plum)]/40"
                      strokeWidth={1.4}
                      aria-hidden
                    />
                  </div>
                )}
              </div>

              {/* Overlapping text card, offset upward into the image */}
              <div
                className={cn(
                  "card-surface card-pad relative z-10 mx-3 -mt-14",
                  "shadow-[0_24px_50px_-24px_rgba(60,40,52,0.22)] md:mx-5 md:-mt-16"
                )}
              >
                <span className="caption">
                  {t("threadLabel", { number: String(i + 1) })}
                </span>
                <h3 className="card-title mt-2 text-xl">{t(`${key}.title`)}</h3>
                <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-foreground/72">
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
