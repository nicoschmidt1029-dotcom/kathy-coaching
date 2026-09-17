"use client";

import * as React from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

export function GiftCheckoutButton({ locale, label, amountLabel, amountHint, loadingLabel, errorLabel }: { locale: Locale; label: string; amountLabel: string; amountHint: string; loadingLabel: string; errorLabel: string }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [amount, setAmount] = React.useState("25");

  async function startCheckout() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/support-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, amount }),
      });
      const result = await response.json() as { url?: string };
      if (!response.ok || !result.url) throw new Error("Gift checkout was not created");
      window.location.assign(result.url);
    } catch (checkoutError) {
      console.error("Could not start gift checkout", checkoutError);
      setError(true);
      setLoading(false);
    }
  }

  return <div className="max-w-xs">
    <label htmlFor="gift-amount" className="mb-2 block text-sm font-medium text-[var(--plum)]">{amountLabel}</label>
    <div className="mb-3 flex h-12 items-center rounded-lg border border-[var(--plum)]/20 bg-white px-4 focus-within:ring-2 focus-within:ring-[var(--plum)]/25">
      <span className="mr-2 text-sm font-medium text-foreground/60">CHF</span>
      <input id="gift-amount" type="number" min="5" max="100000" step="1" inputMode="decimal" required value={amount} onChange={(event) => setAmount(event.target.value)} className="h-full min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none" />
    </div>
    <p className="mb-4 text-xs leading-relaxed text-foreground/55">{amountHint}</p>
    <Button type="button" size="lg" disabled={loading} onClick={startCheckout} className="h-12 bg-[var(--plum)] px-7 text-white hover:bg-[var(--plum)]/90">
      <span>{loading ? loadingLabel : label}</span>
      {loading ? <LoaderCircle className="ml-2 size-4 animate-spin" /> : <ArrowRight className="ml-2 size-4" />}
    </Button>
    {error && <p role="alert" className="mt-3 text-sm text-red-800">{errorLabel}</p>}
  </div>;
}
