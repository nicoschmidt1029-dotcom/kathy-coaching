import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/site/hero";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

/**
 * Home — the full-screen video hero, nothing else.
 *
 * Was a one-page scroll (Hero → About → Approach → HowIWork → Faq →
 * Mission → Contact). Katarina asked for that gone entirely: Home should
 * be its own landing view (video + headline + nav, full stop), with Katey,
 * Mission, Programs and Contact each a real page a nav click navigates to
 * — not an anchor scrolled to from here. Those sections now live at
 * /katey, /mission, /programme and /kontakt.
 */
export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const { locale } = await params;
  const { adminPreview } = await searchParams;
  setRequestLocale(locale);

  const isPreview = adminPreview === "homepage";
  const entry = isPreview ? await getAdminPreviewEntry("website", "homepage") : await getPublicWebsiteEntry("homepage");
  const data = entry?.data as { headline?: Record<string, string>; body?: Record<string, string>; ctaLabel?: Record<string, string>; ctaHref?: string } | undefined;
  return <>{isPreview && <DraftPreviewBanner backHref="/admin/homepage" />}<Hero content={entry ? { headline: data?.headline?.[locale], body: data?.body?.[locale], ctaLabel: data?.ctaLabel?.[locale], ctaHref: data?.ctaHref } : undefined} /></>;
}
