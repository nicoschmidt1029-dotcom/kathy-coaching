"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Apple,
  ArrowRight,
  Check,
  Dumbbell,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ADDONS,
  BLOCKS,
  calculatePrice,
  matchesBundle,
  type AddonId,
  type BlockId,
} from "@/lib/pricing";

// Same lucide glyphs as the bundle cards on this page and the thread labels
// on Approach — replaces the commissioned scene drawings, which cropped
// awkwardly at these small sizes (see programs.tsx for the fuller note).
const BLOCK_ICON: Record<BlockId, typeof Dumbbell> = {
  training: Dumbbell,
  nutrition: Apple,
  spiritual: Heart,
};

const ADDON_ICON: Record<AddonId, typeof Dumbbell> = {
  whatsapp: MessageCircle,
  prayer: Sparkles,
  priority: Star,
};

export function ProgramsBuilder() {
  const t = useTranslations("builder");
  const p = useTranslations("pricing");

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
  }, [hasSelection, blocks.size, addons.size, blockIds, addonIds]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
      {/* Toggles */}
      <div className="md:col-span-7">
        <p className="caption">{t("blocksTitle")}</p>
        {/* grid-cols-1 explicit: a bare `grid` with no columns defined
            sizes its single implicit column to the max-content width of
            its widest child (here, the button's icon+gap+text row), which
            let the button grow past the viewport at 320px instead of
            filling it — found during the 2026-08-18 mobile pass. */}
        <ul className="mt-4 grid grid-cols-1 gap-3">
          {BLOCKS.map((block) => {
            const selected = blocks.has(block.id);
            const Icon = BLOCK_ICON[block.id];
            return (
              <li key={block.id}>
                <button
                  type="button"
                  onClick={() => toggleBlock(block.id)}
                  aria-pressed={selected}
                  className={cn(
                    "card-pad group flex w-full items-start gap-4 rounded-2xl border-2 bg-card text-left transition-[border-color,box-shadow,transform] duration-200",
                    selected
                      ? "border-[var(--plum)] shadow-[0_16px_36px_-20px_rgba(60,40,52,0.28)]"
                      : "border-foreground/[0.08] hover:border-foreground/25"
                  )}
                >
                  {/* A single glyph, not the commissioned scene drawing — same
                      icon used on the bundle cards above. Selection is shown
                      by a check badge over the corner. */}
                  <span
                    className={cn(
                      "relative mt-0.5 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl",
                      selected ? "bg-[var(--plum)]/10" : "bg-[var(--sand)]"
                    )}
                    aria-hidden
                  >
                    <Icon
                      className={cn(
                        "size-6",
                        selected ? "text-[var(--plum)]" : "text-[var(--clay)]"
                      )}
                      strokeWidth={1.5}
                    />
                    {selected && (
                      <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--primary-foreground)]">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                  </span>
                  {/* min-w-0: without it a flex child's default min-width:auto
                      keeps it from shrinking below its text's intrinsic
                      width, which pushed this button past the viewport at
                      320px (found during the 2026-08-18 mobile pass — the
                      icon + gap-4 + long German block names like
                      "Ernährungscoaching" needed more than the card had). */}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="card-title">
                        {p(`blocks.${block.id}.name`)}
                      </span>
                      <span className="caption whitespace-nowrap text-foreground/70">
                        €{block.price}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.92rem] leading-relaxed text-foreground/68">
                      {p(`blocks.${block.id}.blurb`)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="caption mt-10">{t("addonsTitle")}</p>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ADDONS.map((addon) => {
            const selected = addons.has(addon.id);
            const Icon = ADDON_ICON[addon.id];
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
                  {/* A single glyph above the name, not the commissioned
                      drawing — same idea as the block cards above. */}
                  <span
                    className={cn(
                      "mb-3 flex h-14 w-14 items-center justify-center rounded-lg",
                      selected ? "bg-[var(--plum)]/10" : "bg-[var(--sand)]"
                    )}
                    aria-hidden
                  >
                    <Icon
                      className={cn(
                        "size-5",
                        selected ? "text-[var(--plum)]" : "text-[var(--clay)]"
                      )}
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="flex w-full items-start justify-between gap-2">
                    <span className="font-display text-[1rem] leading-tight font-normal">
                      {p(`addons.${addon.id}.name`)}
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
                    {p(`addons.${addon.id}.blurb`)}
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
          <div className="card-pad rounded-2xl bg-[var(--plum)] text-[var(--primary-foreground)] shadow-[0_30px_60px_-30px_rgba(60,40,52,0.4)]">
            <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/65">
              {t("panelTitle")}
            </p>

            {!hasSelection ? (
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--primary-foreground)]/75">
                {t("empty")}
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
                        <span>{p(`blocks.${id}.name`)}</span>
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
                        <span>+ {p(`addons.${id}.name`)}</span>
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
                      {t("discount", {
                        percent: String(Math.round(price.discountPercent * 100)),
                      })}
                    </span>
                    <span className="font-mono text-[0.85rem]">
                      −€{price.blockDiscount}
                    </span>
                  </div>
                )}

                <div className="mt-6 flex items-baseline justify-between border-t border-[var(--primary-foreground)]/15 pt-6">
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/60">
                    {t("total")}
                  </span>
                  <span className="font-display text-[2.5rem] leading-none font-normal">
                    €{price.total}
                  </span>
                </div>

                {match && (
                  <p className="mt-5 rounded-lg bg-[var(--primary-foreground)]/10 px-4 py-3 text-[0.85rem] leading-relaxed text-[var(--primary-foreground)]/88">
                    {t.rich(
                      price.total > match.price ? "matchCheaper" : "matchBundle",
                      {
                        name: p(`bundles.${match.id}.name`),
                        difference: String(price.total - match.price),
                        price: String(match.price),
                        strong: (chunks) => (
                          <strong className="font-medium text-[var(--primary-foreground)]">
                            {chunks}
                          </strong>
                        ),
                      }
                    )}
                  </p>
                )}

                <Button
                  asChild
                  size="lg"
                  className="group/button mt-6 h-12 w-full bg-[var(--primary-foreground)] px-7 text-[0.95rem] text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
                >
                  <Link href={contactHref}>
                    {t("cta")}
                    <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                  </Link>
                </Button>

                <p className="mt-3 text-center text-[0.75rem] text-[var(--primary-foreground)]/55">
                  {t("carried")}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
