"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const PARAGRAPHS = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;

export function HomeIntro() {
  const t = useTranslations("homeIntro");
  const hero = useTranslations("hero");
  const sectionRef = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.02 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad overflow-hidden bg-[var(--sand)]/35 pt-8 sm:pt-10">
      <div className="container-page">
        <div className="mx-auto max-w-3xl space-y-7 text-pretty text-center sm:space-y-8">
          {PARAGRAPHS.map((key, index) => (
            <p
              key={key}
              className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} ${index === 0 ? "text-[1.08rem] font-medium leading-[1.8] text-[var(--plum)] sm:text-xl" : "text-base leading-[1.8] text-foreground/72 sm:text-lg"}`}
              style={{ transitionDelay: visible ? `${index * 110}ms` : "0ms" }}
            >
              {t(key)}
            </p>
          ))}
          <div className={`pt-8 transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`} style={{ transitionDelay: visible ? `${(PARAGRAPHS.length + 1) * 110}ms` : "0ms" }}>
            <p className="text-lg font-medium leading-[1.7] text-foreground/80 sm:text-xl">{t("meetKateyLine")}</p>
            <Button asChild size="lg" className="mt-4 h-12 bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] ring-1 ring-[var(--primary-foreground)]/15 hover:bg-[var(--plum)]/90">
              <Link href="/katey">{t("meetKatey")}</Link>
            </Button>
          </div>
          <div className={`pt-2 transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`} style={{ transitionDelay: visible ? `${(PARAGRAPHS.length + 2) * 110}ms` : "0ms" }}>
            <Button asChild size="lg" className="group/button h-14 w-full bg-[var(--plum)] px-7 text-[0.95rem] text-[var(--primary-foreground)] ring-1 ring-[var(--primary-foreground)]/15 hover:bg-[var(--plum)]/90 sm:h-12 sm:w-auto">
              <Link href="/programme">{hero("shortCta")}<ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
