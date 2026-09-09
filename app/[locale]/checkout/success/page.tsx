import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkoutSuccess" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function CheckoutSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "checkoutSuccess" });

  return <main className="section-pad section-pad-top-tight"><div className="container-page"><div className="card-pad mx-auto max-w-2xl rounded-2xl card-surface">
    <CheckCircle2 className="size-9 text-[var(--plum)]" />
    <p className="eyebrow mt-7">{t("eyebrow")}</p>
    <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-[var(--plum)]">{t("title")}</h1>
    <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">{t("body")}</p>
    <Button asChild size="lg" className="mt-8 h-12 bg-[var(--plum)] px-7 text-white hover:bg-[var(--plum)]/90"><Link href="/">{t("home")}</Link></Button>
  </div></div></main>;
}
