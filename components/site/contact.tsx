"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden bg-[var(--sage-deep)] text-[var(--primary-foreground)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-15%] h-[520px] w-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.05 145), transparent 70%)",
        }}
      />

      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/70">
            Let&rsquo;s talk
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance text-[var(--primary-foreground)]">
            A free 30-minute discovery call.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-[var(--primary-foreground)]/80 sm:text-lg sm:leading-[1.7]">
            Tell me a little about where you are and where you&rsquo;d like to
            go. No commitment — just a real conversation about whether we&rsquo;re a good fit.
          </p>

          <dl className="mt-10 space-y-4 text-[0.95rem]">
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                Format
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                Online (Zoom or Google Meet) — or in person on request.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                Languages
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                English · German
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                Reply within
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                Two working days, usually sooner.
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7">
          <form
            className="rounded-2xl bg-[var(--primary-foreground)] p-6 text-foreground ring-1 ring-foreground/5 sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-1">
                <Label htmlFor="name" className="mb-2 text-foreground/80">
                  Your name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11 rounded-lg bg-background"
                />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="email" className="mb-2 text-foreground/80">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  className="h-11 rounded-lg bg-background"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="program" className="mb-2 text-foreground/80">
                  Interested in
                </Label>
                <Input
                  id="program"
                  name="program"
                  placeholder="Training only · Training + nutrition · Complete · Not sure"
                  className="h-11 rounded-lg bg-background"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message" className="mb-2 text-foreground/80">
                  A little about where you are
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Where you are now, where you'd like to go — no need to polish it."
                  className="min-h-32 rounded-lg bg-background"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.78rem] text-foreground/55">
                I&rsquo;ll only use your email to reply about your discovery call.
              </p>
              <Button
                type="submit"
                size="lg"
                className="h-11 bg-[var(--sage-deep)] px-6 text-[var(--primary-foreground)] hover:bg-[var(--sage-deep)]/90"
              >
                Send message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
