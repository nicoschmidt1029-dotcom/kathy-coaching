import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { ADDONS, BLOCKS, BUNDLES, summarize, type AddonId, type BlockId } from "@/lib/pricing";

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
 * Contact — its own page now, per Katarina's request (nav clicks navigate
 * to real pages, not anchors on the home scroll). Was the last section on
 * the one-pager, with Faq directly above it; kept together here, Contact
 * first and Faq below it, since a "still have a question" accordion
 * belongs right next to the form, not on a separate page a visitor has
 * to navigate away from.
 *
 * `prefill` still works the same way: a bundle chosen on /programme links
 * to `/kontakt?bundle=…` (was `/?bundle=…#kontakt`), and this page reads
 * the query and seeds it into the message body.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/kontakt"),
  };
}

export default async function KontaktPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
      <Contact prefill={prefill} />
      <Faq />
    </>
  );
}
