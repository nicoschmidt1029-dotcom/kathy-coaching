import { Fraunces, Inter, Pinyon_Script } from "next/font/google";

/**
 * Shared font instances.
 *
 * next/font wants to be initialised once at module scope, and two files need
 * them: the locale layout and the global not-found page, which sits outside
 * that layout and has to render its own <html> shell.
 */
export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
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
