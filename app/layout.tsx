import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Katarina Gröflin — Faith-rooted training, nutrition & mentoring",
    template: "%s · Katarina Gröflin",
  },
  description:
    "Holistic coaching for women — and openly for men too. Personal training, nutrition guidance, and Christian mentoring with Katarina Gröflin, walked together over six weeks.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://katarina-coaching.vercel.app"
  ),
  openGraph: {
    title: "Katarina Gröflin — Faith-rooted training, nutrition & mentoring",
    description:
      "See your body the way God created it. Training, nutrition, and identity in Jesus — one path, walked together.",
    type: "website",
    url: "/",
    siteName: "Katarina Gröflin Coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "Katarina Gröflin — Faith-rooted training, nutrition & mentoring",
    description:
      "See your body the way God created it. Training, nutrition, and identity in Jesus — one path, walked together.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
