import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * The site's 404 page body.
 *
 * Lives in a component because it has to be mounted from two not-found
 * boundaries: app/[locale]/not-found.tsx and app/[locale]/[...rest]/not-found.tsx.
 * The first one sits next to the root layout, and Next only uses a root-level
 * not-found for routes it never matched — a notFound() thrown inside a page
 * does not reach it. The nested one under the catch-all is what actually
 * renders for unknown URLs.
 */
export function NotFoundContent() {
  const t = useTranslations("notFound");

  return (
    <div className="relative flex flex-1 items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-15%] right-[-10%] -z-10 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.05 82 / 0.7), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] -z-10 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.92 0.022 80 / 0.7), transparent 70%)",
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
                  {/* Fixed em height — see the note in hero.tsx. */}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 24"
                    className="absolute left-0 -bottom-2 h-[0.26em] w-full"
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
              className="group/button h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
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
