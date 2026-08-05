"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LOCALE_LABELS, routing, type Locale } from "@/i18n/routing";

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

export function Contact({ prefill }: Props = {}) {
  const t = useTranslations("contact");
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
          message: data.error ?? t("genericError"),
        });
        return;
      }
      form.reset();
      setState({ status: "sent" });
    } catch {
      setState({ status: "error", message: t("networkError") });
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
            {t("eyebrow")}
          </p>
          <h2 className="section-title text-[var(--primary-foreground)]">
            {t("title")}
          </h2>
          {/* .section-lede's ink is tuned for cream ground — on the plum band
              the colour is overridden, the type scale stays shared. */}
          <p className="section-lede max-w-md text-[var(--primary-foreground)]/80">
            {t("intro")}
          </p>

          <dl className="mt-10 space-y-4 text-[0.95rem]">
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                {t("formatLabel")}
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                {t("formatValue")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                {t("languagesLabel")}
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                {t("languagesValue")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--primary-foreground)]/55">
                {t("replyLabel")}
              </dt>
              <dd className="mt-1 text-[var(--primary-foreground)]/85">
                {t("replyValue")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7">
          {state.status === "sent" ? (
            <div
              role="status"
              aria-live="polite"
              className="card-pad flex min-h-[420px] flex-col items-start justify-center rounded-2xl bg-[var(--primary-foreground)] text-foreground ring-1 ring-foreground/5"
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
              className="card-pad rounded-2xl bg-[var(--primary-foreground)] text-foreground ring-1 ring-foreground/5"
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
                <div className="sm:col-span-1">
                  <Label htmlFor="language" className="mb-2 text-foreground/80">
                    {t("languageLabel")}
                  </Label>
                  {/* Options stay in their own language on purpose — a visitor
                      picking "Slovenčina" reads it the same in every locale. */}
                  <select
                    id="language"
                    name="language"
                    defaultValue=""
                    className="h-11 w-full rounded-lg border border-input bg-background px-2.5 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  >
                    <option value="">{t("languageNoPreference")}</option>
                    {routing.locales.map((locale) => (
                      <option
                        key={locale}
                        value={LOCALE_LABELS[locale as Locale].name}
                      >
                        {LOCALE_LABELS[locale as Locale].name}
                      </option>
                    ))}
                    <option value="Other">{t("languageOther")}</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="location" className="mb-2 text-foreground/80">
                    {t("locationLabel")}
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder={t("locationPlaceholder")}
                    autoComplete="country-name"
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
                    defaultValue={
                      prefill
                        ? `${t("prefillPrefix", { selection: prefill })}\n\n`
                        : undefined
                    }
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
                  className="h-11 bg-[var(--plum)] px-6 text-[var(--primary-foreground)] transition-colors hover:bg-[var(--plum)]/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state.status === "sending" ? t("submitting") : t("submit")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
