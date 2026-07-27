import { Placeholder } from "./placeholder";
import { AutoplayVideo } from "./autoplay-video";

/**
 * Testimonial data.
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
  name: string;
  age: number;
  quote: string;
  program: string;
  videoSrc?: string;
  videoPoster?: string;
  videoAspect?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marcus",
    age: 41,
    program: "Training + nutrition",
    quote:
      "As a guy I wasn't sure this was for me. Katarina made it feel like coaching, not therapy — and the spiritual conversations were real, never pushy.",
  },
  {
    name: "Hannah",
    age: 27,
    program: "Complete program",
    quote:
      "Six weeks. The first program I've finished without giving up halfway. The grace she leads with is part of why.",
  },
  {
    name: "Sophie",
    age: 36,
    program: "Complete program",
    quote:
      "I wanted structure and got that — but also permission to stop white-knuckling my body. That shift didn't come from a plan. It came from being seen.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden bg-[var(--sand)]/40"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">More stories</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            What changed wasn&rsquo;t only the body.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="group flex flex-col rounded-2xl bg-card p-6 ring-1 ring-foreground/[0.07] transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(60,80,60,0.35)]"
              style={{
                transform: i === 1 ? "translateY(-12px)" : undefined,
              }}
            >
              {t.videoSrc ? (
                <AutoplayVideo
                  src={t.videoSrc}
                  poster={t.videoPoster}
                  ariaLabel={`Video testimonial from ${t.name}`}
                  aspect={t.videoAspect ?? "aspect-video"}
                />
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Placeholder
                    label="Before"
                    aspect="square"
                    tone="cream"
                    className="rounded-lg"
                  />
                  <Placeholder
                    label="After"
                    aspect="square"
                    tone="sage"
                    className="rounded-lg"
                  />
                </div>
              )}

              <blockquote className="mt-6 flex-1">
                <p className="font-display text-[1.1rem] leading-[1.55] text-foreground/85 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-5 flex items-center justify-between border-t border-foreground/[0.07] pt-4">
                <div>
                  <div className="text-[0.95rem] font-medium text-foreground">
                    {t.name}, {t.age}
                  </div>
                  <div className="caption mt-0.5">{t.program}</div>
                </div>
                <span
                  aria-hidden
                  className="font-display text-3xl leading-none text-[var(--sage)]"
                >
                  ”
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="caption mt-10 text-center">
          Before/after photos shared with permission · placeholders shown for now
        </p>
      </div>
    </section>
  );
}
