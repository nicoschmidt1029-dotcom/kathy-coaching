import type { AddonId, BlockId } from "./pricing";

/**
 * One drawing per building block, in the same hand as the approach and method
 * illustrations.
 *
 * The programs page used generic lucide glyphs — a dumbbell, a leaf, a heart —
 * in a radial wash. They read as stock UI icons on a page that is otherwise
 * hand-drawn, and they carried no more meaning than the block name beside
 * them already did.
 */
export const BLOCK_ART: Record<BlockId, string> = {
  training: "/images/illustrations/block-training.png",
  nutrition: "/images/illustrations/block-nutrition.png",
  spiritual: "/images/illustrations/block-spiritual.png",
};

/**
 * One drawing per optional extra. Smaller than the block art on the page —
 * these are add-ons, and giving them the same visual weight as a building
 * block would flatten the difference the pricing depends on.
 */
export const ADDON_ART: Record<AddonId, string> = {
  whatsapp: "/images/illustrations/addon-whatsapp.png",
  prayer: "/images/illustrations/addon-prayer.png",
  priority: "/images/illustrations/addon-priority.png",
};
