import type { BlockId } from "./pricing";

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
