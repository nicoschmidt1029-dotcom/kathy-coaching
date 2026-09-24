import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Mission } from "@/components/site/mission";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

const MISSION_EN_BODY = `We all have something that gives our life meaning, something that makes us feel alive and fulfilled. For me, that is helping improve the quality of life for people who desire it.

My first priority is always health, whether physical or mental. We can be the most beautiful in the world, but what good is that if we can't say the same about our inner self? That's why it's important not only to exercise and eat well, but to take care of our heart, our beliefs and our mindset.

Life is a gift from God, and to live it to its full potential, we have to love, appreciate and take care of the gift that was given to us. Every person matters, and every person is important. We are all different; not even two fingerprints are the same in this world. Within each of us, around thirty-seven trillion cells work together every single moment, without us even thinking about it. All the unseen work happening inside our bodies was perfectly designed for us. This gift was given to us, and now it is up to us how we take care of it. When you look in the mirror, when you are alone, and you like what you see, that tells you how well you have cared for the outside. But look inside too. If what you find there is anger, envy, unforgiveness, fear, the need to gossip, sadness you can't name or things we hide, then you know something inside is still waiting to be healed or simply left behind. Some of us are given the chance to learn this early in life, others discover it much later, and that is okay, because we still can change.

And just as this body was so carefully designed, it was also given the remarkable ability to heal itself. The same is true of what is inside. Our heart and our mind can heal too, when we stop ignoring what is there and let the healing happen.

I'm deeply drawn to a holistic approach to life, looking at the whole person — body, mind and spirit together — rather than isolated symptoms. Functional medicine is a powerful approach that looks beyond symptoms to understand the true root cause.

And that changes everything.

This isn't just something I have read about. I experienced this in my own life, when I went through real health challenges. What really helped me was when I started looking for the root cause of my problems, instead of only treating the symptoms.

Sometimes what we need is not another prescription, but to find out what caused it in the first place. And this is why I'm fascinated by medicine.

I believe the more we understand this, the more we can support life rather than work against it. And it's never too late to start, though the earlier we learn how to care for what we've been given — physically, mentally and spiritually — the more we lay the foundation for the life ahead of us.`;

/**
 * Mission — its own page now, per Katarina's request (nav clicks navigate
 * to real pages, not anchors on the home scroll). Was a band on the
 * one-pager between HowIWork and Contact.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.mission" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/mission"),
  };
}

export default async function MissionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const { locale } = await params;
  const { adminPreview } = await searchParams;
  setRequestLocale(locale);
  const missionTranslations = await getTranslations({ locale, namespace: "mission" });
  const isPreview = adminPreview === "mission";
  const entry = isPreview ? await getAdminPreviewEntry("website", "mission") : await getPublicWebsiteEntry("mission");
  const data = entry?.data as { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string> } | undefined;
  const content = locale === "en"
    ? {
        eyebrow: data?.eyebrow?.[locale] ?? missionTranslations("eyebrow"),
        headline: data?.headline?.[locale] ?? missionTranslations("title"),
        body: MISSION_EN_BODY,
        image: entry?.image_path,
      }
    : entry
      ? { eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], image: entry.image_path }
      : undefined;

  return <>{isPreview && <DraftPreviewBanner backHref="/admin/mission" />}<Mission content={content} /></>;
}
