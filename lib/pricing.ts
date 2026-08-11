/**
 * Central pricing config for the /programme page.
 *
 * Single source of truth for the *structure and numbers*:
 *   - Building blocks (Personal training, Nutrition, Spiritual mentoring)
 *   - Optional add-ons (WhatsApp, prayer, priority)
 *   - Bundle discount tiers
 *   - Ready-made fixed bundles
 *   - Live price + bundle-match calculators
 *
 * All *display copy* (names, blurbs, "best for", format lines) lives in
 * messages/*.json under the `pricing` namespace, keyed by the same ids used
 * here — so prices stay in one place and translations in another.
 *
 * Change prices, add extras, or tune discounts here — every consumer
 * (fixed-bundle cards, interactive builder, contact-form prefill) reads
 * from these exports.
 */

export type BlockId = "training" | "nutrition" | "spiritual";
export type AddonId = "whatsapp" | "prayer" | "priority";
export type BundleId = "training-only" | "training-nutrition" | "complete";

export type Block = { id: BlockId; price: number };
export type Addon = { id: AddonId; price: number };

export type Bundle = {
  id: BundleId;
  price: number;
  blocks: BlockId[];
  addons: AddonId[];
  recommended?: boolean;
  /** Whether messages carry a "best for" / "format" line for this bundle. */
  hasMeta?: boolean;
};

export const BLOCKS: Block[] = [
  { id: "training", price: 280 },
  { id: "nutrition", price: 180 },
  { id: "spiritual", price: 160 },
];

export const ADDONS: Addon[] = [
  { id: "whatsapp", price: 30 },
  { id: "prayer", price: 40 },
  { id: "priority", price: 25 },
];

/**
 * Discount tiers apply to the BLOCK subtotal only.
 * Add-ons always stay at solo price — that's what makes the fixed
 * Complete bundle attractive: it throws all three add-ons in at €0
 * versus €95 add-on cost in the builder.
 */
export const BUNDLE_DISCOUNTS: Record<number, number> = {
  1: 0,
  2: 0.05, // 5% off two-block combos
  3: 0.1, // 10% off — lands at €558, matches the Complete bundle at €560
};

export const BUNDLES: Bundle[] = [
  {
    id: "training-only",
    price: 280,
    blocks: ["training"],
    addons: [],
    hasMeta: true,
  },
  {
    id: "training-nutrition",
    price: 435,
    blocks: ["training", "nutrition"],
    addons: [],
    hasMeta: true,
  },
  {
    id: "complete",
    price: 560,
    blocks: ["training", "nutrition", "spiritual"],
    addons: ["whatsapp", "prayer", "priority"],
    recommended: true,
  },
];

export type PriceBreakdown = {
  blockSum: number;
  addonSum: number;
  blockDiscount: number;
  discountPercent: number;
  subtotal: number;
  total: number;
};

export function calculatePrice(
  blockIds: BlockId[],
  addonIds: AddonId[]
): PriceBreakdown {
  const blockSum = blockIds.reduce((acc, id) => {
    const b = BLOCKS.find((x) => x.id === id);
    return acc + (b?.price ?? 0);
  }, 0);
  const addonSum = addonIds.reduce((acc, id) => {
    const a = ADDONS.find((x) => x.id === id);
    return acc + (a?.price ?? 0);
  }, 0);
  const discountPercent = BUNDLE_DISCOUNTS[blockIds.length] ?? 0;
  const blockDiscount = Math.round(blockSum * discountPercent);
  return {
    blockSum,
    addonSum,
    blockDiscount,
    discountPercent,
    subtotal: blockSum + addonSum,
    total: blockSum + addonSum - blockDiscount,
  };
}

export function matchesBundle(
  blockIds: BlockId[],
  addonIds: AddonId[]
): Bundle | null {
  const b = [...blockIds].sort().join(",");
  const a = [...addonIds].sort().join(",");
  return (
    BUNDLES.find(
      (bundle) =>
        [...bundle.blocks].sort().join(",") === b &&
        [...bundle.addons].sort().join(",") === a
    ) ?? null
  );
}

/**
 * Resolves a `pricing.*` message key — pass `useTranslations("pricing")` or
 * `getTranslations("pricing")` so summaries come back in the visitor's
 * language.
 */
export type PricingTranslator = (key: string) => string;

/**
 * Build a human-readable summary from a selection. Used by the contact
 * form prefill to show the visitor (and Katey in the reply email) what
 * combination was assembled before booking.
 */
export function summarize(
  t: PricingTranslator,
  blockIds: BlockId[],
  addonIds: AddonId[],
  bundleId?: string
): string {
  if (bundleId) {
    const bundle = BUNDLES.find((b) => b.id === bundleId);
    if (bundle) {
      return `${t(`bundles.${bundle.id}.name`)} — €${bundle.price}, ${t("duration")}`;
    }
  }
  if (blockIds.length === 0 && addonIds.length === 0) return "";
  const blockNames = blockIds.map((id) => t(`blocks.${id}.name`));
  const addonNames = addonIds.map((id) => `+ ${t(`addons.${id}.name`)}`);
  const price = calculatePrice(blockIds, addonIds);
  const parts = [...blockNames, ...addonNames].join(" · ");
  return `${parts} — €${price.total}, ${t("duration")}`;
}
