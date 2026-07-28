import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/site/contact";
import {
  ADDONS,
  BLOCKS,
  BUNDLES,
  summarize,
  type AddonId,
  type BlockId,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute discovery call with Kathy. No commitment — just a real conversation about whether coaching together is a fit.",
};

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
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const bundleId =
    typeof params.bundle === "string" &&
    BUNDLES.some((b) => b.id === params.bundle)
      ? params.bundle
      : undefined;

  const blockIds = pick<BlockId>(
    params.blocks,
    BLOCKS.map((b) => b.id) as readonly BlockId[]
  );
  const addonIds = pick<AddonId>(
    params.addons,
    ADDONS.map((a) => a.id) as readonly AddonId[]
  );

  const prefill = summarize(blockIds, addonIds, bundleId);

  return (
    <>
      <Contact prefill={prefill} />
      <section className="border-t border-foreground/[0.08] py-10">
        <div className="container-page text-center text-[0.85rem] text-foreground/55">
          <p>
            Legal:{" "}
            <Link
              href="/imprint"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Imprint
            </Link>{" "}
            ·{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Privacy
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
