import type { Locale } from "@/i18n/routing";

export type ProgramLocaleContent = {
  title: string;
  intro?: string;
  targetHeading: string;
  targetAudience: readonly string[];
  transition: string;
  includesHeading: string;
  includes: readonly string[];
  duration: string;
  ctaLabel?: string;
  ctaHref?: string;
  paragraphs?: readonly string[];
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export type Program = {
  slug: string;
  image: string;
  imageAlt: string;
  price: number;
  currency: string;
  kind?: "coaching" | "conversation";
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
        title: "Personalised Online Fitness Coaching – 3 Months",
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
        duration: "3 months",
      },
      sk: {
        title: "Personalizovaný online fitness koučing – 3 mesiace",
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
        duration: "3 mesiace",
      },
    },
  },
  {
    slug: "find-your-way-through",
    image: "",
    imageAlt: "",
    price: 0,
    currency: "",
    kind: "conversation",
    content: {
      en: {
        title: "Find Your Way Through",
        intro: "Pain, shame, sin, your past, hatred, abuse, curses, mistakes, distrust, doubts, self-doubt",
        targetHeading: "",
        targetAudience: [],
        transition: "",
        includesHeading: "",
        includes: [],
        duration: "",
        paragraphs: [
          "Sometimes it's new but sometimes we live with it for so long that we've kind of accepted it even though we don't have to.",
          "It happened - no one can change that.",
          "But what we can do is separate it completely from our person. It doesn't have to have any impact on us in the future. Whether it happened yesterday or forty years ago. You don't need to live with this anymore. Only one thing is needed, you have to really want it.",
          "In this one-on-one conversation, we sit down together and talk honestly about what you're facing.",
          "We will look together at every struggle through a biblical lens, not my opinion, not the world's opinion, no doctor's opinion, but what God says about your situation.",
          "There are wounds only God can reach, and there is pain only God can heal.",
        ],
        ctaLabel: "Reach Out to Me",
        ctaHref: "/kontakt",
        secondaryCtaLabel: "Learn more",
        secondaryCtaHref: "/programme/find-your-way-through",
      },
      sk: {
        title: "Find Your Way Through",
        intro: "Bolesť, hanba, hriech, tvoja minulosť, nenávisť, zneužitie, prekliatia, chyby, nedôvera, pochybnosti, nesebavedomie",
        targetHeading: "",
        targetAudience: [],
        transition: "",
        includesHeading: "",
        includes: [],
        duration: "",
        paragraphs: [
          "Niekedy ide nové ale niekedy s tým žijeme tak dlho, že sme to akosi akceptovali napriek tomu, že nemusíme.",
          "Stalo sa - to nikto už nezmení.",
          "Ale čo môžeme je oddeliť to kompletne od našej osoby. Nemusí to mať na nás žiaden vplyv v budúcnosti. Či sa to stalo včera, alebo štyrydsať rokov do zadu. You don't need to live with this anymore. Len jedna vec je potrebná, mušíš veľmi chcieť.",
          "In this one-on-one conversation, we sit down together and talk honestly about what you're facing.",
          "We will look together at every struggle through a biblical lens, not my opinion, not the world's opinion, žiaden názor doktora, but čo hovorí God says about your situacion.",
          "Sú rany, ku ktorým sa môže dostať iba Boh, a existuje bolesť, ktorú môže uzdraviť iba Boh.",
        ],
        ctaLabel: "Reach Out to Me",
        ctaHref: "/kontakt",
        secondaryCtaLabel: "Learn more",
        secondaryCtaHref: "/programme/find-your-way-through",
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
