import { useTranslations } from "next-intl";
import { Placeholder } from "./placeholder";
import { AutoplayVideo } from "./autoplay-video";

/**
 * Testimonial copy lives in messages/*.json under `testimonials.<key>`.
 *
 * When a real video snippet from a client is available (a short phone
 * clip is enough), fill in `videoSrc` (local file in /public or hosted
 * URL) and optionally `videoPoster` (a still frame). The card will then
 * show the video instead of the before/after photo grid — facial
 * expression and tone read more credibly than text alone.
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
      className="section-pad relative overflow-hidden bg-[var(--sand)]/40"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title">{t("title")}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
          {TESTIMONIALS.map((item, i) => {
            const name = t(`${item.key}.name`);
            return (
              <figure
                key={item.key}
                className="card-surface card-pad group flex flex-col transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(60,40,52,0.35)]"
                style={{
                  transform: i === 1 ? "translateY(-12px)" : undefined,
                }}
              >
                {item.videoSrc ? (
                  <AutoplayVideo
                    src={item.videoSrc}
                    poster={item.videoPoster}
                    ariaLabel={t("videoLabel", { name })}
                    aspect={item.videoAspect ?? "aspect-video"}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <Placeholder
                      label={t("before")}
                      aspect="square"
                      tone="cream"
                      className="rounded-lg"
                    />
                    <Placeholder
                      label={t("after")}
                      aspect="square"
                      tone="clay"
                      className="rounded-lg"
                    />
                  </div>
                )}

                <blockquote className="mt-6 flex-1">
                  <p className="font-display text-[1.1rem] leading-[1.55] text-foreground/85 italic">
                    &ldquo;{t(`${item.key}.quote`)}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="mt-5 flex items-center justify-between border-t border-foreground/[0.07] pt-4">
                  <div>
                    <div className="text-[0.95rem] font-medium text-foreground">
                      {name}
                    </div>
                    <div className="caption mt-0.5">
                      {t(`${item.key}.program`)}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="font-display text-3xl leading-none text-[var(--clay)]"
                  >
                    ”
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="caption mt-10 text-center">{t("note")}</p>
      </div>
    </section>
  );
}
