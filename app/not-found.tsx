import { headers } from "next/headers";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { NotFoundContent } from "@/components/site/not-found-content";
import { TranslationNotice } from "@/components/site/translation-notice";
import { routing } from "@/i18n/routing";
import { FONT_CLASSES } from "@/lib/fonts";

/**
 * The 404 page for URLs that match no route at all.
 *
 * It has to live here rather than under [locale]: the root layout of this app
 * *is* app/[locale]/layout.tsx, and Next only ever renders a root-level
 * not-found for unmatched routes — a nested not-found.tsx under [locale] is
 * never reached for them, whether or not a catch-all throws notFound().
 *
 * Because it sits outside that layout, it renders its own <html> shell. The
 * locale comes from the x-pathname header set in proxy.ts, so /sk/nonsense
 * still answers in Slovak.
 */
export default async function GlobalNotFound() {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-pathname") ?? "";
  const candidate = pathname.split("/")[1] ?? "";
  const locale = hasLocale(routing.locales, candidate)
    ? candidate
    : routing.defaultLocale;

  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} className={`${FONT_CLASSES} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--plum)] focus:px-4 focus:py-2 focus:text-[0.9rem] focus:text-[var(--primary-foreground)] focus:no-underline focus:outline-none focus:shadow-[0_10px_30px_-15px_rgba(60,40,52,0.5)]"
          >
            {t("skipToMain")}
          </a>
          <Header />
          {/* Same draft banner as every other page in this locale. */}
          <TranslationNotice locale={locale} />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            <NotFoundContent />
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
