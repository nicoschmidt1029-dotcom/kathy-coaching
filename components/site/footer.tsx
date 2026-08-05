import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./wordmark";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/[0.08] bg-background">
      <div className="container-page py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-[0.92rem] leading-relaxed text-foreground/65">
              {t("blurb")}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-[0.92rem] text-foreground/70 sm:flex-row sm:gap-6">
            <Link
              href="/imprint"
              className="transition-colors hover:text-foreground"
            >
              {t("imprint")}
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/kontakt"
              className="transition-colors hover:text-foreground"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-foreground/[0.07] pt-6 text-[0.8rem] text-foreground/50 sm:flex-row sm:items-center">
          {/* String, not number — ICU would format 2026 with a thousands separator */}
          <p>{t("copyright", { year: String(year) })}</p>
          <p className="caption">{t("madeWithCare")}</p>
        </div>
      </div>
    </footer>
  );
}
