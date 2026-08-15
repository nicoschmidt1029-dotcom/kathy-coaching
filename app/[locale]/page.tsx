import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Approach } from "@/components/site/approach";
import { HowIWork } from "@/components/site/how-i-work";
import { Programs } from "@/components/site/programs";
import { Faq } from "@/components/site/faq";
import { Mission } from "@/components/site/mission";
import { Contact } from "@/components/site/contact";
import {
  ADDONS,
  BLOCKS,
  BUNDLES,
  summarize,
  type AddonId,
  type BlockId,
} from "@/lib/pricing";

function pick<T extends string>(
  value: string | string[] | undefined,
  valid: readonly T[]
): T[] {
  if (typeof value !== "string" || !value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is T => (valid as readonly string[]).includes(s));
}

/**
 * The whole site, on one page.
 *
 * Sections carry the ids the header and the retired routes point at: #about,
 * #approach, #how-i-work, #programme, #faq, #kontakt. /about, /programme and
 * /testimonials redirect here (see next.config.ts) so links already shared
 * still land somewhere.
 *
 * Imprint and privacy stay separate pages. They have to be reachable on their
 * own URL, and burying a legal notice inside a scroll is the opposite of what
 * a legal notice is for.
 *
 * The pricing builder is left off on purpose: on a page you scroll through
 * once, a calculator is a wall. The three bundles carry the offer.
 */
export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The bundle buttons link to ?bundle=…#kontakt, so a selection still
  // reaches the form now that everything lives on one page.
  const query = await searchParams;
  const p = await getTranslations({ locale, namespace: "pricing" });
  const bundleId =
    typeof query.bundle === "string" &&
    BUNDLES.some((b) => b.id === query.bundle)
      ? query.bundle
      : undefined;
  const blockIds = pick<BlockId>(
    query.blocks,
    BLOCKS.map((b) => b.id) as readonly BlockId[]
  );
  const addonIds = pick<AddonId>(
    query.addons,
    ADDONS.map((a) => a.id) as readonly AddonId[]
  );
  const prefill = summarize(p, blockIds, addonIds, bundleId);

  return (
    <>
      <Hero />
      <About />
      <Approach />
      <HowIWork />
      <Programs bundlesOnly />
      <Faq />
      <Mission />
      <Contact prefill={prefill} />
    </>
  );
}
