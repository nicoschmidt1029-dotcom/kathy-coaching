import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { DisplayTitle } from "./display-title";

/**
 * Closing invitation.
 *
 * Was a plum band; now on the same cream as every other section, with the
 * ask carried by display type instead of by a colour change. The plum
 * survives where it does work — on the button.
 */
export function HomeFinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-page">
        <p className="eyebrow">{t("eyebrow")}</p>

        <DisplayTitle className="mt-8 max-w-[15ch]">{t("title")}</DisplayTitle>

        <p className="mt-10 max-w-md text-pretty text-foreground/65 sm:text-lg sm:leading-[1.7]">
          {t("body")}
        </p>

        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
          >
            <Link href="/kontakt">
              {t("cta")}
              <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
