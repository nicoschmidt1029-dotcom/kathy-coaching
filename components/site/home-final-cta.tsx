import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HomeFinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="section-pad relative overflow-hidden bg-[var(--plum)] text-[var(--primary-foreground)]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-15%] h-[520px] w-[520px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.06 42), transparent 70%)",
        }}
      />
      <div className="container-page text-center">
        <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/70">
          {t("eyebrow")}
        </p>
        <h2 className="section-title mx-auto max-w-3xl text-[var(--primary-foreground)]">
          {t("title")}
        </h2>
        <p className="section-lede mx-auto max-w-xl text-[var(--primary-foreground)]/80">
          {t("body")}
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group/button h-12 bg-[var(--primary-foreground)] px-6 text-[0.95rem] text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
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
