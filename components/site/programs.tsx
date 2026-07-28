import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ADDONS, BLOCKS, BUNDLES } from "@/lib/pricing";
import { ProgramsBuilder } from "./programs-builder";

export function Programs() {
  return (
    <section id="programs" className="section-pad">
      <div className="container-page">
        {/* Intro + commitment */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow">The programs</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
              Three parts. One path. You choose how much.
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
              Real change asks for real participation. I take on a small
              number of clients each month so I can be fully present for
              each one — this isn&rsquo;t a course you consume, it&rsquo;s a
              six-week walk we take together.
            </p>
          </div>
        </div>

        {/* Section A — ready-made bundles */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-end justify-between gap-6 border-b border-foreground/[0.1] pb-5">
            <div>
              <p className="caption">Ready-made</p>
              <h3 className="mt-2 font-display text-2xl leading-tight font-normal">
                Three bundles, quick to choose.
              </h3>
            </div>
            <p className="hidden max-w-xs text-right text-[0.85rem] text-foreground/60 sm:block">
              Prefer to skip the choosing? Pick one.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {BUNDLES.map((bundle) => {
              const includes = [
                ...bundle.blocks.map(
                  (id) => BLOCKS.find((b) => b.id === id)!.name
                ),
                ...bundle.addons.map(
                  (id) => `+ ${ADDONS.find((a) => a.id === id)!.name}`
                ),
              ];
              return (
                <li key={bundle.id} className="flex">
                  <div
                    className={cn(
                      "flex w-full flex-col rounded-2xl p-6 transition-[transform,box-shadow] duration-300 sm:p-7",
                      bundle.recommended
                        ? "bg-[var(--plum)] text-[var(--primary-foreground)] shadow-[0_30px_60px_-30px_rgba(60,40,52,0.5)]"
                        : "bg-card ring-1 ring-foreground/10 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(60,40,52,0.35)]"
                    )}
                  >
                    {bundle.recommended && (
                      <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[var(--primary-foreground)]/15 px-2.5 py-0.5 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-[var(--primary-foreground)]">
                        Most chosen
                      </span>
                    )}
                    <h4
                      className={cn(
                        "font-display text-xl leading-tight font-normal",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]"
                          : ""
                      )}
                    >
                      {bundle.name}
                    </h4>
                    <p
                      className={cn(
                        "mt-2 text-[0.92rem] leading-relaxed",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]/78"
                          : "text-foreground/65"
                      )}
                    >
                      {bundle.blurb}
                    </p>

                    <ul
                      className={cn(
                        "mt-5 space-y-2 text-[0.9rem]",
                        bundle.recommended
                          ? "text-[var(--primary-foreground)]/85"
                          : "text-foreground/72"
                      )}
                    >
                      {includes.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <Check
                            className={cn(
                              "mt-0.5 size-3.5 shrink-0",
                              bundle.recommended
                                ? "text-[var(--primary-foreground)]"
                                : "text-[var(--plum)]"
                            )}
                            aria-hidden
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    {(bundle.bestFor || bundle.format) && (
                      <div
                        className={cn(
                          "mt-6 space-y-1.5 text-[0.82rem] leading-relaxed",
                          bundle.recommended
                            ? "text-[var(--primary-foreground)]/65"
                            : "text-foreground/60"
                        )}
                      >
                        {bundle.bestFor && (
                          <p>
                            <span
                              className={cn(
                                "font-medium",
                                bundle.recommended
                                  ? "text-[var(--primary-foreground)]/85"
                                  : "text-foreground/78"
                              )}
                            >
                              Best for:
                            </span>{" "}
                            {bundle.bestFor}
                          </p>
                        )}
                        {bundle.format && <p>{bundle.format}</p>}
                      </div>
                    )}

                    <div
                      className={cn(
                        "mt-auto flex items-baseline gap-3 border-t pt-5",
                        bundle.recommended
                          ? "border-[var(--primary-foreground)]/15"
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
                        {bundle.duration}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "group/button mt-6 h-11 w-full",
                        bundle.recommended
                          ? "bg-[var(--primary-foreground)] text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
                          : "bg-[var(--plum)] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
                      )}
                    >
                      <Link href={`/kontakt?bundle=${bundle.id}`}>
                        Choose this bundle
                        <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section B — build your own */}
        <div className="mt-20 md:mt-28">
          <div className="max-w-3xl">
            <p className="caption">Or build your own</p>
            <h3 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-normal text-balance">
              Assemble the mix that fits your life.
            </h3>
            <p className="mt-5 text-pretty text-foreground/72 sm:text-[1.05rem] sm:leading-[1.7]">
              Pick any combination of blocks and extras — the price
              recalculates as you click. Two blocks together get a 5% bundle
              discount, three blocks unlock 10%. Add-ons stay solo-priced,
              which is why the Complete bundle above is the better deal when
              you want them all included.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <ProgramsBuilder />
          </div>
        </div>
      </div>
    </section>
  );
}
