import { CheckCircle2 } from "lucide-react";
import { Placeholder } from "./placeholder";

const QUALS = [
  "Certified Personal Trainer",
  "Certified Nutrition Coach",
  "Five years in mentoring & discipleship",
];

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Placeholder
              label="Portrait of Katarina"
              aspect="portrait"
              tone="sand"
            />
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-foreground/45">
              Katarina · personal trainer · nutrition coach
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow">Meet Katarina</p>
          <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal">
            Strength, nourishment, and a quiet kind of confidence.
          </h2>

          <div className="mt-8 space-y-5 text-pretty text-foreground/75 sm:text-lg sm:leading-[1.7]">
            <p>
              I&rsquo;m Katarina — a certified personal trainer and nutrition
              coach, and a Christian. I spent years chasing what &ldquo;fit&rdquo;
              was supposed to look like, and missed the gentler truth:
              <em className="not-italic font-display"> my body was never the problem. The way I saw it was.</em>
            </p>
            <p>
              Today I help people train with purpose, eat without fear, and
              rediscover their identity in Jesus. Not as three separate
              projects — as one whole person, finally moving in the same
              direction.
            </p>
            <p className="text-foreground/65">
              Most clients come for a body that feels stronger. Many stay
              because something quieter shifts: a relationship with food
              without guilt, and a sense of worth that doesn&rsquo;t depend on
              what the scale says.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--sage)]/15 bg-[var(--sand)]/40 p-6 sm:p-7">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--sage-deep)]">
              Qualifications
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-1">
              {QUALS.map((q) => (
                <li key={q} className="flex items-start gap-3 text-[0.95rem]">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[var(--sage-deep)]"
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
