import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const plans = {
  "a-1": { priceEnv: "STRIPE_PRICE_FULL_PAYMENT", mode: "payment", cancelPath: "/programme/personalised-online-fitness-coaching-90-days" },
  "a-2": { priceEnv: "STRIPE_PRICE_2_PAYMENTS", mode: "subscription", cancelPath: "/programme/personalised-online-fitness-coaching-90-days", installments: 2 },
  "a-3": { priceEnv: "STRIPE_PRICE_3_PAYMENTS", mode: "subscription", cancelPath: "/programme/personalised-online-fitness-coaching-90-days", installments: 3 },
  "b-month": { priceEnv: "STRIPE_PRICE_MOVE_AND_GROW", mode: "subscription", cancelPath: "/programme/move-and-grow" },
  "c-hour": { priceEnv: "STRIPE_PRICE_SINGLE_SESSION", mode: "payment", cancelPath: "/programme/find-your-way-through" },
} as const;

const locales = new Set(["en", "de", "sk"]);
const withdrawalCountries = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DE", "DK", "EE", "ES", "FI",
  "FR", "GR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MT", "NL",
  "NO", "PL", "PT", "RO", "SE", "SI", "SK", "GB",
]);

const earlyStartFields = {
  en: {
    label: "Start during the 14-day withdrawal period?",
    no: "Wait 14 days before starting my program",
    yes: "Start now; partial refund if I cancel within 14 days",
  },
  de: {
    label: "Beginn während der 14-tägigen Widerrufsfrist?",
    no: "14 Tage warten, bevor mein Programm beginnt",
    yes: "Jetzt starten; anteilige Erstattung bei Widerruf innerhalb von 14 Tagen",
  },
  sk: {
    label: "Začať počas 14-dňovej lehoty na odstúpenie?",
    no: "Počkať 14 dní pred začiatkom môjho programu",
    yes: "Začať teraz; pomerné vrátenie pri odstúpení do 14 dní",
  },
} as const;

export async function POST(request: Request) {
  let body: { plan?: keyof typeof plans; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const plan = body.plan ? plans[body.plan] : undefined;
  const locale = body.locale && locales.has(body.locale) ? body.locale : "en";
  if (!plan) return NextResponse.json({ error: "invalid_plan" }, { status: 400 });

  const apiKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env[plan.priceEnv];
  if (!apiKey || !priceId) {
    console.error("Stripe Checkout configuration missing", { priceEnv: plan.priceEnv, hasApiKey: Boolean(apiKey) });
    return NextResponse.json({ error: "checkout_unavailable" }, { status: 503 });
  }

  const origin = new URL(request.url).origin;
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const metadata: Record<string, string> = { plan: body.plan!, locale };
  if (country) metadata.checkout_country = country;
  if ("installments" in plan) metadata.installments = String(plan.installments);
  const earlyStart = earlyStartFields[locale as keyof typeof earlyStartFields];
  // Vercel supplies the visitor country in production. In local/unknown
  // environments, keep the choice visible as the legally safer fallback.
  const collectWithdrawalChoice = !country || withdrawalCountries.has(country);

  try {
    const stripe = new Stripe(apiKey);
    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      integration_identifier: "katey_programs_xqmtvlre",
      line_items: [{ price: priceId, quantity: 1 }],
      // Keep the advertised CHF amounts exact instead of converting them to
      // a visitor's local currency through Stripe Adaptive Pricing.
      adaptive_pricing: { enabled: false },
      billing_address_collection: "required",
      locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
      consent_collection: { terms_of_service: "required" },
      custom_fields: collectWithdrawalChoice ? [
        {
          key: "early_start",
          label: { type: "custom", custom: earlyStart.label },
          type: "dropdown",
          optional: false,
          dropdown: {
            options: [
              { label: earlyStart.no, value: "no" },
              { label: earlyStart.yes, value: "yes" },
            ],
          },
        },
      ] : [],
      metadata,
      success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}${plan.cancelPath}?checkout=cancelled`,
      ...(plan.mode === "subscription"
        ? { subscription_data: { metadata } }
        : { customer_creation: "always" as const }),
    });

    if (!session.url) throw new Error("Stripe returned a Checkout Session without a URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Session creation failed", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
