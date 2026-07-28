/**
 * Central pricing config for the /programme page.
 *
 * Single source of truth for:
 *   - Building blocks (Personal training, Nutrition, Spiritual mentoring)
 *   - Optional add-ons (WhatsApp, prayer, priority)
 *   - Bundle discount tiers
 *   - Ready-made fixed bundles
 *   - Live price + bundle-match calculators
 *
 * Change prices, add extras, or tune discounts here — every consumer
 * (fixed-bundle cards, interactive builder, contact-form prefill) reads
 * from these exports.
 */

export type BlockId = "training" | "nutrition" | "spiritual";
export type AddonId = "whatsapp" | "prayer" | "priority";

export type Block = {
  id: BlockId;
  name: string;
  blurb: string;
  price: number;
};

export type Addon = {
  id: AddonId;
  name: string;
  blurb: string;
  price: number;
};

export type Bundle = {
  id: "training-only" | "training-nutrition" | "complete";
  name: string;
  blurb: string;
  price: number;
  duration: string;
  blocks: BlockId[];
  addons: AddonId[];
  recommended?: boolean;
  /** Optional short "who this suits" line shown under the checklist */
  bestFor?: string;
  /** Optional format detail (session cadence, what's included) */
  format?: string;
};

export const BLOCKS: Block[] = [
  {
    id: "training",
    name: "Personal training",
    blurb:
      "Programming, technique, accountability. Weekly sessions, adjusted to your life.",
    price: 280,
  },
  {
    id: "nutrition",
    name: "Nutrition coaching",
    blurb:
      "A plan you can actually live with. Real food, real flexibility, no fear.",
    price: 180,
  },
  {
    id: "spiritual",
    name: "Spiritual mentoring",
    blurb:
      "Honest conversation, prayer, and biblical perspective on worth.",
    price: 160,
  },
];

export const ADDONS: Addon[] = [
  {
    id: "whatsapp",
    name: "Direct WhatsApp check-ins",
    blurb: "Between-session support when you need it.",
    price: 30,
  },
  {
    id: "prayer",
    name: "Weekly prayer & scripture",
    blurb: "A short prayer moment woven into the week.",
    price: 40,
  },
  {
    id: "priority",
    name: "Priority on new spots",
    blurb: "First in line when a new client month opens.",
    price: 25,
  },
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
    name: "Training only",
    blurb: "Start with movement. Add the rest later, if it fits.",
    price: 280,
    duration: "6 weeks · 1:1",
    blocks: ["training"],
    addons: [],
    bestFor: "easing back into movement, no pressure to add more yet",
    format: "Weekly 1:1 session · async form checks between",
  },
  {
    id: "training-nutrition",
    name: "Training + nutrition",
    blurb: "Strength and a calmer relationship with food.",
    price: 435,
    duration: "6 weeks · 1:1",
    blocks: ["training", "nutrition"],
    addons: [],
    bestFor: "when food and training feel like separate battles",
    format: "Weekly 1:1 session · nutrition check-in midweek",
  },
  {
    id: "complete",
    name: "Complete path",
    blurb: "Body, plate, and soul — plus every add-on thrown in.",
    price: 560,
    duration: "6 weeks · 1:1",
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
 * Build a human-readable summary from a selection. Used by the contact
 * form prefill to show the visitor (and Kathy in the reply email) what
 * combination was assembled before booking.
 */
export function summarize(
  blockIds: BlockId[],
  addonIds: AddonId[],
  bundleId?: string
): string {
  if (bundleId) {
    const bundle = BUNDLES.find((b) => b.id === bundleId);
    if (bundle) return `${bundle.name} — €${bundle.price}, ${bundle.duration}`;
  }
  if (blockIds.length === 0 && addonIds.length === 0) return "";
  const blockNames = blockIds
    .map((id) => BLOCKS.find((b) => b.id === id)?.name)
    .filter(Boolean);
  const addonNames = addonIds
    .map((id) => ADDONS.find((a) => a.id === id)?.name)
    .filter(Boolean)
    .map((n) => `+ ${n}`);
  const price = calculatePrice(blockIds, addonIds);
  const parts = [...blockNames, ...addonNames].join(" · ");
  return `${parts} — €${price.total}, 6 weeks`;
}
