import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

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
    default: "Kathy Coaching — Faith-rooted training, nutrition & mentoring",
    template: "%s · Kathy Coaching",
  },
  description:
    "Holistic coaching for women — and openly for men too. Personal training, nutrition guidance, and Christian mentoring with Kathy Coaching, walked together over six weeks.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://katarina-coaching.vercel.app"
  ),
  openGraph: {
    title: "Kathy Coaching — Faith-rooted training, nutrition & mentoring",
    description:
      "See your body the way God created it. Training, nutrition, and identity in Jesus — one path, walked together.",
    type: "website",
    url: "/",
    siteName: "Kathy Coaching Coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kathy Coaching — Faith-rooted training, nutrition & mentoring",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--plum)] focus:px-4 focus:py-2 focus:text-[0.9rem] focus:text-[var(--primary-foreground)] focus:no-underline focus:outline-none focus:shadow-[0_10px_30px_-15px_rgba(60,40,52,0.5)]"
        >
          Skip to main content
        </a>
        <Header />
        <main
          id="main"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
