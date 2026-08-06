import { useTranslations } from "next-intl";
import { SampleNotice } from "./sample-notice";

type Props = {
  /**
   * Whether to render the sample-content notice. Off on /testimonials, where
   * the section directly below carries it and two identical boxes on one
   * page read as a glitch rather than as emphasis.
   */
  showNotice?: boolean;
};

/**
 * A single quote, set large.
 *
 * There is no portrait slot: the person is invented, so a framed
 * "add real photo" box was reserving space for a photo that will never
 * exist of them. The oversized quote mark carries the composition instead —
 * a quote block that admits it is only a quote reads better than one built
 * around an absent face.
 */
export function SpotlightTestimonial({ showNotice = true }: Props = {}) {
  const t = useTranslations("spotlight");

  return (
    <section id="spotlight" className="relative overflow-hidden py-16 md:py-24">
      <div className="container-page">
        <figure className="max-w-[46rem]">
          <p className="eyebrow">{t("eyebrow")}</p>

          {/* In flow rather than absolutely placed, so it can never land on
              top of the eyebrow — and it echoes the smaller mark on the
              testimonial cards below. */}
          <span
            aria-hidden
            className="mt-4 block font-display text-[5rem] leading-[0.5] text-[var(--clay)]/30 select-none md:text-[7rem]"
          >
            ”
          </span>

          <blockquote className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.28] font-normal italic text-foreground/90 text-balance">
            {t("quote")}
          </blockquote>

          <figcaption className="mt-8 flex items-center gap-4">
            <span aria-hidden className="h-px w-8 bg-[var(--plum)]" />
            <div>
              <div className="text-[0.98rem] font-medium text-foreground">
                {t("name")}
              </div>
              <div className="caption mt-0.5">{t("program")}</div>
            </div>
          </figcaption>

          {/* On the home page this quote is the trust anchor directly under
              the hero — the one place an unmarked invention does the most
              damage. */}
          {showNotice && <SampleNotice className="mt-8" />}
        </figure>
      </div>
    </section>
  );
}
