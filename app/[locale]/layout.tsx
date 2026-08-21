import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { TranslationNotice } from "@/components/site/translation-notice";
import { routing } from "@/i18n/routing";
import { alternatesFor } from "@/i18n/metadata";
import { SITE_URL } from "@/lib/site-url";
import { FONT_CLASSES } from "@/lib/fonts";
import { getPublicWebsiteEntry } from "@/lib/cms";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    // Home only — every other page overrides this with its own path.
    alternates: alternatesFor(locale),
    openGraph: {
      title: t("titleDefault"),
      description: t("ogDescription"),
      type: "website",
      url: `/${locale}`,
      siteName: t("siteName"),
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("ogDescription"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opt the whole subtree into static rendering for this locale.
  setRequestLocale(locale);

  const [t, footerEntry] = await Promise.all([getTranslations("nav"), getPublicWebsiteEntry("footer")]);
  const footerData = footerEntry?.data as { claim?: Record<string, string> } | undefined;

  return (
    <html lang={locale} className={`${FONT_CLASSES} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--plum)] focus:px-4 focus:py-2 focus:text-[0.9rem] focus:text-[var(--primary-foreground)] focus:no-underline focus:outline-none focus:shadow-[0_10px_30px_-15px_rgba(60,40,52,0.5)]"
          >
            {t("skipToMain")}
          </a>
          <Header />
          {/* Renders nothing unless this locale is still a draft. */}
          <TranslationNotice locale={locale} />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer claim={footerData?.claim?.[locale]} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
