import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Program = {
  id: string;
  name: string;
  duration: string;
  blurb: string;
  includes: string[];
  price: string;
  popular?: boolean;
};

const PROGRAMS: Program[] = [
  {
    id: "training",
    name: "Training only",
    duration: "6 weeks",
    blurb: "Start with movement and build from there.",
    includes: [
      "Personalized training program",
      "Weekly progress check-ins",
      "Technique videos & feedback",
    ],
    price: "From €280",
  },
  {
    id: "training-nutrition",
    name: "Training + nutrition",
    duration: "6 weeks",
    blurb: "Strength and a calmer relationship with food.",
    includes: [
      "Everything in Training",
      "Custom nutrition plan",
      "Weekly recipe ideas & guidance",
    ],
    price: "From €420",
    popular: true,
  },
  {
    id: "complete",
    name: "Complete: body, nutrition & spiritual mentoring",
    duration: "6 weeks",
    blurb: "Body, plate, and soul — worked on together.",
    includes: [
      "Everything above",
      "1:1 mentoring sessions",
      "Scripture & prayer guidance",
    ],
    price: "From €560",
  },
];

export function Programs() {
  return (
    <section id="programs" className="section-pad">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow">Choose your path</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            Three programs. You choose where to begin.
          </h2>
          <p className="mt-5 text-pretty text-foreground/72 sm:text-lg sm:leading-[1.7]">
            Every program is one-on-one and runs six weeks — long enough to
            see real change, short enough to commit to honestly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PROGRAMS.map((p) => (
            <Card
              key={p.id}
              className={cn(
                "[--card-spacing:--spacing(6)] rounded-2xl transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5",
                p.popular
                  ? "bg-[var(--sage-deep)] text-[var(--primary-foreground)] ring-0 shadow-[0_30px_60px_-30px_rgba(60,80,60,0.5)]"
                  : "ring-foreground/10 hover:shadow-[0_20px_40px_-28px_rgba(60,80,60,0.35)]"
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-[0.7rem] tracking-[0.18em] uppercase",
                      p.popular
                        ? "text-[var(--primary-foreground)]/70"
                        : "text-foreground/45"
                    )}
                  >
                    {p.duration}
                  </span>
                  {p.popular && (
                    <span className="rounded-full bg-[var(--primary-foreground)]/15 px-2.5 py-0.5 font-mono text-[0.65rem] tracking-[0.14em] uppercase">
                      Most chosen
                    </span>
                  )}
                </div>
                <CardTitle
                  className={cn(
                    "mt-3 font-display text-[1.55rem] leading-[1.15] font-normal",
                    p.popular ? "text-[var(--primary-foreground)]" : ""
                  )}
                >
                  {p.name}
                </CardTitle>
                <CardDescription
                  className={cn(
                    "mt-2 text-[0.95rem]",
                    p.popular
                      ? "text-[var(--primary-foreground)]/75"
                      : "text-foreground/65"
                  )}
                >
                  {p.blurb}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2.5">
                  {p.includes.map((inc) => (
                    <li
                      key={inc}
                      className={cn(
                        "flex items-start gap-2.5 text-[0.92rem] leading-relaxed",
                        p.popular
                          ? "text-[var(--primary-foreground)]/85"
                          : "text-foreground/75"
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          p.popular
                            ? "text-[var(--primary-foreground)]"
                            : "text-[var(--sage-deep)]"
                        )}
                        aria-hidden
                      />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={cn(
                    "mt-6 border-t pt-5",
                    p.popular
                      ? "border-[var(--primary-foreground)]/15"
                      : "border-foreground/10"
                  )}
                >
                  <div
                    className={cn(
                      "font-display text-2xl font-normal",
                      p.popular ? "text-[var(--primary-foreground)]" : ""
                    )}
                  >
                    {p.price}
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-[0.78rem]",
                      p.popular
                        ? "text-[var(--primary-foreground)]/60"
                        : "text-foreground/55"
                    )}
                  >
                    Six-week program · 1:1
                  </p>
                </div>
              </CardContent>

              <CardFooter className="border-0 bg-transparent">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "w-full h-11",
                    p.popular
                      ? "bg-[var(--primary-foreground)] text-[var(--sage-deep)] hover:bg-[var(--primary-foreground)]/90"
                      : "bg-foreground text-background hover:bg-foreground/85"
                  )}
                >
                  <Link href="#contact">Choose this program</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.85rem] text-foreground/55">
          Not sure which fits? The discovery call helps you choose — no
          pressure either way.
        </p>
      </div>
    </section>
  );
}
