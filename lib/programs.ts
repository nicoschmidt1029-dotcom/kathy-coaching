import type { Locale } from "@/i18n/routing";

export type ProgramLocaleContent = {
  title: string;
  targetHeading: string;
  targetAudience: readonly string[];
  transition: string;
  includesHeading: string;
  includes: readonly string[];
  duration: string;
};

export type Program = {
  slug: string;
  image: string;
  imageAlt: string;
  price: number;
  currency: "CHF";
  content: Partial<Record<Locale, ProgramLocaleContent>> & {
    en: ProgramLocaleContent;
  };
};

export type LocalizedProgram = Omit<Program, "content"> & ProgramLocaleContent;

export const PROGRAMS: readonly Program[] = [
  {
    slug: "personalised-online-fitness-coaching-90-days",
    image: "/images/kathy/kathy-14-programs-stretch.jpg",
    imageAlt: "Katarina stretching on a light-blue running track",
    price: 1290,
    currency: "CHF",
    content: {
      en: {
        title: "Personalised Online Fitness Coaching – 90 Days",
        targetHeading: "This program is for:",
        targetAudience: [
          "You don't have the time or interest to go to the gym.",
          "You're not sure what, when, and how much you can eat to achieve your goals.",
          "You're committed to positive change.",
          "You want to build muscle, lose weight, or become more flexible.",
          "You want to gain healthy self-confidence.",
          "You've said to yourself, \"Enough, I'm going to start doing something with myself now!\"",
        ],
        transition: "Then this program is for you.",
        includesHeading: "This program includes:",
        includes: [
          "First consultation (approx. 60 min.)",
          "Personalised training program + video demonstrations",
          "Creating a diet designed to achieve your goals",
          "Weekly check-ins to track your progress, including adjustment or changes to your training (approx. 45 min.)",
          "Possibility of written communication via WhatsApp in case of questions during the duration of the program.",
        ],
        duration: "90 days",
      },
      sk: {
        title: "Personalizovaný online fitness koučing – 90 dní",
        targetHeading: "Tento program je pre:",
        targetAudience: [
          "Nemáš čas alebo záujem chodiť do fitka.",
          "Nie si si istý, čo, kedy a koľko môžeš jesť, aby si dosiahol svoje ciele.",
          "Si odhodlaný k pozitívnej zmene.",
          "Chceš budovať svalovú hmotu, schudnúť alebo sa stať ohybnejším.",
          "Chceš nadobudnúť zdravé sebavedomie.",
          "Povedal si si: „Dosť, teraz začnem so sebou niečo robiť!“",
        ],
        transition: "Tak potom tento program je pre teba.",
        includesHeading: "Tento program zahŕňa:",
        includes: [
          "Prvá konzultácia (cca 60 min.)",
          "Personalizovaný tréningový program + video ukážky",
          "Vytvorenie jedálnička navrhnutého na dosiahnutie vašich cieľov",
          "Týždenné kontroly na sledovanie vášho pokroku – úprava alebo zmena tréningu (cca 45 min.)",
          "Možnosť písomnej komunikácie cez WhatsApp v prípade otázok počas trvania programu.",
        ],
        duration: "90 dní",
      },
    },
  },
];

export function localizeProgram(program: Program, locale: Locale): LocalizedProgram {
  return { ...program, ...(program.content[locale] ?? program.content.en) };
}

export function getPrograms(locale: Locale): LocalizedProgram[] {
  return PROGRAMS.map((program) => localizeProgram(program, locale));
}

export function getProgram(slug: string, locale: Locale) {
  const program = PROGRAMS.find((item) => item.slug === slug);
  return program ? localizeProgram(program, locale) : undefined;
}
