import { Instrument_Serif, Inter, Pinyon_Script } from "next/font/google";

/**
 * Shared font instances.
 *
 * next/font wants to be initialised once at module scope, and two files need
 * them: the locale layout and the global not-found page, which sits outside
 * that layout and has to render its own <html> shell.
 */
/**
 * Display face. Was Fraunces — a soft, quirky old-style serif that got
 * heavier and more idiosyncratic the bigger it ran, which is part of why
 * the oversized display titles read as "too much" rather than elegant.
 * Instrument Serif is the restrained, single-weight editorial serif behind
 * the reference site's headlines (Create with Danielle's DWA landing
 * page) — thin strokes, a genuine italic, calm at both body and display
 * sizes. Single weight only (400), so no bold display headings — the
 * scale carries the hierarchy instead, same as the reference.
 */
export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Script face for the wordmark only. Katey's own logo sets her name in a
 * flowing calligraphic script ("Katey Coaching") — Pinyon Script is the
 * closest Google Font match to that hand. Used nowhere else: a script this
 * decorative is illegible at body-copy sizes.
 */
export const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

/** Class list for the <html> element — keeps both shells identical. */
export const FONT_CLASSES = `${display.variable} ${body.variable} ${script.variable}`;
