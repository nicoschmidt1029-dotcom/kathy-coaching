import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_KEYS = ["believer", "women", "how", "gym", "beginner"] as const;

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="section-pad">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 text-pretty text-foreground/70 sm:text-[1.05rem] sm:leading-[1.7]">
            {t("intro")}
          </p>
        </div>

        <div className="md:col-span-8">
          <Accordion
            type="single"
            collapsible
            className="border-t border-foreground/10"
          >
            {FAQ_KEYS.map((key) => (
              <AccordionItem
                key={key}
                value={key}
                className="border-b border-foreground/10"
              >
                <AccordionTrigger className="py-6 font-display text-lg font-normal text-foreground hover:no-underline sm:text-xl">
                  {t(`${key}.q`)}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-[0.98rem] leading-[1.7] text-foreground/72">
                  {t(`${key}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
