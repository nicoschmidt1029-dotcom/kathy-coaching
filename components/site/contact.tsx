"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CheckCircle2, Clock, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DisplayTitle } from "./display-title";
import { GuidedQuestions } from "./guided-questions";
import { TEMP_PHOTOS } from "@/lib/temp-photos";
import { buildGuidedSummary, type GuidedAnswers } from "@/lib/guided-questions";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent" }
  | { status: "error"; message: string };

type Props = {
  /** Prefilled program summary — carried from the Programs page (either a
   *  bundle click or a builder selection) and seeded into the message body. */
  prefill?: string;
};

/**
 * Contact page, restructured (Katarina's correction, 2026-08-18): the old
 * version opened with the intro AND the contact-method facts AND the photo
 * AND the full form, all above the fold — too much before a visitor had
 * said anything about themselves. New flow, top to bottom:
 *
 *   1. Clean intro (eyebrow, title, one line) — no contact-method clutter.
 *   2. Guided questions (see guided-questions.tsx) beside a smaller,
 *      secondary photo — a few taps to sketch the situation.
 *   3. The form itself, with a one-line summary of the guided answers
 *      above the message field.
 *   4. "Gut zu wissen" — the contact-method facts (format, languages,
 *      reply time), moved down here and styled quietly since they're
 *      useful but no longer the first thing on the page.
 *
 * The guided answers are local state (no persistence needed — this is a
 * single-page flow, not multi-step navigation) and get folded into the
 * message text at submit time via `composeMessage`, so the existing
 * `/api/contact` handler and the bundle-summary `prefill` prop both keep
 * working unchanged.
 */
export function Contact({ prefill }: Props = {}) {
  const t = useTranslations("contact");
  const tGuided = useTranslations("contact.guided");
  const [state, setState] = React.useState<FormState>({ status: "idle" });
  const [answers, setAnswers] = React.useState<GuidedAnswers>({});

  const guidedSummary = buildGuidedSummary(answers, (key) => tGuided(key));

  function composeMessage(typed: string) {
    const parts: string[] = [];
    if (prefill) parts.push(t("prefillPrefix", { selection: prefill }));
    if (guidedSummary)
      parts.push(t("guidedPrefillPrefix", { selection: guidedSummary }));
    parts.push(typed);
    return parts.filter(Boolean).join("\n\n");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: (fd.get("name") ?? "").toString(),
      email: (fd.get("email") ?? "").toString(),
      message: composeMessage((fd.get("message") ?? "").toString()),
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
          message: data.error ?? t("genericError"),
        });
        return;
      }
      form.reset();
      setAnswers({});
      setState({ status: "sent" });
    } catch {
      setState({ status: "error", message: t("networkError") });
    }
  }

  return (
    <section
      id="kontakt"
      className="section-pad relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] right-[-15%] h-[520px] w-[520px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.90 0.015 78), transparent 70%)",
        }}
      />

      <div className="container-page">
        {/* 1. Intro — clean, nothing but eyebrow/title/one line. The
            contact-method facts used to sit right here; they now live in
            "Gut zu wissen" near the bottom, see below. */}
        <div className="max-w-2xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <DisplayTitle className="mt-6">{t("title")}</DisplayTitle>
          <p className="section-lede max-w-md">{t("intro")}</p>
        </div>

        {/* 2. Guided questions, with a smaller secondary photo beside them
            on desktop (image is decorative here, not the section's anchor
            the way it used to be — omitted on mobile to keep the flow
            vertical and fast to tap through). */}
        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <p className="caption">{t("guided.intro")}</p>
            <div className="mt-5">
              <GuidedQuestions answers={answers} onChange={setAnswers} />
            </div>
          </div>

          {TEMP_PHOTOS.heroBlazer && (
            <div className="hidden md:col-span-4 md:block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={TEMP_PHOTOS.heroBlazer.url}
                  alt={TEMP_PHOTOS.heroBlazer.alt}
                  fill
                  sizes="30vw"
                  className="object-cover object-[50%_20%]"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. The form — appears after the questions, full width. */}
        <div className="mt-12 max-w-2xl">
          {state.status === "sent" ? (
            <div
              role="status"
              aria-live="polite"
              className="card-pad flex min-h-[420px] flex-col items-start justify-center rounded-2xl card-surface"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-[var(--clay)]/15 text-[var(--plum)] ring-1 ring-[var(--clay)]/25">
                <CheckCircle2 className="size-6" aria-hidden />
              </div>
              <h3 className="card-title mt-6 text-2xl">{t("sentTitle")}</h3>
              <p className="mt-3 max-w-md text-pretty text-foreground/70 sm:text-lg sm:leading-[1.65]">
                {t("sentBody")}
              </p>
              <button
                type="button"
                onClick={() => setState({ status: "idle" })}
                className="mt-8 text-[0.9rem] text-[var(--plum)] underline underline-offset-4 transition-colors hover:text-foreground"
              >
                {t("sendAnother")}
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="card-pad rounded-2xl card-surface"
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

              {guidedSummary && (
                <p className="mb-6 rounded-lg border border-[var(--clay)]/25 bg-[var(--clay)]/8 px-4 py-3 text-[0.9rem] text-foreground/75">
                  {t("guidedSummaryPrefix", { selection: guidedSummary })}
                </p>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-1">
                  <Label htmlFor="name" className="mb-2 text-foreground/80">
                    {t("nameLabel")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder={t("namePlaceholder")}
                    autoComplete="name"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="email" className="mb-2 text-foreground/80">
                    {t("emailLabel")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    autoComplete="email"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="mb-2 text-foreground/80">
                    {t("messageLabel")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t("messagePlaceholder")}
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
                  {t("privacyNote")}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={state.status === "sending"}
                  className="h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--plum)]/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state.status === "sending" ? t("submitting") : t("submit")}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* 4. "Gut zu wissen" — the contact-method facts that used to sit
            up top, now a quiet, understated block below the form. */}
        <div className="mt-16 max-w-2xl border-t border-foreground/10 pt-10">
          <p className="caption">{t("goodToKnowTitle")}</p>
          <ul className="mt-5 space-y-3.5 text-[0.9rem] text-foreground/60">
            <li className="flex items-center gap-3">
              <MessageCircle
                aria-hidden
                className="size-[1.05rem] shrink-0 text-[var(--clay)]"
                strokeWidth={1.75}
              />
              <span>
                <span className="sr-only">{t("formatLabel")}: </span>
                {t("formatValue")}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Globe
                aria-hidden
                className="size-[1.05rem] shrink-0 text-[var(--clay)]"
                strokeWidth={1.75}
              />
              <span>
                <span className="sr-only">{t("languagesLabel")}: </span>
                {t("languagesValue")}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock
                aria-hidden
                className="size-[1.05rem] shrink-0 text-[var(--clay)]"
                strokeWidth={1.75}
              />
              <span>
                <span className="sr-only">{t("replyLabel")}: </span>
                {t("replyValue")}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
