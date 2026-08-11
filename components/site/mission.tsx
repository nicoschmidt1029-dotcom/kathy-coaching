import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { DisplayTitle } from "./display-title";

/**
 * Katey's mission, as one statement.
 *
 * On the site's own cream like everything else — the plum band it used to sit
 * on was one of five different section grounds, and a page that changes
 * colour every time you scroll reads as assembled rather than designed. The
 * weight now comes from the type: the statement runs at display size and
 * carries the section by itself.
 *
 * The full text stays in messages/*.json — this renders `title` and `p3`,
 * which is the sentence the rest was building towards.
 */
export function Mission() {
  const t = useTranslations("mission");
  const cta = useTranslations("finalCta");

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-page">
        <p className="eyebrow">{t("eyebrow")}</p>

        <DisplayTitle className="mt-8 max-w-[16ch]">{t("title")}</DisplayTitle>

        <p className="mt-10 max-w-md font-display text-[1.35rem] leading-snug italic text-foreground/65 sm:text-[1.6rem]">
          {t("p3")}
        </p>

        {/* The call to action lives here rather than in a section of its own —
            the page does not need to ask twice. */}
        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
          >
            <Link href="/kontakt">
              {cta("cta")}
              <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
