import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/site/hero";

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Hero />;
}
