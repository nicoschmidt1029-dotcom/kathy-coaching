import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Katie's mission, as one statement.
 *
 * This was five paragraphs of prose on a cream ground — the fourth section in
 * a row with the same shape, and the single biggest block of text on the
 * site. It is now a full-width plum band carrying the headline and one line,
 * set large.
 *
 * Two reasons. The words land harder with nothing around them, and the page
 * needs a break in rhythm: five sections of eyebrow-headline-paragraph-grid
 * read as one long scroll no matter how good each one is.
 *
 * The full text stays in messages/*.json — this renders `title` and `p3`,
 * which is the sentence the rest was building towards.
 */
export function Mission() {
  const t = useTranslations("mission");
  const cta = useTranslations("finalCta");

  return (
    <section className="section-pad relative overflow-hidden bg-[var(--plum)] text-[var(--primary-foreground)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -right-[10%] h-[560px] w-[560px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.06 42), transparent 70%)",
        }}
      />
      <div className="container-page relative">
        <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/60">
          {t("eyebrow")}
        </p>

        <blockquote className="mt-8 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-normal text-balance">
          {t("title")}
        </blockquote>

        <p className="mt-10 max-w-md font-display text-[1.35rem] leading-snug italic text-[var(--primary-foreground)]/75 sm:text-[1.6rem]">
          {t("p3")}
        </p>

        {/* The call to action lives here rather than in a section of its own.
            A separate plum CTA band directly below merged into one enormous
            purple block, and the page does not need to ask twice. */}
        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="group/button h-12 bg-[var(--primary-foreground)] px-7 text-[0.95rem] text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
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
