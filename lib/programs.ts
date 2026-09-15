import type { Locale } from "@/i18n/routing";

export type ProgramLocaleContent = {
  title: string;
  imageAlt?: string;
  intro?: string;
  targetHeading: string;
  targetAudience: readonly string[];
  transition: string;
  includesHeading: string;
  includes: readonly string[];
  includesDetails?: readonly string[];
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
          "Weekly check-ins (15 to 45 min.)",
          "Personalised training program + video demonstrations",
          "Diet plan",
          "WhatsApp support",
          "Healthy eating support",
        ],
        includesDetails: [
          "Online via video call, using whichever platform works best for you, we'll talk through your goals, your current lifestyle, and what's been holding you back.",
          "To track your progress and make any adjustments to your training if needed.",
          "Your personalised training program, delivered through video demonstrations, updated weekly whenever adjustments are needed.",
          "A diet plan created specifically for you, tailored to your body, your goals, your lifestyle, your food preferences, and any dietary restrictions or health considerations you'd like to factor in. What works for you in week one may need to change by week six, so I will adjust it with you as your body and your progress evolve.",
          "Ongoing support via WhatsApp, so you can reach out with any questions throughout the program.",
          "Along the way, I will share healthy eating ideas, tips, and recipes, sometimes with videos where I demonstrate things myself, to help make your new habits easier and more enjoyable.",
        ],
        howHeading: "How it works:",
        howSteps: [
          "You reach out through the contact form, and we schedule the first consultation to see if we're a good fit.",
          "The first consultation takes place online via video call, using whichever platform works best for you.",
          "During the consultation, I will share a bit more detail on how the program works, then I gather information about your goals, your current lifestyle, health, activity level, eating habits, food preferences, daily schedule and more.",
          "After the consultation, you have three days to decide whether the program feels right and whether you are ready to take your life and health to the next level. After those three days, I will reach out to ask about your decision.",
          "Once you've made your decision, you'll have another three days to pay. You can pay in full for the best price, or split into 2–3 parts, with a small increase to the total for the flexibility.",
          "During these same three days, I'll ask you to write down everything you eat and drink, along with the time, and send it to me by email. The more I know about your habits, the better I understand you, and the more effective I can make your program. Together, we can work successfully towards your goals.",
          "Once I've received your payment and your food and drink notes, I'll take seven to ten days to carefully build your complete personalised program, designed especially for you.",
        ],
        howClosing: "And then we are ready to start.",
        duration: "90 days",
        paymentOptions: [
          "Pay in full — CHF 1,290",
          "2 monthly payments — CHF 700 each, CHF 1,400 total",
          "3 monthly payments — CHF 480 each, CHF 1,440 total",
        ],
      },
      de: {
        title: "The Full Transformation",
        imageAlt: "Katarina beim Dehnen auf einer hellblauen Laufbahn",
        targetHeading: "Dieses Programm ist für dich, wenn:",
        targetAudience: [
          "du keine Zeit oder kein Interesse hast, ins Fitnessstudio zu gehen.",
          "du unsicher bist, was, wann und wie viel du essen kannst, um deine Ziele zu erreichen.",
          "du dich für eine positive Veränderung entschieden hast.",
          "du Muskeln aufbauen, Gewicht verlieren oder beweglicher werden möchtest.",
          "du ein gesundes Selbstvertrauen entwickeln möchtest.",
          "du dir gesagt hast: „Genug – jetzt beginne ich, etwas für mich zu tun!“",
        ],
        transition: "Dann ist dieses Programm für dich.",
        includesHeading: "Das Programm beinhaltet:",
        includes: [
          "Erstberatung (ca. 60 Min.)",
          "Wöchentliche Check-ins (15 bis 45 Min.)",
          "Persönlicher Trainingsplan mit Video-Demonstrationen",
          "Ernährungsplan",
          "WhatsApp-Begleitung",
          "Unterstützung bei gesunder Ernährung",
        ],
        includesDetails: [
          "Online per Videoanruf über die Plattform, die für dich am besten funktioniert. Wir sprechen über deine Ziele, deinen aktuellen Lebensstil und darüber, was dich bisher zurückgehalten hat.",
          "Wir verfolgen deine Fortschritte und passen dein Training bei Bedarf an.",
          "Dein persönlicher Trainingsplan wird mit Video-Demonstrationen vermittelt und bei Bedarf wöchentlich angepasst.",
          "Ein Ernährungsplan, der speziell auf deinen Körper, deine Ziele, deinen Alltag, deine Vorlieben beim Essen und mögliche Einschränkungen oder gesundheitliche Aspekte abgestimmt ist, die du berücksichtigen möchtest. Was in der ersten Woche funktioniert, muss vielleicht in der sechsten Woche angepasst werden. Deshalb passe ich den Plan gemeinsam mit dir an, wenn sich dein Körper und deine Fortschritte verändern.",
          "Während des gesamten Programms kannst du dich bei Fragen über WhatsApp an mich wenden.",
          "Unterwegs teile ich Ideen, Tipps und Rezepte für gesunde Ernährung mit dir – manchmal auch in Videos, in denen ich selbst etwas zeige. So werden neue Gewohnheiten leichter und angenehmer.",
        ],
        howHeading: "So funktioniert es:",
        howSteps: [
          "Du meldest dich über das Kontaktformular. Danach vereinbaren wir die Erstberatung, um herauszufinden, ob wir zusammenpassen.",
          "Die Erstberatung findet online per Videoanruf über die Plattform statt, die für dich am besten funktioniert.",
          "Ich erkläre dir den Ablauf und erfasse deine Ziele, deinen Alltag, deine Gesundheit, dein Aktivitätsniveau, deine Essgewohnheiten, Vorlieben und deinen Tagesrhythmus.",
          "Nach der Beratung hast du drei Tage Zeit, um zu entscheiden, ob das Programm zu dir passt. Danach frage ich bei dir nach.",
          "Nach deiner Zusage hast du weitere drei Tage für die Zahlung. Du kannst den günstigsten Gesamtpreis vollständig bezahlen oder den Betrag gegen einen kleinen Aufpreis auf zwei oder drei Monatsraten verteilen.",
          "In denselben drei Tagen notierst du alles, was du isst und trinkst, jeweils mit Uhrzeit, und sendest es mir per E-Mail. Je besser ich deine Gewohnheiten kenne, desto genauer kann ich dein Programm gestalten.",
          "Sobald Zahlung und Ernährungsnotizen eingegangen sind, nehme ich mir sieben bis zehn Tage Zeit, um dein persönliches Gesamtprogramm sorgfältig auszuarbeiten.",
        ],
        howClosing: "Danach können wir starten.",
        duration: "90 Tage",
        paymentOptions: [
          "Vollständige Zahlung — CHF 1.290",
          "2 Monatsraten — je CHF 700, insgesamt CHF 1.400",
          "3 Monatsraten — je CHF 480, insgesamt CHF 1.440",
        ],
      },
      sk: {
        title: "Kompletná premena",
        imageAlt: "Katarina sa naťahuje na svetlomodrej bežeckej dráhe",
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
          "Týždenné konzultácie (15 až 45 min.)",
          "Personalizovaný tréningový program + video ukážky",
          "Stravovací plán",
          "Podpora cez WhatsApp",
          "Podpora zdravého stravovania",
        ],
        includesDetails: [
          "Online prostredníctvom videohovoru na platforme, ktorá ti najviac vyhovuje. Porozprávame sa o tvojich cieľoch, súčasnom životnom štýle a o tom, čo ťa doteraz brzdilo.",
          "Budeme sledovať tvoj pokrok a podľa potreby upravovať tréning.",
          "Tvoj personalizovaný tréningový program dostaneš spolu s video ukážkami. Ak budú potrebné úpravy, program budem každý týždeň aktualizovať.",
          "Stravovací plán vytvorený špeciálne pre teba, prispôsobený tvojmu telu, cieľom, životnému štýlu, obľúbeným jedlám a akýmkoľvek stravovacím obmedzeniam či zdravotným okolnostiam, ktoré chceš zohľadniť. To, čo funguje v prvom týždni, sa možno bude musieť do šiesteho týždňa zmeniť. Preto ho spolu upravíme podľa toho, ako sa bude vyvíjať tvoje telo a pokrok.",
          "Počas celého programu sa na mňa môžeš obrátiť cez WhatsApp s akýmikoľvek otázkami.",
          "Postupne sa s tebou podelím o nápady, tipy a recepty na zdravé stravovanie, niekedy aj vo videách, kde veci sama ukážem. Pomôže ti to vytvárať nové návyky ľahšie a príjemnejšie.",
        ],
        howHeading: "Takto to funguje:",
        howSteps: [
          "Kontaktuješ ma prostredníctvom kontaktného formulára a dohodneme si prvú konzultáciu, aby sme zistili, či nám spolupráca vyhovuje.",
          "Prvá konzultácia prebieha online prostredníctvom videohovoru na platforme, ktorá ti najviac vyhovuje.",
          "Počas konzultácie sa s vami podelím o trochu viac podrobností o tom, ako program funguje, a potom zhromaždím informácie o vašich cieľoch, vašom súčasnom životnom štýle, zdraví, úrovni aktivity, stravovacích návykoch, preferenciách v jedle, dennom rozvrhu a ďalších informáciách.",
          "Po konzultácii máte tri dni na to, aby ste sa rozhodli, či vám program vyhovuje. A či ste pripravení posunúť svoj život a zdravie na vyššiu úroveň. Po týchto troch dňoch ťa budem kontaktovať, aby som sa informovala o vašom rozhodnutí.",
          "Keď sa rozhodnete pokračovať, budete mať ďalšie tri dni na zaplatenie. Môžete zaplatiť celú sumu za najlepšiu cenu alebo ju rozdeliť na dve až tri časti s malým navýšením, v prípade že máš záujem o väčšiu flexibilitu.",
          "Počas týchto troch dní vás požiadam, aby ste si zapísali všetko, čo jete a pijete, spolu s časom, a poslali mi to e-mailom. Čím viac budem vedieť o vašich zvykoch, tým lepšie vám rozumiem a tým efektívnejšie môžem vytvoriť váš program. A Spoločne môžeme byť úspešnejší v dosahovaní vašich cieľov.",
          "Keď dostanem vašu platbu a vaše poznámky o jedle a nápojoch, budem sedem až desať dní starostlivo zostavovať váš kompletný personalizovaný program, navrhnutý špeciálne pre vás.",
        ],
        howClosing: "A potom sme pripravení začať.",
        duration: "90 dní",
        paymentOptions: [
          "Platba v plnej výške — 1 290 CHF",
          "2 mesačné splátky — každá 700 CHF, spolu 1 400 CHF",
          "3 mesačné splátky — každá 480 CHF, spolu 1 440 CHF",
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
    currency: "CHF",
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
        paymentOptions: ["200 CHF per month"],
      },
      de: {
        title: "Move and Grow",
        targetHeading: "Dieses Programm ist für:",
        targetAudience: [
          "Menschen, die vor allem Unterstützung beim Training benötigen.",
          "Menschen, die sich bereits ausgewogen ernähren.",
          "Menschen, die schon eine Ernährungsberatung haben und gezieltes Training für ihre körperliche Veränderung suchen.",
          "Menschen mit einer guten Grundlage in Ernährung und Denkweise, die sich mit mir ganz auf ihr Training konzentrieren möchten.",
        ],
        transition: "",
        includesHeading: "Das Programm beinhaltet:",
        includes: [
          "Einen persönlichen Trainingsplan, abgestimmt auf deine Ziele und deine verfügbare Ausrüstung.",
          "Wöchentliche Check-ins, Fortschrittskontrolle und bedarfsgerechte Anpassungen deines Trainings.",
          "Wir betrachten deine Fortschritte gemeinsam und setzen Schritt für Schritt neue, erreichbare Trainingsreize.",
        ],
        duration: "pro Monat",
        paymentOptions: ["CHF 200 pro Monat"],
      },
      sk: {
        title: "Move and Grow",
        targetHeading: "Tento program je pre:",
        targetAudience: [
          "Pre ľudí, ktorí potrebujú pomoc najmä s cvičením.",
          "Pre tých, ktorí sa už stravujú správne.",
          "Pre tých, ktorí už majú výživového poradcu a potrebujú tréning na premenu postavy.",
          "Pre tých, ktorí už majú pevné základy vo výžive a myslení a chcú sa so mnou sústrediť výlučne na tréning.",
        ],
        transition: "",
        includesHeading: "Tento program zahŕňa:",
        includes: [
          "Personalizovaný tréningový plán zostavený podľa vašich cieľov a vybavenia.",
          "Týždenné kontroly, sledovanie pokroku a úpravy tréningu podľa potreby.",
          "Spoločne sa pozrieme na tvoj pokrok a postupne budeme pridávať nové výzvy, aby si sa posúval ďalej.",
        ],
        duration: "mesiac",
        paymentOptions: ["200 CHF mesačne"],
      },
    },
  },
  {
    slug: "find-your-way-through",
    label: "Program C",
    image: "",
    imageAlt: "",
    price: 80,
    currency: "CHF",
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
        duration: "per hour",
        paragraphs: [
          "Sometimes it's new but sometimes we live with it for so long that we've kind of accepted it even though we don't have to.",
          "It happened - no one can change that.",
          "But what we can do is separate it completely from our person. It doesn't have to have any impact on us in the future. Whether it happened yesterday or forty years ago. You don't need to live with this anymore. Only one thing is needed, you have to really want it.",
          "In this one-on-one conversation, we sit down together and talk honestly about what you're facing.",
          "We will look together at every struggle through a biblical lens, not my opinion, not the world's opinion, no doctor's opinion, but what God says about your situation.",
          "There are wounds only God can reach, and there is pain only God can heal.",
        ],
        ctaLabel: "Book and pay",
        ctaHref: "/kontakt",
        secondaryCtaLabel: "Learn more",
        secondaryCtaHref: "/programme/find-your-way-through",
      },
      de: {
        title: "Find Your Way Through",
        intro: "Schmerz, Scham, Sünde, deine Vergangenheit, Hass, Missbrauch, Flüche, Fehler, Misstrauen, Zweifel und Selbstzweifel",
        targetHeading: "",
        targetAudience: [],
        transition: "",
        includesHeading: "",
        includes: [],
        duration: "pro Stunde",
        paragraphs: [
          "Manches ist neu. Mit anderem leben wir schon so lange, dass wir es beinahe akzeptiert haben – obwohl wir das nicht müssen.",
          "Es ist geschehen – das kann niemand ändern.",
          "Aber wir können es vollständig von unserer Person trennen. Es muss unsere Zukunft nicht bestimmen – egal, ob es gestern oder vor vierzig Jahren geschehen ist. Du musst nicht weiter damit leben. Entscheidend ist, dass du Veränderung wirklich möchtest.",
          "In diesem persönlichen Gespräch setzen wir uns zusammen und sprechen ehrlich über das, womit du gerade konfrontiert bist.",
          "Wir betrachten deine Situation gemeinsam aus einer biblischen Perspektive: nicht nach meiner Meinung oder der Meinung der Welt, sondern danach, was Gott über deine Situation sagt.",
          "Es gibt Wunden, die nur Gott erreichen kann, und Schmerzen, die nur Gott heilen kann.",
        ],
        ctaLabel: "Buchen und bezahlen",
        ctaHref: "/kontakt",
        secondaryCtaLabel: "Mehr erfahren",
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
        duration: "za hodinu",
        paragraphs: [
          "Niekedy je to nové, inokedy s tým žijeme tak dlho, že sme to akosi prijali, hoci nemusíme.",
          "Stalo sa to – a to už nikto nezmení.",
          "Môžeme to však úplne oddeliť od toho, kým sme. Nemusí to ovplyvňovať našu budúcnosť, či sa to stalo včera, alebo pred štyridsiatimi rokmi. Už s tým nemusíš žiť. Potrebné je jediné: skutočne chcieť zmenu.",
          "V tomto osobnom rozhovore si spolu sadneme a úprimne sa porozprávame o tom, čomu čelíš.",
          "Na každý zápas sa spolu pozrieme cez biblickú perspektívu – nie podľa môjho názoru ani názoru sveta, ale podľa toho, čo o tvojej situácii hovorí Boh.",
          "Sú rany, ku ktorým sa môže dostať iba Boh, a existuje bolesť, ktorú môže uzdraviť iba Boh.",
        ],
        ctaLabel: "Rezervovať a zaplatiť",
        ctaHref: "/kontakt",
        secondaryCtaLabel: "Zistiť viac",
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
