import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Rendered inside [locale]/layout.tsx, so the locale context is already in
 * place. No `metadata` export here on purpose: not-found.tsx cannot receive
 * `params`, so a static title would be stuck in one language — the layout's
 * localized default applies instead.
 */
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative flex flex-1 items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-15%] right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.05 42 / 0.7), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] -z-10 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.92 0.022 78 / 0.7), transparent 70%)",
        }}
      />

      <div className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="caption">{t("eyebrow")}</p>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-normal">
            {t.rich("title", {
              em: (chunks) => (
                <span className="relative inline-block whitespace-nowrap">
                  <em className="not-italic font-display italic">{chunks}</em>
                  <svg
                    aria-hidden
                    viewBox="0 0 300 24"
                    className="absolute left-0 -bottom-2 w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 16 C 60 6, 130 4, 180 10 S 270 20, 296 8"
                      fill="none"
                      stroke="var(--clay)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ),
            })}
          </h1>

          <p className="mt-8 text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
            {t("body")}
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="group/button h-12 bg-[var(--plum)] px-6 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
            >
              <Link href="/">
                {t("cta")}
                <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
