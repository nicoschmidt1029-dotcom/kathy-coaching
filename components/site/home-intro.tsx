"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

const PARAGRAPHS = ["p1", "p2", "p3", "p4", "p5"] as const;

export function HomeIntro() {
  const t = useTranslations("homeIntro");
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
    }, { rootMargin: "0px 0px -12%", threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad overflow-hidden bg-[var(--sand)]/35">
      <div className="container-page">
        <div className="mx-auto max-w-3xl space-y-7 text-pretty text-center sm:space-y-8">
          {PARAGRAPHS.map((key, index) => (
            <p
              key={key}
              className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} ${index === 0 ? "font-display text-[1.8rem] leading-snug text-[var(--plum)] sm:text-[2.25rem]" : "text-base leading-[1.8] text-foreground/72 sm:text-lg"}`}
              style={{ transitionDelay: visible ? `${index * 110}ms` : "0ms" }}
            >
              {t(key)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
