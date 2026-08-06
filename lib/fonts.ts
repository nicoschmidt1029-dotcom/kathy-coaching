import { Fraunces, Inter } from "next/font/google";

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

/** Class list for the <html> element — keeps both shells identical. */
export const FONT_CLASSES = `${display.variable} ${body.variable}`;
