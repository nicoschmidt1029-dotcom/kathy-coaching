"use client";

import * as React from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

type Props = {
  plan: "a-1" | "a-2" | "a-3" | "b-month" | "c-hour";
  locale: Locale;
  label: string;
  loadingLabel: string;
  errorLabel: string;
  className: string;
};

export function CheckoutButton({ plan, locale, label, loadingLabel, errorLabel, className }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [earlyStartConsent, setEarlyStartConsent] = React.useState(false);
  const inFlight = React.useRef(false);
  const earlyCopy = {
    en: "I expressly request that the coaching service begin before the end of the applicable withdrawal period. I understand that if the service is fully performed, I may lose my statutory withdrawal right where permitted by law. If I withdraw after performance has begun, I may have to pay a proportionate amount for services already provided.",
    de: "Ich verlange ausdrücklich, dass die Coaching-Leistung vor Ablauf der anwendbaren Widerrufsfrist beginnt. Ich verstehe, dass ich mein gesetzliches Widerrufsrecht nach vollständiger Leistung verlieren kann, soweit dies gesetzlich zulässig ist. Bei einem Widerruf nach Leistungsbeginn kann ich zur anteiligen Zahlung für bereits erbrachte Leistungen verpflichtet sein.",
    sk: "Výslovne žiadam, aby koučovacia služba začala pred uplynutím príslušnej lehoty na odstúpenie. Rozumiem, že po úplnom poskytnutí služby môžem stratiť zákonné právo na odstúpenie, ak to zákon povoľuje. Ak odstúpim po začatí služby, môžem byť povinný uhradiť pomernú cenu za už poskytnuté služby.",
  } as const;

  async function startCheckout() {
    if (inFlight.current) return;
    if (!earlyStartConsent) return;
    inFlight.current = true;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, locale, earlyStartConsent }),
      });
      const result = await response.json() as { url?: string };
      if (!response.ok || !result.url) throw new Error("Checkout session was not created");
      window.location.assign(result.url);
    } catch (checkoutError) {
      console.error("Could not start Stripe Checkout", checkoutError);
      setError(true);
      setLoading(false);
      inFlight.current = false;
    }
  }

  return <div>
    <label className="mb-4 flex items-start gap-3 text-left text-sm leading-relaxed text-white/85">
      <input type="checkbox" checked={earlyStartConsent} onChange={(event) => setEarlyStartConsent(event.target.checked)} className="mt-1 size-4 shrink-0 accent-[var(--clay)]" />
      <span>{earlyCopy[locale]}</span>
    </label>
    <Button type="button" size="lg" disabled={loading || !earlyStartConsent} onClick={startCheckout} className={className}>
      <span>{loading ? loadingLabel : label}</span>
      {loading ? <LoaderCircle className="ml-3 size-4 shrink-0 animate-spin" /> : <ArrowRight className="ml-3 size-4 shrink-0" />}
    </Button>
    {error && <p role="alert" className="mt-2 text-sm text-red-100">{errorLabel}</p>}
  </div>;
}
