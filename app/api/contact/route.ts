import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot — must remain empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Very simple in-memory sliding-window rate limit. Best-effort:
 *  - Per serverless instance only (Vercel spawns multiple lambdas across
 *    regions, so an attacker with parallel connections could theoretically
 *    hit more than the limit globally).
 *  - Resets on cold start.
 *
 * For a small coaching site this is enough to slow down single-instance
 * abuse. If volume grows or a real attack lands, swap for Upstash
 * ratelimit (add UPSTASH_REDIS_REST_URL + TOKEN env vars).
 */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;
const MIN_INTERVAL_MS = 15 * 1000; // 15s between submissions

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkLimit(
  ip: string
): { ok: true } | { ok: false; retryInSec: number; reason: string } {
  const now = Date.now();
  const hits = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.length > 0) {
    const sinceLast = now - hits[hits.length - 1];
    if (sinceLast < MIN_INTERVAL_MS) {
      return {
        ok: false,
        retryInSec: Math.ceil((MIN_INTERVAL_MS - sinceLast) / 1000),
        reason: "too_fast",
      };
    }
  }

  if (hits.length >= MAX_PER_WINDOW) {
    const oldest = hits[0];
    return {
      ok: false,
      retryInSec: Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
      reason: "hourly_limit",
    };
  }

  hits.push(now);
  HITS.set(ip, hits);
  return { ok: true };
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkLimit(ip);
  if (!rl.ok) {
    const message =
      rl.reason === "too_fast"
        ? "Just a moment — please wait a few seconds before sending again."
        : "You’ve sent several messages already. Please try again later.";
    return NextResponse.json(
      { ok: false, error: message },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryInSec) },
      }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot — pretend success so bots don't retry.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in name, email, and message." },
      { status: 400 }
    );
  }
  if (name.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn’t look right." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !apiKey) {
    console.warn("Contact form hit but email is not configured.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form isn’t connected yet. Please email Katey directly for now.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from the website — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("resend error", error);
      return NextResponse.json(
        { ok: false, error: "Sending failed. Please try again in a moment." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send failure", err);
    return NextResponse.json(
      { ok: false, error: "Sending failed. Please try again in a moment." },
      { status: 500 }
    );
  }
}
