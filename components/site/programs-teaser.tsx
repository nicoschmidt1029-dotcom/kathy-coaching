import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function ProgramsTeaser() {
  const t = useTranslations("programs");

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="section-title">{t("teaserTitle")}</h2>
          </div>
          <div className="md:col-span-6">
            <p className="section-lede mt-0 max-w-none">{t("teaserIntro")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Button
                asChild
                size="lg"
                className="group/button h-12 bg-[var(--plum)] px-6 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
              >
                <Link href="/programme">
                  {t("teaserCta")}
                  <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-1.5 text-[0.95rem] text-foreground/72 transition-colors hover:text-foreground"
              >
                {t("teaserSecondary")}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
