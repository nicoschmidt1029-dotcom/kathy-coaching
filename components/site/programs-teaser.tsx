import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { DisplayTitle } from "./display-title";

/**
 * Title across the full width, supporting copy beneath.
 *
 * At display size a heading cannot live in a six-column well — "Drei
 * Programme. Du wählst, wo du anfängst." broke into five cramped lines. The
 * type sets the width now, and the copy sits under it.
 */
export function ProgramsTeaser() {
  const t = useTranslations("programs");

  return (
    <section className="section-pad">
      <div className="container-page">
        <p className="eyebrow">{t("eyebrow")}</p>
        <DisplayTitle className="mt-6 max-w-[16ch]">
          {t("teaserTitle")}
        </DisplayTitle>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <p className="section-lede mt-0 max-w-md">{t("teaserIntro")}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Button
              asChild
              size="lg"
              className="group/button h-12 shrink-0 bg-[var(--plum)] px-6 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
            >
              <Link href="/programme">
                {t("teaserCta")}
                <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
            <Link
              href="/kontakt"
              className="group inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] text-foreground/65 transition-colors hover:text-foreground"
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
    </section>
  );
}
