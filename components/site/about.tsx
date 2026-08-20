import { useTranslations } from "next-intl";
import { DisplayTitle } from "./display-title";
import { Placeholder } from "./placeholder";
import { TEMP_PHOTOS } from "@/lib/temp-photos";

type EditableContent = { headline?: string; body?: string; image?: string | null };

export function About({ content }: { content?: EditableContent }) {
  const t = useTranslations("about");
  const photo = content?.image ? { url: content.image, alt: t("portraitLabel") } : TEMP_PHOTOS.about;
  const paragraphs = content?.body?.split(/\n\s*\n/).filter(Boolean) ?? [];

  return <section id="about" className="section-pad section-pad-top-tight"><div className="container-page"><div className="grid items-start gap-8 md:grid-cols-12 md:gap-16"><div className="md:col-span-6"><p className="eyebrow">{t("eyebrow")}</p><DisplayTitle className="mt-4">{content?.headline || t("overlapTitle")}</DisplayTitle>{paragraphs.length > 0 && <div className="mt-7 max-w-xl space-y-5">{paragraphs.map((paragraph) => <p key={paragraph} className="text-pretty leading-[1.7] text-foreground/72 sm:text-lg">{paragraph}</p>)}</div>}</div>{photo && <div className="md:col-span-6"><Placeholder label={t("portraitLabel")} aspect="portrait" tone="sand" src={photo.url} alt={photo.alt} credit={photo.credit} /></div>}</div></div></section>;
}
