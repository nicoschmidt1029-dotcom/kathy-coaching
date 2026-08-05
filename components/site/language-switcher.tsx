"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_LABELS, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Larger tap targets and spacing, for the mobile sheet. */
  size?: "sm" | "lg";
};

/**
 * EN · DE · SK switcher.
 *
 * `usePathname` from the i18n navigation returns the route without its locale
 * prefix, so linking to the same path under a different locale is enough —
 * the visitor stays on the page they were reading. Query strings are dropped
 * on purpose: reading the search params here would opt the whole layout out
 * of static rendering for a link that is almost never used mid-form.
 */
export function LanguageSwitcher({ className, size = "sm" }: Props) {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations("language");

  return (
    <nav
      aria-label={t("label")}
      className={cn(
        "flex items-center",
        size === "lg" ? "gap-1" : "gap-0.5",
        className
      )}
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === active;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  "select-none text-foreground/25",
                  size === "lg" ? "px-1 text-sm" : "px-0.5 text-[0.7rem]"
                )}
              >
                ·
              </span>
            )}
            <Link
              href={pathname}
              locale={locale}
              hrefLang={locale}
              aria-current={isActive ? "true" : undefined}
              title={t("switchTo", {
                language: LOCALE_LABELS[locale as Locale].name,
              })}
              className={cn(
                "rounded font-mono uppercase transition-colors duration-200",
                size === "lg"
                  ? "px-2 py-1 text-[0.8rem] tracking-[0.18em]"
                  : "px-1.5 py-1 text-[0.68rem] tracking-[0.16em]",
                isActive
                  ? "text-foreground"
                  : "text-foreground/45 hover:text-foreground"
              )}
            >
              {LOCALE_LABELS[locale as Locale].short}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
