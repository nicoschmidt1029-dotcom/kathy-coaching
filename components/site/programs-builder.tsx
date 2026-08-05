"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Dumbbell, Salad, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ADDONS,
  BLOCKS,
  calculatePrice,
  matchesBundle,
  type AddonId,
  type BlockId,
} from "@/lib/pricing";

const BLOCK_ICON = {
  training: Dumbbell,
  nutrition: Salad,
  spiritual: Heart,
} as const;

export function ProgramsBuilder() {
  const [blocks, setBlocks] = React.useState<Set<BlockId>>(new Set());
  const [addons, setAddons] = React.useState<Set<AddonId>>(new Set());

  const blockIds = React.useMemo(() => Array.from(blocks), [blocks]);
  const addonIds = React.useMemo(() => Array.from(addons), [addons]);
  const price = React.useMemo(
    () => calculatePrice(blockIds, addonIds),
    [blockIds, addonIds]
  );
  const match = React.useMemo(
    () => matchesBundle(blockIds, addonIds),
    [blockIds, addonIds]
  );

  const toggleBlock = (id: BlockId) => {
    setBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAddon = (id: AddonId) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasSelection = blocks.size > 0 || addons.size > 0;

  const contactHref = React.useMemo(() => {
    if (!hasSelection) return "/kontakt";
    const params = new URLSearchParams();
    if (blocks.size > 0) params.set("blocks", blockIds.join(","));
    if (addons.size > 0) params.set("addons", addonIds.join(","));
    return `/kontakt?${params.toString()}`;
  }, [hasSelection, blockIds, addonIds]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
      {/* Toggles */}
      <div className="md:col-span-7">
        <p className="caption">Building blocks</p>
        <ul className="mt-4 grid gap-3">
          {BLOCKS.map((block) => {
            const Icon = BLOCK_ICON[block.id];
            const selected = blocks.has(block.id);
            return (
              <li key={block.id}>
                <button
                  type="button"
                  onClick={() => toggleBlock(block.id)}
                  aria-pressed={selected}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-2xl border-2 bg-card p-5 text-left transition-[border-color,box-shadow,transform] duration-200",
                    selected
                      ? "border-[var(--plum)] shadow-[0_16px_36px_-20px_rgba(60,40,52,0.28)]"
                      : "border-foreground/[0.08] hover:border-foreground/25"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-200",
                      selected
                        ? "bg-[var(--plum)] text-[var(--primary-foreground)] ring-[var(--plum)]"
                        : "bg-[var(--clay)]/10 text-[var(--plum)] ring-[var(--clay)]/25"
                    )}
                    aria-hidden
                  >
                    {selected ? (
                      <Check className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg leading-tight font-normal">
                        {block.name}
                      </span>
                      <span className="caption whitespace-nowrap text-foreground/70">
                        €{block.price}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.92rem] leading-relaxed text-foreground/68">
                      {block.blurb}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="caption mt-10">Optional extras</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {ADDONS.map((addon) => {
            const selected = addons.has(addon.id);
            return (
              <li key={addon.id}>
                <button
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  aria-pressed={selected}
                  className={cn(
                    "flex h-full w-full flex-col items-start rounded-xl border p-4 text-left transition-[border-color,background-color] duration-200",
                    selected
                      ? "border-[var(--plum)] bg-[var(--plum)]/[0.04]"
                      : "border-foreground/[0.08] hover:border-foreground/25"
                  )}
                >
                  <span className="flex w-full items-start justify-between gap-2">
                    <span className="font-display text-[1rem] leading-tight font-normal">
                      {addon.name}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition",
                        selected
                          ? "border-[var(--plum)] bg-[var(--plum)] text-[var(--primary-foreground)]"
                          : "border-foreground/30"
                      )}
                      aria-hidden
                    >
                      {selected && <Check className="size-3" />}
                    </span>
                  </span>
                  <span className="mt-2 text-[0.85rem] leading-relaxed text-foreground/62">
                    {addon.blurb}
                  </span>
                  <span className="caption mt-3">€{addon.price}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Live price panel */}
      <div className="md:col-span-5">
        <div className="md:sticky md:top-24">
          <div className="rounded-2xl bg-[var(--plum)] p-6 text-[var(--primary-foreground)] shadow-[0_30px_60px_-30px_rgba(60,40,52,0.4)] sm:p-8">
            <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/65">
              Your setup
            </p>

            {!hasSelection ? (
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--primary-foreground)]/75">
                Pick one or more building blocks. Prices tally live — and a
                bundle discount kicks in from two blocks onward.
              </p>
            ) : (
              <>
                <ul className="mt-5 space-y-2">
                  {blockIds.map((id) => {
                    const b = BLOCKS.find((x) => x.id === id)!;
                    return (
                      <li
                        key={id}
                        className="flex items-baseline justify-between gap-3 text-[0.95rem] text-[var(--primary-foreground)]/88"
                      >
                        <span>{b.name}</span>
                        <span className="font-mono text-[0.85rem] text-[var(--primary-foreground)]/72">
                          €{b.price}
                        </span>
                      </li>
                    );
                  })}
                  {addonIds.map((id) => {
                    const a = ADDONS.find((x) => x.id === id)!;
                    return (
                      <li
                        key={id}
                        className="flex items-baseline justify-between gap-3 text-[0.9rem] text-[var(--primary-foreground)]/72"
                      >
                        <span>+ {a.name}</span>
                        <span className="font-mono text-[0.8rem] text-[var(--primary-foreground)]/60">
                          €{a.price}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {price.blockDiscount > 0 && (
                  <div className="mt-4 flex items-baseline justify-between border-t border-[var(--primary-foreground)]/15 pt-4 text-[0.9rem] text-[var(--clay)]">
                    <span>
                      Bundle discount ({Math.round(price.discountPercent * 100)}%
                      on blocks)
                    </span>
                    <span className="font-mono text-[0.85rem]">
                      −€{price.blockDiscount}
                    </span>
                  </div>
                )}

                <div className="mt-6 flex items-baseline justify-between border-t border-[var(--primary-foreground)]/15 pt-6">
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/60">
                    Total · 6 weeks
                  </span>
                  <span className="font-display text-[2.5rem] leading-none font-normal">
                    €{price.total}
                  </span>
                </div>

                {match && (
                  <p className="mt-5 rounded-lg bg-[var(--primary-foreground)]/10 px-4 py-3 text-[0.85rem] leading-relaxed text-[var(--primary-foreground)]/88">
                    That matches the{" "}
                    <strong className="font-medium text-[var(--primary-foreground)]">
                      {match.name}
                    </strong>{" "}
                    bundle above
                    {match.price !== price.total && price.total > match.price
                      ? ` — the bundle is €${price.total - match.price} cheaper (€${match.price}).`
                      : "."}
                  </p>
                )}

                <Button
                  asChild
                  size="lg"
                  className="group/button mt-6 h-12 w-full bg-[var(--primary-foreground)] px-6 text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
                >
                  <Link href={contactHref}>
                    Start a conversation
                    <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                  </Link>
                </Button>

                <p className="mt-3 text-center text-[0.75rem] text-[var(--primary-foreground)]/55">
                  Your selection is carried into the form
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
