import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const locales = new Set(["en", "de", "sk"]);

const checkoutCopy = {
  en: { name: "Support My Work", description: "A voluntary gift to support the work of Katey Coaching." },
  de: { name: "Unterstütze meine Arbeit", description: "Eine freiwillige Zuwendung zur Unterstützung der Arbeit von Katey Coaching." },
  sk: { name: "Podporte moju prácu", description: "Dobrovoľný dar na podporu práce Katey Coaching." },
} as const;

export async function POST(request: Request) {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return NextResponse.json({ error: "checkout_unavailable" }, { status: 503 });

  const body = await request.json().catch(() => ({})) as { locale?: string; amount?: string | number };
  const locale = body.locale && locales.has(body.locale) ? body.locale : "en";
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 5 || amount > 100000) {
    return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
  }
  const amountInCents = Math.round(amount * 100);
  const origin = new URL(request.url).origin;
  const copy = checkoutCopy[locale as keyof typeof checkoutCopy];

  try {
    const stripe = new Stripe(apiKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: "katey_support_qhmtzvle",
      submit_type: "donate",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "chf",
          product_data: {
            name: copy.name,
            description: copy.description,
          },
          unit_amount: amountInCents,
        },
      }],
      billing_address_collection: "auto",
      locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
      metadata: { purpose: "support_my_work", locale },
      payment_intent_data: { metadata: { purpose: "support_my_work", locale } },
      success_url: `${origin}/${locale}/support-my-work?gift=thank-you`,
      cancel_url: `${origin}/${locale}/support-my-work?gift=cancelled`,
    });
    if (!session.url) throw new Error("Stripe returned no checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Gift checkout creation failed", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
