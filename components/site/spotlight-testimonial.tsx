import { Placeholder } from "./placeholder";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

export function SpotlightTestimonial() {
  return (
    <section
      id="spotlight"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative">
              <Placeholder
                label="Lena portrait"
                aspect="portrait"
                tone="sage"
                className="rotate-[-0.6deg]"
                src={TEMP_PHOTOS.spotlight?.url}
                alt={TEMP_PHOTOS.spotlight?.alt}
                credit={TEMP_PHOTOS.spotlight?.credit}
              />
              <span
                aria-hidden
                className="absolute -top-4 -left-4 font-display text-[7rem] leading-none text-[var(--sage)]/25 select-none"
              >
                ”
              </span>
            </div>
          </div>

          <figure className="md:col-span-7">
            <p className="eyebrow">A recent client</p>

            <blockquote className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.28] font-normal italic text-foreground/90 text-balance">
              I came in wanting to lose weight. Six weeks later, the weight
              had shifted — but the bigger thing was quieter. For the first
              time in years I looked in the mirror without doing math.
              Katarina didn&rsquo;t sell me a program; she walked with me
              through one.
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4">
              <span
                aria-hidden
                className="h-px w-8 bg-[var(--sage-deep)]"
              />
              <div>
                <div className="text-[0.98rem] font-medium text-foreground">
                  Lena, 32
                </div>
                <div className="caption mt-0.5">
                  Six-week Complete program
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
