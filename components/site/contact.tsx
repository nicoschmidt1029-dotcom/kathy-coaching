"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent" }
  | { status: "error"; message: string };

type Props = {
  /** Prefilled value for the "Interested in" field — carried from the
   *  Programs page (either a bundle click or a builder selection). */
  prefill?: string;
};

export function Contact({ prefill }: Props = {}) {
  const [state, setState] = React.useState<FormState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: (fd.get("name") ?? "").toString(),
      email: (fd.get("email") ?? "").toString(),
      language: (fd.get("language") ?? "").toString(),
      location: (fd.get("location") ?? "").toString(),
      message: (fd.get("message") ?? "").toString(),
      website: (fd.get("website") ?? "").toString(),
    };

    setState({ status: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setState({
          status: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      form.reset();
      setState({ status: "sent" });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again in a moment.",
      });
    }
  }

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden bg-[var(--plum)] text-[var(--primary-foreground)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-15%] h-[520px] w-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.88 0.06 42), transparent 70%)",
        }}
      />

      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--primary-foreground)]/70">
            Let&rsquo;s talk
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance text-[var(--primary-foreground)]">
            Let&rsquo;s start a conversation.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-[var(--primary-foreground)]/80 sm:text-lg sm:leading-[1.7]">
            Tell me a little about you — where you&rsquo;re writing from, what
            language feels most comfortable, and where you&rsquo;d like to go.
            I&rsquo;ll get back to you personally, no fixed format yet.
          </p>

          <dl className="mt-10 space-y-4 text-[0.95rem]">
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                Format
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                We&rsquo;ll figure out what works together — call, message, or
                in person.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                Languages
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                English · Deutsch · Slovenčina
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
          {state.status === "sent" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl bg-[var(--primary-foreground)] p-8 text-foreground ring-1 ring-foreground/5 sm:p-10"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-[var(--clay)]/15 text-[var(--plum)] ring-1 ring-[var(--clay)]/25">
                <CheckCircle2 className="size-6" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight font-normal">
                Thank you — I got it.
              </h3>
              <p className="mt-3 max-w-md text-pretty text-foreground/70 sm:text-lg sm:leading-[1.65]">
                I read every message myself. Expect a reply within two working
                days, usually sooner. In the meantime — grace and peace to
                you.
              </p>
              <button
                type="button"
                onClick={() => setState({ status: "idle" })}
                className="mt-8 text-[0.9rem] text-[var(--plum)] underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl bg-[var(--primary-foreground)] p-6 text-foreground ring-1 ring-foreground/5 sm:p-8"
            >
              {/* Honeypot — hidden from users, harvested by bots */}
              <label
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-1">
                  <Label htmlFor="name" className="mb-2 text-foreground/80">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
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
                    required
                    placeholder="jane@example.com"
                    autoComplete="email"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="language" className="mb-2 text-foreground/80">
                    Language you&rsquo;re most comfortable in
                  </Label>
                  <select
                    id="language"
                    name="language"
                    defaultValue=""
                    className="h-11 w-full rounded-lg border border-input bg-background px-2.5 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  >
                    <option value="">No preference</option>
                    <option value="English">English</option>
                    <option value="Deutsch">Deutsch</option>
                    <option value="Slovenčina">Slovenčina</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="location" className="mb-2 text-foreground/80">
                    Where are you writing from?
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Country or city (optional)"
                    autoComplete="country-name"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="mb-2 text-foreground/80">
                    A little about where you are, where you&rsquo;d like to go
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    defaultValue={prefill ? `Interested in: ${prefill}\n\n` : undefined}
                    placeholder="Where you are now, where you'd like to go — no need to polish it."
                    className="min-h-32 rounded-lg bg-background"
                  />
                </div>
              </div>

              {state.status === "error" && (
                <div
                  role="alert"
                  className="mt-6 rounded-lg border border-destructive/25 bg-destructive/8 px-4 py-3 text-[0.9rem] text-destructive"
                >
                  {state.message}
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.78rem] text-foreground/55">
                  I&rsquo;ll only use your email to reply to you personally.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={state.status === "sending"}
                  className="h-11 bg-[var(--plum)] px-6 text-[var(--primary-foreground)] transition-colors hover:bg-[var(--plum)]/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state.status === "sending" ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
