import { useTranslations } from "next-intl";
import { AutoplayVideo } from "./autoplay-video";
import { SampleNotice } from "./sample-notice";
import { DisplayTitle } from "./display-title";

/**
 * Testimonial copy lives in messages/*.json under `testimonials.<key>`.
 *
 * There is no before/after image slot. Those were two empty framed boxes per
 * card, reserving space for photos of people who do not exist — they made the
 * section look like it was waiting on a file rather than on a real client.
 *
 * When a real video snippet from a client is available (a short phone clip is
 * enough), fill in `videoSrc` (local file in /public or hosted URL) and
 * optionally `videoPoster` (a still frame); the card then leads with the
 * video, and facial expression and tone read more credibly than text alone.
 *
 * For portrait phone footage, override `videoAspect` to something like
 * "aspect-[4/5]"; landscape defaults to aspect-video (16/9).
 */
type Testimonial = {
  key: "marcus" | "hannah" | "sophie";
  videoSrc?: string;
  videoPoster?: string;
  videoAspect?: string;
};

const TESTIMONIALS: Testimonial[] = [
  { key: "marcus" },
  { key: "hannah" },
  { key: "sophie" },
];

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <DisplayTitle className="mt-6">{t("title")}</DisplayTitle>
          {/* Above the cards, not below: a reader should know what they are
              looking at before they read a quote, not after. */}
          <SampleNotice className="mt-8" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => {
            const name = t(`${item.key}.name`);
            return (
              <figure
                key={item.key}
                className="card-surface card-pad flex flex-col transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(60,40,52,0.35)]"
              >
                {item.videoSrc && (
                  <AutoplayVideo
                    src={item.videoSrc}
                    poster={item.videoPoster}
                    ariaLabel={t("videoLabel", { name })}
                    aspect={item.videoAspect ?? "aspect-video"}
                    className="mb-6"
                  />
                )}

                <span
                  aria-hidden
                  className="font-display text-4xl leading-none text-[var(--clay)]/70"
                >
                  ”
                </span>

                <blockquote className="mt-3 flex-1">
                  <p className="font-display text-[1.1rem] leading-[1.55] text-foreground/85 italic">
                    {t(`${item.key}.quote`)}
                  </p>
                </blockquote>

                <figcaption className="mt-6 border-t border-foreground/[0.07] pt-4">
                  <div className="text-[0.95rem] font-medium text-foreground">
                    {name}
                  </div>
                  <div className="caption mt-0.5">
                    {t(`${item.key}.program`)}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
