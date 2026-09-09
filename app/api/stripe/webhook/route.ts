import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

function stripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(apiKey);
}

const confirmationCopy = {
  en: {
    subject: "Your Katey Coaching purchase is confirmed",
    greeting: "Thank you for your purchase. Your payment has been confirmed.",
    next: "Katey will contact you separately with the next step.",
    terms: "Terms",
    portal: "Manage subscription and invoices",
    selection: "Your selection",
    plans: {
      "a-1": "The Full Transformation — CHF 1,290 paid in full",
      "a-2": "The Full Transformation — 2 monthly payments of CHF 700 (CHF 1,400 total)",
      "a-3": "The Full Transformation — 3 monthly payments of CHF 480 (CHF 1,440 total)",
      "b-month": "Move and Grow — CHF 200 per month until cancelled",
      "c-hour": "Find Your Way Through — CHF 80 per 60-minute session",
    },
  },
  de: {
    subject: "Dein Kauf bei Katey Coaching ist bestätigt",
    greeting: "Vielen Dank für deinen Kauf. Deine Zahlung wurde bestätigt.",
    next: "Katey meldet sich separat mit dem nächsten Schritt.",
    terms: "AGB",
    portal: "Abo und Rechnungen verwalten",
    selection: "Deine Auswahl",
    plans: {
      "a-1": "The Full Transformation — CHF 1.290 vollständig vorausbezahlt",
      "a-2": "The Full Transformation — 2 monatliche Zahlungen à CHF 700 (CHF 1.400 gesamt)",
      "a-3": "The Full Transformation — 3 monatliche Zahlungen à CHF 480 (CHF 1.440 gesamt)",
      "b-month": "Move and Grow — CHF 200 pro Monat bis zur Kündigung",
      "c-hour": "Find Your Way Through — CHF 80 pro 60-minütigem Termin",
    },
  },
  sk: {
    subject: "Tvoj nákup v Katey Coaching je potvrdený",
    greeting: "Ďakujeme za nákup. Tvoja platba bola potvrdená.",
    next: "Katey ťa bude samostatne kontaktovať s ďalším krokom.",
    terms: "Obchodné podmienky",
    portal: "Spravovať predplatné a faktúry",
    selection: "Tvoj výber",
    plans: {
      "a-1": "The Full Transformation — 1 290 CHF zaplatených vopred",
      "a-2": "The Full Transformation — 2 mesačné platby po 700 CHF (spolu 1 400 CHF)",
      "a-3": "The Full Transformation — 3 mesačné platby po 480 CHF (spolu 1 440 CHF)",
      "b-month": "Move and Grow — 200 CHF mesačne až do zrušenia",
      "c-hour": "Find Your Way Through — 80 CHF za 60-minútové stretnutie",
    },
  },
} as const;

async function sendConfirmation(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const email = session.customer_details?.email;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  if (!email || !apiKey) {
    console.warn("Purchase confirmation email is not configured", {
      sessionId: session.id,
      hasEmail: Boolean(email),
      hasApiKey: Boolean(apiKey),
    });
    return;
  }

  const locale = session.metadata?.locale;
  const language = locale === "de" || locale === "sk" ? locale : "en";
  const copy = confirmationCopy[language];
  const plan = session.metadata?.plan as keyof typeof copy.plans | undefined;
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL;
  const lines = [
    copy.greeting,
    ...(plan && copy.plans[plan]
      ? [`${copy.selection}: ${copy.plans[plan]}`]
      : []),
    copy.next,
    "",
    `${copy.terms}: https://kateycoaching.com/${language}/terms`,
  ];
  if (session.mode === "subscription" && portalUrl) {
    lines.push(`${copy.portal}: ${portalUrl}`);
  }

  const { error } = await new Resend(apiKey).emails.send(
    { from, to: email, subject: copy.subject, text: lines.join("\n") },
    { idempotencyKey: `checkout-confirm-${session.id}` },
  );
  if (error) throw new Error(`Resend purchase confirmation failed: ${error.message}`);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!webhookSecret || !signature) {
    return new Response("Webhook configuration missing", { status: 400 });
  }

  const stripe = stripeClient();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch {
    return new Response("Invalid Stripe signature", { status: 400 });
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return new Response("ok");
  }

  const session = event.data.object;
  if (event.type === "checkout.session.async_payment_succeeded") {
    try {
      await sendConfirmation(session);
      return new Response("ok");
    } catch (error) {
      console.error("Could not send purchase confirmation", error);
      return new Response("Could not send confirmation", { status: 500 });
    }
  }

  const installmentCount = Number(session.metadata?.installments);
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  try {
    if ([2, 3].includes(installmentCount) && subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      // Stripe can retry webhook deliveries. An attached schedule means this
      // checkout has already been converted into a fixed installment plan.
      if (!subscription.schedule) {
        const schedule = await stripe.subscriptionSchedules.create(
          { from_subscription: subscriptionId },
          { idempotencyKey: `installments-${session.id}` },
        );
        const currentPhase = schedule.phases[0];

        if (!currentPhase) {
          throw new Error("Stripe created a schedule without a phase");
        }

        await stripe.subscriptionSchedules.update(schedule.id, {
          end_behavior: "cancel",
          metadata: {
            checkout_session: session.id,
            installments: String(installmentCount),
          },
          phases: [
            {
              start_date: currentPhase.start_date,
              duration: { interval: "month", interval_count: installmentCount },
              items: currentPhase.items.map((item) => ({
                price:
                  typeof item.price === "string" ? item.price : item.price.id,
                quantity: item.quantity ?? 1,
              })),
            },
          ],
        });
      }
    }

    await sendConfirmation(session);
  } catch (error) {
    console.error("Could not finalize Stripe checkout", error);
    return new Response("Could not finalize checkout", { status: 500 });
  }

  return new Response("ok");
}
