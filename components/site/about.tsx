import { CheckCircle2 } from "lucide-react";
import { Placeholder } from "./placeholder";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

const QUALS = [
  "Certified Personal Trainer",
  "Certified Nutrition Coach",
];

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            {TEMP_PHOTOS.about ? (
              <Placeholder
                label="Katie portrait"
                aspect="portrait"
                tone="sand"
                src={TEMP_PHOTOS.about.url}
                alt={TEMP_PHOTOS.about.alt}
                credit={TEMP_PHOTOS.about.credit}
              />
            ) : (
              <PortraitPlaceholder label="Katie portrait" />
            )}
            <p className="caption mt-4">
              Katie · personal trainer · nutrition coach
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow">Meet Katie</p>
          <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal">
            Strength, nourishment, and a quiet kind of confidence.
          </h2>

          <div className="mt-8 space-y-5 text-pretty text-foreground/75 sm:text-lg sm:leading-[1.7]">
            <p>
              We all have a calling in life.{" "}
              <em className="not-italic font-display">My calling is to help people.</em>
            </p>
            <p>
              After my study at SNF Academy, where I studied Personal Trainer
              and Nutrition coach, and graduating from Awakening School of
              Ministry, I help people move forward in their lives. With the
              right diet, the right mindset, and the right exercise.{" "}
              <em className="not-italic font-display">At any age.</em>
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--clay)]/15 bg-[var(--sand)]/40 p-6 sm:p-7">
            <p className="caption text-[var(--plum)]">Qualifications</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-1">
              {QUALS.map((q) => (
                <li key={q} className="flex items-start gap-3 text-[0.95rem]">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[var(--plum)]"
                    aria-hidden
                  />
                  <span className="text-foreground/80">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
