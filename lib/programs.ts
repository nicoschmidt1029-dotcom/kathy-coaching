import type { Locale } from "@/i18n/routing";

export type ProgramLocaleContent = {
  title: string;
  intro?: string;
  targetHeading: string;
  targetAudience: readonly string[];
  transition: string;
  includesHeading: string;
  includes: readonly string[];
  howHeading?: string;
  howSteps?: readonly string[];
  howClosing?: string;
  duration: string;
  ctaLabel?: string;
  ctaHref?: string;
  paymentOptions?: readonly string[];
  paragraphs?: readonly string[];
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export type Program = {
  slug: string;
  label: string;
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
    label: "Program A",
    image: "/images/kathy/kathy-14-programs-stretch.jpg",
    imageAlt: "Katarina stretching on a light-blue running track",
    price: 1290,
    currency: "CHF",
    content: {
      en: {
        title: "The Full Transformation",
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
        howHeading: "How it works:",
        howSteps: [
          "You reach out through the contact form or we meet in person, and we schedule a free consultation to see if weŕe a good fit.",
          "The first consultation, whenever possible, takes place in person, though a video call is also an option if distance makes it easier.",
          "During the consultation, I will share a bit more detail on how the program works, then I gather information about your goals, your current lifestyle, health, activity level, eating habits, food preferences, daily schedule and more.",
          "After the consultation, you have three days to decide if the program feels right. And you are ready to take your life and health to the next level. After this three day I will reach out to check in on your decision.",
          "Onec you've made your decision, you´ll have another three days to pay. You can pay in full for the best price, or split into 2-3 parts, with a small increase to the total for the flexibility.",
          "During these same three days, I´ll ask you to write down everything you eat and drink, along with the time, and send it to me by email. The more I know about your habits, the better I understand you, and the more affective I can make your program. Together, we can be successful in reaching your goals.",
          "Once I´ve received your payment and your food and drink notes, I´ll take seven to ten days to carefully build your complete personalized program, designed especially for you.",
        ],
        howClosing: "And then we are ready to start.",
        duration: "90 days",
        paymentOptions: [
          "Pay in Full, 1,290.",
          "2 Payments, 700 per month, 1,400 total.",
          "3 Payments, 480 per month, 1,440 total.",
        ],
      },
      sk: {
        title: "Kompletná premena",
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
        howHeading: "Takto to funguje:",
        howSteps: [
          "Kontaktuješ ma prostredníctvom kontaktného formulára alebo sme sa stretli osobne a dohodli si bezplatnú konzultáciu, po ktorej sa sám rozhodneš, či chceš pokračovať.",
          "Prvá konzultácia, keď je to možné, prebieha osobne, alebo prostredníctvom videohovoru - záleží na okolnostiach.",
          "Počas konzultácie sa s vami podelím o trochu viac podrobností o tom, ako program funguje, a potom zhromaždím informácie o vašich cieľoch, vašom súčasnom životnom štýle, zdraví, úrovni aktivity, stravovacích návykoch, preferenciách v jedle, dennom rozvrhu a ďalších informáciách.",
          "Po konzultácii máte tri dni na to, aby ste sa rozhodli, či vám program vyhovuje. A či ste pripravení posunúť svoj život a zdravie na vyššiu úroveň. Po týchto troch dňoch ťa budem kontaktovať, aby som sa informovala o vašom rozhodnutí.",
          "Keď sa rozhodnete pokračovať, budete mať ďalšie tri dni na zaplatenie. Môžete zaplatiť celú sumu za najlepšiu cenu alebo ju rozdeliť na dve až tri časti s malým navýšením, v prípade že máš záujem o väčšiu flexibilitu.",
          "Počas týchto troch dní vás požiadam, aby ste si zapísali všetko, čo jete a pijete, spolu s časom, a poslali mi to e-mailom. Čím viac budem vedieť o vašich zvykoch, tým lepšie vám rozumiem a tým efektívnejšie môžem vytvoriť váš program. A Spoločne môžeme byť úspešnejší v dosahovaní vašich cieľov.",
          "Keď dostanem vašu platbu a vaše poznámky o jedle a nápojoch, budem sedem až desať dní starostlivo zostavovať váš kompletný personalizovaný program, navrhnutý špeciálne pre vás.",
        ],
        howClosing: "A potom sme pripravení začať.",
        duration: "90 dní",
        paymentOptions: [
          "Pay in Full, 1,290.",
          "2 Payments, 700 per month, 1,400 total.",
          "3 Payments, 480 per month, 1,440 total.",
        ],
      },
    },
  },
  {
    slug: "move-and-grow",
    label: "Program B",
    image: "",
    imageAlt: "",
    price: 200,
    currency: "CH",
    content: {
      en: {
        title: "Move and Grow",
        targetHeading: "This program is for:",
        targetAudience: [
          "For people who just need help with workouts.",
          "Those who already eat right.",
          "For those who already have a Nutritional Advisor and just need training to transform their physique.",
          "For those who've already built a solid foundation in nutrition and mindset and are ready to focus with me purely on training.",
        ],
        transition: "",
        includesHeading: "This program includes:",
        includes: [
          "A personalized training plan tailored to your goals and equipment.",
          "Weekly check-ins, progress tracking, and adjustments or changes to your training - as needed.",
          "We'll look at your progress together. You and I will slowly challenge you to keep moving forward.",
        ],
        duration: "month",
      },
      sk: {
        title: "Move and Grow",
        targetHeading: "Tento program je pre:",
        targetAudience: [
          "Pre ľudí ktorí potrebujú pomoc len s workout.",
          "Tí ktorí sa už stravujú správne.",
          "Pre tých ktorí už majú Nutričného poradcu a potrebujú len trénink na premenu postavy.",
          "For those who've already built a solid foundation in nutrition and mindset and are ready to focus purely on training.",
        ],
        transition: "",
        includesHeading: "Tento program zahŕňa:",
        includes: [
          "Personalizovaný tréningový plán zostavený podľa vašich cieľov a vybavenia.",
          "Týždenné kontroly, sledovanie pokroku, úprava alebo zmena tréningu - podľa potreby.",
          "Spolu sa pozrieme na tvoje napredovanie. Ty a ja ťa budeme pomali vyzývať k neustálemu napredovaniu.",
        ],
        duration: "mesiac",
      },
    },
  },
  {
    slug: "find-your-way-through",
    label: "Program C",
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
