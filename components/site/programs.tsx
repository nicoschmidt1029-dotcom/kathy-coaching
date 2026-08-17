import Image from "next/image";
import { useTranslations } from "next-intl";
import { Apple, ArrowRight, Check, Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { BUNDLES, type BlockId } from "@/lib/pricing";
import { TEMP_PHOTOS } from "@/lib/temp-photos";
import { ProgramsBuilder } from "./programs-builder";
import { DisplayTitle } from "./display-title";

// Simple lucide glyphs, not the commissioned scene drawings (kettlebell+towel,
// plate+cutlery+orange, book+candle): those read fine full-size on the
// Approach page, but cropped into a small square card here they clip
// awkwardly and looked more like an unfinished AI sketch than a chosen
// design. A single centred icon on a flat chip reads as intentional at any
// size — same glyphs already used next to each thread label in Approach.
const BLOCK_ICON: Record<BlockId, typeof Dumbbell> = {
  training: Dumbbell,
  nutrition: Apple,
  spiritual: Heart,
};

export function Programs() {
  const t = useTranslations("programs");
  const p = useTranslations("pricing");
  const approach = useTranslations("approach");

  return (
    <section id="programme" className="section-pad">
      <div className="container-page">
        {/* Intro + commitment */}
        {/* Display type sets its own width; boxed in a six-column well it
            broke into five cramped lines. */}
        <p className="eyebrow">{t("eyebrow")}</p>
        <DisplayTitle className="mt-6 max-w-[15ch]">{t("title")}</DisplayTitle>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="section-lede mt-0 max-w-none">{t("intro")}</p>
            {/* Ties the three blocks back to the named method — see
                approach.systemName. */}
            <p className="mt-5 max-w-none text-[0.95rem] leading-relaxed text-foreground/78">
              {t("systemNote", { system: approach("systemName") })}
            </p>
          </div>

          {/* Katey's own photo beside the intro — same 17 Aug shoot as the
              Approach "Train" thread, same colour grade so the two pages
              feel like one shared set of assets rather than two shoots. */}
          {TEMP_PHOTOS.programsIntro && (
            <div className="md:col-span-5 md:-mt-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={TEMP_PHOTOS.programsIntro.url}
                  alt={TEMP_PHOTOS.programsIntro.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover object-[50%_20%] saturate-[0.85] sepia-[0.12] contrast-[1.03]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section A — ready-made bundles */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-end justify-between gap-6 border-b border-foreground/[0.1] pb-5">
            <div>
              <p className="caption">{t("readyMade")}</p>
              <h3 className="section-title-sm">{t("readyMadeTitle")}</h3>
            </div>
            <p className="hidden max-w-xs text-right text-[0.85rem] text-foreground/75 sm:block">
              {t("readyMadeAside")}
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {BUNDLES.map((bundle) => {
              const includes = [
                ...bundle.blocks.map((id) => p(`blocks.${id}.name`)),
                ...bundle.addons.map((id) => `+ ${p(`addons.${id}.name`)}`),
              ];
              return (
                <li key={bundle.id} className="flex">
                  <div
                    className={cn(
                      "card-pad flex w-full flex-col rounded-2xl transition-[transform,box-shadow] duration-300",
                      bundle.recommended
                        ? "bg-[var(--plum)] text-[var(--primary-foreground)] shadow-[0_30px_60px_-30px_rgba(60,40,52,0.5)]"
                        : "bg-card ring-1 ring-foreground/10 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(60,40,52,0.35)]"
                    )}
                  >
                    {bundle.recommended && (
                      <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[var(--primary-foreground)]/15 px-2.5 py-0.5 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-[var(--primary-foreground)]">
                        {t("mostChosen")}
                      </span>
                    )}
                    {/* Scope label above the name: tells you at a glance how
                        much of the method a bundle covers, and ties the cards
                        back to the three threads instead of reading as three
                        unrelated products. */}
                    <span
                      className={cn(
                        "caption",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]/60"
                          : ""
                      )}
                    >
                      {p(`bundles.${bundle.id}.scope`)}
                    </span>
                    <h4
                      className={cn(
                        "card-title mt-1.5 text-xl",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]"
                          : ""
                      )}
                    >
                      {p(`bundles.${bundle.id}.name`)}
                    </h4>
                    <p
                      className={cn(
                        "mt-2 text-[0.92rem] leading-relaxed",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]/78"
                          : "text-foreground/80"
                      )}
                    >
                      {p(`bundles.${bundle.id}.blurb`)}
                    </p>

                    <ul
                      className={cn(
                        "mt-5 space-y-2.5 text-[0.9rem]",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]/85"
                          : "text-foreground/85"
                      )}
                    >
                      {includes.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className={cn(
                              "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                              bundle.recommended
                                ? "bg-[var(--primary-foreground)]"
                                : "bg-[var(--clay)]"
                            )}
                          >
                            <Check
                              className={cn(
                                "size-2.5",
                                bundle.recommended
                                  ? "text-[var(--plum)]"
                                  : "text-[var(--primary-foreground)]"
                              )}
                              strokeWidth={3.5}
                            />
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    {bundle.hasMeta && (
                      <div
                        className={cn(
                          "mt-6 space-y-1.5 text-[0.82rem] leading-relaxed",
                          bundle.recommended
                            ? "text-[var(--primary-foreground)]/65"
                            : "text-foreground/72"
                        )}
                      >
                        <p>
                          <span
                            className={cn(
                              "font-medium",
                              bundle.recommended
                                ? "text-[var(--primary-foreground)]/85"
                                : "text-foreground/88"
                            )}
                          >
                            {t("bestFor")}
                          </span>{" "}
                          {p(`bundles.${bundle.id}.bestFor`)}
                        </p>
                        <p>{p(`bundles.${bundle.id}.format`)}</p>
                      </div>
                    )}

                    {/* One glyph per block the bundle contains, so a card
                        shows at a glance what is in it — same icon used next
                        to each thread label on the Approach page, so the two
                        pages read as one system. Covers the recommended card
                        too, which is why it gets all three (training +
                        nutrition + spiritual): "Der ganze Weg" is literally
                        all three blocks. */}
                    {bundle.blocks.length > 0 && (
                      <div className="my-7 flex flex-1 items-center justify-center gap-4">
                        {bundle.blocks.map((id) => {
                          const Icon = BLOCK_ICON[id];
                          return (
                            <div
                              key={id}
                              className={cn(
                                "flex aspect-square w-full max-w-[5rem] items-center justify-center rounded-xl",
                                bundle.recommended
                                  ? "bg-[var(--primary-foreground)]/12"
                                  : "bg-[var(--sand)]"
                              )}
                            >
                              <Icon
                                aria-hidden
                                className={cn(
                                  "size-6",
                                  bundle.recommended
                                    ? "text-[var(--primary-foreground)]"
                                    : "text-[var(--clay)]"
                                )}
                                strokeWidth={1.5}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div
                      className={cn(
                        "flex items-baseline gap-3 border-t pt-5",
                        bundle.recommended
                          ? "mt-auto border-[var(--primary-foreground)]/15"
                          : "border-foreground/10"
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-3xl font-normal",
                          bundle.recommended
                            ? "text-[var(--primary-foreground)]"
                            : ""
                        )}
                      >
                        €{bundle.price}
                      </span>
                      <span
                        className={cn(
                          "caption",
                          bundle.recommended
                            ? "text-[var(--primary-foreground)]/55"
                            : ""
                        )}
                      >
                        {p("duration")}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "group/button mt-6 h-12 w-full text-[0.95rem]",
                        bundle.recommended
                          ? "bg-[var(--primary-foreground)] text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
                          : "bg-[var(--plum)] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
                      )}
                    >
                      <Link href={`/kontakt?bundle=${bundle.id}`}>
                        {t("chooseBundle")}
                        <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section B — build your own. Programs has its own page now (was a
            one-pager section), so a calculator here is a destination, not a
            wall mid-scroll. */}
        <div className="mt-20 md:mt-28">
          <div className="max-w-3xl">
            <p className="caption">{t("buildOwn")}</p>
            <h3 className="section-title-sm">{t("buildOwnTitle")}</h3>
            <p className="section-lede max-w-none">{t("buildOwnIntro")}</p>
          </div>

          <div className="mt-10 md:mt-14">
            <ProgramsBuilder />
          </div>
        </div>
      </div>
    </section>
  );
}
