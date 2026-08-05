import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Contact } from "@/components/site/contact";
import { Link } from "@/i18n/navigation";
import {
  ADDONS,
  BLOCKS,
  BUNDLES,
  summarize,
  type AddonId,
  type BlockId,
} from "@/lib/pricing";

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
  const t = await getTranslations({ locale, namespace: "contact" });
  const footer = await getTranslations({ locale, namespace: "footer" });

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
      <section className="border-t border-foreground/[0.08] py-10">
        <div className="container-page text-center text-[0.85rem] text-foreground/55">
          <p>
            {t("legalPrefix")}{" "}
            <Link
              href="/imprint"
              className="underline underline-offset-2 hover:text-foreground"
            >
              {footer("imprint")}
            </Link>{" "}
            ·{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-foreground"
            >
              {footer("privacy")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
