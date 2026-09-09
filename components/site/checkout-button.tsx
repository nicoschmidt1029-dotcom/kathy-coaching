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
  const inFlight = React.useRef(false);

  async function startCheckout() {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, locale }),
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
    <Button type="button" size="lg" disabled={loading} onClick={startCheckout} className={className}>
      <span>{loading ? loadingLabel : label}</span>
      {loading ? <LoaderCircle className="ml-3 size-4 shrink-0 animate-spin" /> : <ArrowRight className="ml-3 size-4 shrink-0" />}
    </Button>
    {error && <p role="alert" className="mt-2 text-sm text-red-100">{errorLabel}</p>}
  </div>;
}
