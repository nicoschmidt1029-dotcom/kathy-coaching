import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DisplayTitle } from "./display-title";

const FAQ_KEYS = ["believer", "women", "how", "gym", "beginner"] as const;

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="bg-[var(--petrol-tint)] section-pad">
      <div className="container-page">
        {/* Head across the full width. Beside the accordion, the display
            title had four columns to live in and broke every other word. */}
        <p className="eyebrow">{t("eyebrow")}</p>
        <DisplayTitle className="mt-6 max-w-[16ch]">{t("title")}</DisplayTitle>
        <p className="section-lede">{t("intro")}</p>

        <div className="mt-14">
          <Accordion
            type="single"
            collapsible
            className="border-t border-foreground/10"
          >
            {FAQ_KEYS.map((key) => (
              <AccordionItem
                key={key}
                value={key}
                className="group border-b border-foreground/10"
              >
                <AccordionTrigger className="py-7 font-display text-[1.3rem] font-normal text-foreground transition-colors hover:text-[var(--plum)] hover:no-underline sm:text-[1.55rem] **:data-[slot=accordion-trigger-icon]:text-[var(--clay)] **:data-[slot=accordion-trigger-icon]:size-5">
                  {t(`${key}.q`)}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-7 text-[1.02rem] leading-[1.75] text-foreground/72">
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
