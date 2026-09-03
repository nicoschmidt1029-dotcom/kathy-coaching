"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TEMP_PHOTOS } from "@/lib/temp-photos";
import { DisplayTitle } from "./display-title";

type FormState = { status: "idle" | "sending" | "sent" } | { status: "error"; message: string };
type Props = { content?: { eyebrow?: string; headline?: string; body?: string; submitLabel?: string; image?: string | null }; selectedPlan?: string };

export function Contact({ content, selectedPlan }: Props = {}) {
  const t = useTranslations("contact");
  const managed = content !== undefined;
  const eyebrow = managed ? content.eyebrow : t("eyebrow");
  const headline = managed ? content.headline : t("title");
  const [state, setState] = React.useState<FormState>({ status: "idle" });
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), message: String(data.get("message") ?? ""), website: String(data.get("website") ?? "") }) });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) return setState({ status: "error", message: result.error ?? t("genericError") });
      form.reset();
      setState({ status: "sent" });
    } catch { setState({ status: "error", message: t("networkError") }); }
  }
  const image = content?.image || TEMP_PHOTOS.heroBlazer?.url;
  return <section id="kontakt" className="section-pad section-pad-top-tight"><div className="container-page"><div className="max-w-2xl">{eyebrow && <p className="eyebrow">{eyebrow}</p>}{headline && <DisplayTitle className={eyebrow ? "mt-4" : ""}>{headline}</DisplayTitle>}{content?.body && <p className="section-lede max-w-xl">{content.body}</p>}</div><div className="mt-10 grid items-start gap-8 md:mt-14 md:grid-cols-12 md:gap-12">{image && <div className="md:col-span-4"><div className="relative aspect-[3/4] overflow-hidden rounded-2xl"><Image src={image} alt={eyebrow || headline || t("eyebrow")} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover object-[50%_20%]" /></div></div>}<div className="md:col-span-8">{state.status === "sent" ? <div role="status" aria-live="polite" className="card-pad flex min-h-[360px] flex-col items-start justify-center rounded-2xl card-surface"><CheckCircle2 className="size-8 text-[var(--plum)]" /><h2 className="card-title mt-6 text-2xl">{t("sentTitle")}</h2><p className="mt-3 text-foreground/70">{t("sentBody")}</p><button type="button" onClick={() => setState({ status: "idle" })} className="mt-7 text-sm text-[var(--plum)] underline">{t("sendAnother")}</button></div> : <form onSubmit={onSubmit} noValidate className="card-pad rounded-2xl card-surface">{selectedPlan && <div className="mb-6 rounded-xl border border-[var(--plum)]/15 bg-[var(--plum)]/5 px-4 py-3"><p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--plum)]/65">{t("selectedPayment")}</p><p className="mt-1 font-medium text-[var(--plum)]">{selectedPlan}</p></div>}<label aria-hidden className="pointer-events-none absolute left-[-9999px]">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><div className="space-y-5"><div><Label htmlFor="name" className="mb-2">{t("nameLabel")}</Label><Input id="name" name="name" required autoComplete="name" className="h-12" /></div><div><Label htmlFor="email" className="mb-2">{t("emailLabel")}</Label><Input id="email" name="email" type="email" required autoComplete="email" className="h-12" /></div><div><Label htmlFor="message" className="mb-2">{t("messageLabel")}</Label><Textarea id="message" name="message" required rows={6} className="min-h-36" defaultValue={selectedPlan ? t("programInterest", { plan: selectedPlan }) : ""} /></div></div>{state.status === "error" && <div role="alert" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">{state.message}</div>}<div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-foreground/55">{t("privacyNote")}</p><Button type="submit" size="lg" disabled={state.status === "sending"} className="h-12 w-full bg-[var(--plum)] px-7 text-white sm:w-auto">{state.status === "sending" ? t("submitting") : content?.submitLabel || t("submit")}</Button></div></form>}</div></div></div></section>;
}
