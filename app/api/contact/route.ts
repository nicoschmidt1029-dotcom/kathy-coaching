import { NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name?: string;
  email?: string;
  program?: string;
  message?: string;
  website?: string; // honeypot — must remain empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
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
  const program = body.program?.trim() ?? "";

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
          "The contact form isn’t connected yet. Please email Katarina directly for now.",
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
      subject: `Discovery call request — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Interested in: ${program || "(not specified)"}`,
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
