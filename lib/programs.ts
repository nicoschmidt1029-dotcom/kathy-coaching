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
    image: "/images/kathy/kathy-14-programs-stretch-original-no-fence.png",
    imageAlt: "Katarina doing a wide-legged stretch on an outdoor sports court",
    price: 1290,
    currency: "CHF",
    content: {
      en: {
        title: "The Full Transformation",
        intro: "Imagine waking up with energy, excited to live. Feeling strong and confident in your own skin. Whatever your goal, we will get there together.\n\nYou are in charge of your body, and with the right training, nutrition and mindset, we can achieve amazing things.\n\nFrom our first consultation, I will create a training plan for you, for home or gym, whichever you decide. I will also create an eating plan made just for you, adapted throughout the programme in the way that works best for you and your goals.\n\nThis is not something that simply ends after three months. It is a beginning. I will teach you how to keep what we build together, so this becomes the beginning of a new season in your life.",
        targetHeading: "This program is for:",
        targetAudience: [
          "You'd rather train at home than go to the gym.",
          "You're not sure what, when, and how much to eat to achieve your goals.",
          "You're ready to commit to positive change.",
          "You want to build muscle, lose weight, or become more flexible.",
          "You want to gain healthy self-confidence.",
          "You've said to yourself, \"Enough, I'm going to start doing something with myself now!\"",
        ],
        transition: "Then this program is for you.",
        includesHeading: "This program includes:",
        includes: [
          "First Consultation (Approx. 90 Min.)",
          "Weekly Check-Ins (15 to 45 Min.)",
          "Personalised Training Program with Video Demonstrations",
          "Diet Plan",
          "WhatsApp Support",
          "Healthy Eating Support",
          "Train From Home - No Gym Needed.",
          "Bonus: Grocery Shopping",
        ],
        includesDetails: [
          "Online via video call, using whichever platform works best for you, we'll talk through your goals, your current lifestyle, and what's been holding you back.",
          "To track your progress and make any adjustments to your training if needed.",
          "Your personalised training program, delivered through video demonstrations, updated weekly whenever adjustments are needed.",
          "A diet plan created specifically for you, tailored to your body, your goals, your lifestyle, your food preferences, and any dietary restrictions or health considerations you'd like to factor in. What works for you in week one may need to change by week six, so I'll adjust it with you as your body and your progress evolve.",
          "Ongoing support via WhatsApp, so you can reach out with any questions throughout the program.",
          "Along the way, I'll share healthy eating ideas, tips, and recipes, sometimes with videos where I demonstrate things myself, to help make your new habits easier and more enjoyable.",
          "I'll show you exactly how to lose weight and which simple equipment is enough to get strong and build and maintain muscle. You'll get real results right from your living room, without needing to go to the gym.",
          "As a bonus, I offer the option to go grocery shopping with you in person for about one hour, so I can show you exactly what to look for and how to shop for your new healthy lifestyle.",
        ],
        howHeading: "How it works:",
        howSteps: [
          "You reach out through the contact form, and we schedule the first consultation to see if we're a good fit.",
          "The first consultation can take place in person; if that is not possible, it takes place online via video call, using whichever platform works best for you.",
          "During the consultation, I'll share a bit more detail on how the program works, then I'll gather information about your goals, your current lifestyle, health, activity level, eating habits, food preferences, daily schedule and more.",
          "After the consultation, you have three days to decide whether the program feels right and whether you're ready to take your life and health to the next level. After those three days, I'll reach out to ask about your decision.",
          "Once you've made your decision, you'll have another three days to pay. You can pay in full for the best price, or split into 2–3 parts, with a small increase to the total for the flexibility.",
          "During these same three days, I'll ask you to write down everything you eat and drink, along with the time, and send it to me by email. The more I know about your habits, the better I understand you, and the more effective I can make your program. Together, we can work successfully towards your goals.",
          "Once I've received your payment and your food and drink notes, I'll take seven to ten days to create your starting program, tailored to you. After that, I will keep adjusting and developing your program throughout the coaching, based on your progress, needs, and how your body responds.",
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
        intro: "Stell dir vor, du wachst voller Energie auf und freust dich auf dein Leben. Du fühlst dich stark und selbstbewusst in deinem eigenen Körper. Was auch immer dein Ziel ist – wir erreichen es gemeinsam.\n\nDu hast deinen Körper selbst in der Hand. Mit dem richtigen Training, der passenden Ernährung und der richtigen Einstellung können wir Großartiges erreichen.\n\nBei unserer Erstberatung erstelle ich einen Trainingsplan für dich – für zu Hause oder das Fitnessstudio, ganz wie du möchtest. Dazu kommt ein Ernährungsplan, der genau auf dich zugeschnitten und während der gesamten Programmlaufzeit an deine Ziele und das angepasst wird, was für dich am besten funktioniert.\n\nDieses Programm endet nicht einfach nach drei Monaten. Es ist ein Anfang. Ich zeige dir, wie du das, was wir gemeinsam aufbauen, ein Leben lang beibehalten kannst – als Beginn einer neuen Lebensphase.",
        imageAlt: "Katarina beim Dehnen auf einer hellblauen Laufbahn",
        targetHeading: "Dieses Programm ist für dich, wenn:",
        targetAudience: [
          "du lieber zu Hause trainieren möchtest, als ins Fitnessstudio zu gehen.",
          "du unsicher bist, was, wann und wie viel du essen solltest, um deine Ziele zu erreichen.",
          "du bereit bist, dich für eine positive Veränderung zu entscheiden.",
          "du Muskeln aufbauen, Gewicht verlieren oder beweglicher werden möchtest.",
          "du ein gesundes Selbstvertrauen entwickeln möchtest.",
          "du dir gesagt hast: „Genug – jetzt beginne ich, etwas für mich zu tun!“",
        ],
        transition: "Dann ist dieses Programm für dich.",
        includesHeading: "Das Programm beinhaltet:",
        includes: [
          "Erstberatung (ca. 90 Min.)",
          "Wöchentliche Check-ins (15 bis 45 Min.)",
          "Persönlicher Trainingsplan mit Video-Demonstrationen",
          "Ernährungsplan",
          "WhatsApp-Begleitung",
          "Unterstützung bei gesunder Ernährung",
          "Training von zu Hause – kein Fitnessstudio nötig",
          "Bonus: Gemeinsamer Lebensmitteleinkauf",
        ],
        includesDetails: [
          "Online per Videoanruf über die Plattform, die für dich am besten funktioniert. Wir sprechen über deine Ziele, deinen aktuellen Lebensstil und darüber, was dich bisher zurückgehalten hat.",
          "Wir verfolgen deine Fortschritte und passen dein Training bei Bedarf an.",
          "Dein persönlicher Trainingsplan wird mit Video-Demonstrationen vermittelt und bei Bedarf wöchentlich angepasst.",
          "Ein Ernährungsplan, der speziell auf deinen Körper, deine Ziele, deinen Alltag, deine Vorlieben beim Essen und mögliche Einschränkungen oder gesundheitliche Aspekte abgestimmt ist, die du berücksichtigen möchtest. Was in der ersten Woche funktioniert, muss vielleicht in der sechsten Woche angepasst werden. Deshalb passe ich den Plan gemeinsam mit dir an, wenn sich dein Körper und deine Fortschritte verändern.",
          "Während des gesamten Programms kannst du dich bei Fragen über WhatsApp an mich wenden.",
          "Unterwegs teile ich Ideen, Tipps und Rezepte für gesunde Ernährung mit dir – manchmal auch in Videos, in denen ich selbst etwas zeige. So werden neue Gewohnheiten leichter und angenehmer.",
          "Ich zeige dir genau, wie du Gewicht verlierst und welche einfache Ausrüstung ausreicht, um stärker zu werden sowie Muskeln aufzubauen und zu erhalten. Du kannst direkt in deinem Wohnzimmer echte Ergebnisse erzielen, ohne ins Fitnessstudio gehen zu müssen.",
          "Als Bonus biete ich dir an, etwa eine Stunde lang persönlich mit dir Lebensmittel einzukaufen. Dabei zeige ich dir genau, worauf du achten kannst und wie du für deinen neuen gesunden Lebensstil einkaufst.",
        ],
        howHeading: "So funktioniert es:",
        howSteps: [
          "Du meldest dich über das Kontaktformular. Danach vereinbaren wir die Erstberatung, um herauszufinden, ob wir zusammenpassen.",
          "Die Erstberatung kann persönlich stattfinden. Wenn das nicht möglich ist, findet sie online per Videoanruf über die Plattform statt, die für dich am besten funktioniert.",
          "Ich erkläre dir den Ablauf und erfasse deine Ziele, deinen Alltag, deine Gesundheit, dein Aktivitätsniveau, deine Essgewohnheiten, Vorlieben und deinen Tagesrhythmus.",
          "Nach der Beratung hast du drei Tage Zeit, um zu entscheiden, ob das Programm zu dir passt. Danach frage ich bei dir nach.",
          "Nach deiner Zusage hast du weitere drei Tage für die Zahlung. Du kannst den günstigsten Gesamtpreis vollständig bezahlen oder den Betrag gegen einen kleinen Aufpreis auf zwei oder drei Monatsraten verteilen.",
          "In denselben drei Tagen notierst du alles, was du isst und trinkst, jeweils mit Uhrzeit, und sendest es mir per E-Mail. Je besser ich deine Gewohnheiten kenne, desto genauer kann ich dein Programm gestalten.",
          "Sobald deine Zahlung und deine Ernährungsnotizen eingegangen sind, nehme ich mir sieben bis zehn Tage Zeit, um dein Startprogramm zu erstellen, das genau auf dich zugeschnitten ist. Danach passe ich dein Programm während des Coachings laufend an – abhängig von deinen Fortschritten, deinen Bedürfnissen und der Reaktion deines Körpers.",
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
        intro: "Predstav si, že sa zobúdzaš plná energie a tešíš sa zo života. Cítiš sa silná a sebavedomá vo svojom tele. Nech je tvoj cieľ akýkoľvek, dosiahneme ho spolu.\n\nSvoje telo máš vo vlastných rukách. So správnym tréningom, výživou a nastavením mysle môžeme dosiahnuť úžasné veci.\n\nPočas prvej konzultácie ti vytvorím tréningový plán na doma alebo do posilňovne – podľa toho, čo si vyberieš. Vytvorím ti aj stravovací plán prispôsobený tebe, ktorý budeme počas programu upravovať podľa toho, čo najlepšie funguje pre tvoje ciele.\n\nTento program sa nekončí po troch mesiacoch. Je to začiatok. Naučím ťa, ako si udržať to, čo spolu vybudujeme, aby sa toto stalo začiatkom novej etapy tvojho života.",
        imageAlt: "Katarina sa naťahuje na svetlomodrej bežeckej dráhe",
        targetHeading: "Tento program je pre:",
        targetAudience: [
          "Radšej cvičíš doma, než by si chodil do posilňovne.",
          "Nie si si istý, čo, kedy a koľko jesť, aby si dosiahol svoje ciele.",
          "Si pripravený odhodlať sa k pozitívnej zmene.",
          "Chceš budovať svalovú hmotu, schudnúť alebo sa stať ohybnejším.",
          "Chceš nadobudnúť zdravé sebavedomie.",
          "Povedal si si: „Dosť, teraz začnem so sebou niečo robiť!“",
        ],
        transition: "Tak potom tento program je pre teba.",
        includesHeading: "Tento program zahŕňa:",
        includes: [
          "Prvá konzultácia (cca 90 min.)",
          "Týždenné konzultácie (15 až 45 min.)",
          "Personalizovaný tréningový program + video ukážky",
          "Stravovací plán",
          "Podpora cez WhatsApp",
          "Podpora zdravého stravovania",
          "Cvičenie z domu – bez posilňovne",
          "Bonus: Spoločný nákup potravín",
        ],
        includesDetails: [
          "Online prostredníctvom videohovoru na platforme, ktorá ti najviac vyhovuje. Porozprávame sa o tvojich cieľoch, súčasnom životnom štýle a o tom, čo ťa doteraz brzdilo.",
          "Budeme sledovať tvoj pokrok a podľa potreby upravovať tréning.",
          "Tvoj personalizovaný tréningový program dostaneš spolu s video ukážkami. Ak budú potrebné úpravy, program budem každý týždeň aktualizovať.",
          "Stravovací plán vytvorený špeciálne pre teba, prispôsobený tvojmu telu, cieľom, životnému štýlu, obľúbeným jedlám a akýmkoľvek stravovacím obmedzeniam či zdravotným okolnostiam, ktoré chceš zohľadniť. To, čo funguje v prvom týždni, sa možno bude musieť do šiesteho týždňa zmeniť. Preto ho spolu upravíme podľa toho, ako sa bude vyvíjať tvoje telo a pokrok.",
          "Počas celého programu sa na mňa môžeš obrátiť cez WhatsApp s akýmikoľvek otázkami.",
          "Postupne sa s tebou podelím o nápady, tipy a recepty na zdravé stravovanie, niekedy aj vo videách, kde veci sama ukážem. Pomôže ti to vytvárať nové návyky ľahšie a príjemnejšie.",
          "Ukážem ti presne, ako schudnúť a aké jednoduché vybavenie stačí na to, aby si zosilnel/a a vybudoval/a si a udržal/a svaly. Skutočné výsledky dosiahneš priamo vo svojej obývačke bez toho, aby si musel/a chodiť do posilňovne.",
          "Ako bonus ponúkam možnosť ísť s tebou osobne asi na hodinu nakupovať potraviny, aby som ti presne ukázala, na čo sa zamerať a ako nakupovať pre svoj nový zdravý životný štýl.",
        ],
        howHeading: "Takto to funguje:",
        howSteps: [
          "Kontaktuješ ma prostredníctvom kontaktného formulára a dohodneme si prvú konzultáciu, aby sme zistili, či nám spolupráca vyhovuje.",
          "Prvá konzultácia môže prebehnúť osobne. Ak to nie je možné, uskutoční sa online prostredníctvom videohovoru na platforme, ktorá ti najviac vyhovuje.",
          "Počas konzultácie sa s vami podelím o trochu viac podrobností o tom, ako program funguje, a potom zhromaždím informácie o vašich cieľoch, vašom súčasnom životnom štýle, zdraví, úrovni aktivity, stravovacích návykoch, preferenciách v jedle, dennom rozvrhu a ďalších informáciách.",
          "Po konzultácii máte tri dni na to, aby ste sa rozhodli, či vám program vyhovuje. A či ste pripravení posunúť svoj život a zdravie na vyššiu úroveň. Po týchto troch dňoch ťa budem kontaktovať, aby som sa informovala o vašom rozhodnutí.",
          "Keď sa rozhodnete pokračovať, budete mať ďalšie tri dni na zaplatenie. Môžete zaplatiť celú sumu za najlepšiu cenu alebo ju rozdeliť na dve až tri časti s malým navýšením, v prípade že máš záujem o väčšiu flexibilitu.",
          "Počas týchto troch dní vás požiadam, aby ste si zapísali všetko, čo jete a pijete, spolu s časom, a poslali mi to e-mailom. Čím viac budem vedieť o vašich zvykoch, tým lepšie vám rozumiem a tým efektívnejšie môžem vytvoriť váš program. A Spoločne môžeme byť úspešnejší v dosahovaní vašich cieľov.",
          "Keď dostanem tvoju platbu a poznámky o jedle a nápojoch, budem sedem až desať dní vytvárať tvoj štartovací program prispôsobený tebe. Potom budem program počas koučingu ďalej upravovať a rozvíjať podľa tvojho pokroku, potrieb a toho, ako reaguje tvoje telo.",
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
    image: "/images/kathy/move-and-grow-flower.jpeg",
    imageAlt: "Katey smiling warmly outdoors",
    price: 200,
    currency: "CHF",
    content: {
      en: {
        title: "Move and Grow",
        intro: "This program is for people who want expert training to get fit and strong, but the progress is also in your hands, because all the rest is up to you.\n\nMovement is longevity. Aging doesn't have to be something we fear — with movement, it can become one of life's great privileges. Add movement to your life, and you add life to your years.",
        targetHeading: "This program is for:",
        targetAudience: [
          "People who know they should train, but don't know where to start.",
          "Those who already eat well, but whose training is holding back their results.",
          "Anyone who already has a nutrition coach and just needs the right training to reach their goals.",
          "People who've already built a solid foundation in nutrition and are ready to focus purely on training with me.",
        ],
        transition: "",
        includesHeading: "This program includes:",
        includes: [
          "A first consultation of about 20 minutes, to understand your goals and your fitness level.",
          "A training plan made just for you, shaped around your goals, your level, your possibilities, your schedule and your preferences.",
          "Optional video form checks — if you're ever unsure about an exercise, you can send me a short clip and I'll check your technique.",
          "Weekly check-ins to track your progress and adjust your plan.",
          "Warm-up and mobility guidance, to keep your joints healthy, your body moving freely and your training safe.",
          "Ongoing support via WhatsApp messages, so you can write to me with questions throughout the programme.",
        ],
        duration: "month",
        paymentOptions: ["200 CHF per month"],
      },
      de: {
        title: "Move and Grow",
        intro: "Dieses Programm ist für Menschen, die professionelles Training möchten, um fit und stark zu werden. Dein Fortschritt liegt aber auch in deinen Händen, denn alles Weitere hängt von dir ab.\n\nBewegung bedeutet Langlebigkeit. Älterwerden muss nichts sein, wovor wir uns fürchten — mit Bewegung kann es zu einem großen Privileg des Lebens werden. Wenn du Bewegung in dein Leben bringst, schenkst du deinen Jahren mehr Leben.",
        targetHeading: "Dieses Programm ist für:",
        targetAudience: [
          "Menschen, die wissen, dass sie trainieren sollten, aber nicht wissen, wo sie anfangen sollen.",
          "Menschen, die bereits gut essen, deren Training aber ihre Ergebnisse ausbremst.",
          "Menschen, die bereits eine Ernährungsberatung haben und das richtige Training für ihre Ziele benötigen.",
          "Menschen, die eine solide Grundlage in der Ernährung aufgebaut haben und sich mit mir ganz auf ihr Training konzentrieren möchten.",
        ],
        transition: "",
        includesHeading: "Das Programm beinhaltet:",
        includes: [
          "Eine Erstberatung von etwa 20 Minuten, um deine Ziele und dein Fitnesslevel zu verstehen.",
          "Ein Trainingsplan, der genau für dich erstellt und auf deine Ziele, dein Level, deine Möglichkeiten, deinen Zeitplan und deine Vorlieben abgestimmt wird.",
          "Optionale Video-Checks deiner Übungsausführung — wenn du bei einer Übung unsicher bist, kannst du mir einen kurzen Clip schicken und ich überprüfe deine Technik.",
          "Wöchentliche Check-ins, um deinen Fortschritt zu verfolgen und deinen Plan anzupassen.",
          "Anleitung zu Aufwärmen und Mobilität, damit deine Gelenke gesund bleiben, sich dein Körper frei bewegt und du sicher trainierst.",
          "Laufende Unterstützung per WhatsApp, damit du mir während des gesamten Programms Fragen schreiben kannst.",
        ],
        duration: "pro Monat",
        paymentOptions: ["CHF 200 pro Monat"],
      },
      sk: {
        title: "Move and Grow",
        intro: "Tento program je pre ľudí, ktorí chcú odborný tréning, aby sa dostali do formy a zosilneli. Pokrok je však aj v tvojich rukách, pretože všetko ostatné závisí od teba.\n\nPohyb podporuje dlhovekosť. Starnutia sa nemusíme báť — vďaka pohybu sa môže stať jedným z veľkých životných privilégií. Keď do svojho života pridáš pohyb, pridáš život aj svojim rokom.",
        targetHeading: "Tento program je pre:",
        targetAudience: [
          "Pre ľudí, ktorí vedia, že by mali cvičiť, ale nevedia, kde začať.",
          "Pre tých, ktorí sa už dobre stravujú, no ich tréning brzdí výsledky.",
          "Pre každého, kto už má výživového poradcu a potrebuje správny tréning na dosiahnutie svojich cieľov.",
          "Pre ľudí, ktorí si už vybudovali pevné základy vo výžive a chcú sa so mnou sústrediť výlučne na tréning.",
        ],
        transition: "",
        includesHeading: "Tento program zahŕňa:",
        includes: [
          "Prvá konzultácia v trvaní približne 20 minút, aby som pochopila tvoje ciele a úroveň kondície.",
          "Tréningový plán vytvorený presne pre teba, prispôsobený tvojim cieľom, úrovni, možnostiam, časovému rozvrhu a preferenciám.",
          "Voliteľná kontrola techniky cez video — ak si pri cviku nie si istý/istá, môžeš mi poslať krátke video a skontrolujem tvoju techniku.",
          "Týždenné kontroly na sledovanie tvojho pokroku a úpravu plánu.",
          "Usmernenie k rozcvičke a mobilite, aby zostali tvoje kĺby zdravé, telo sa voľne hýbalo a tréning bol bezpečný.",
          "Priebežná podpora cez WhatsApp, takže mi môžeš počas programu písať svoje otázky.",
        ],
        duration: "mesiac",
        paymentOptions: ["200 CHF mesačne"],
      },
    },
  },
  {
    slug: "nourish-and-grow",
    label: "Program D",
    image: "/images/kathy/nutrition-program-smile.jpeg",
    imageAlt: "Katey smiling outdoors",
    price: 200,
    currency: "CHF",
    content: {
      en: {
        title: "Nourish and Grow",
        intro: "Nourish and Grow is for people who are ready to change the way they eat. Food isn't the enemy — it's the fuel for a stronger, healthier, happier you. In fact, when it comes to looking and feeling your best, around 80% comes down to what you eat, and only 20% to how you move. Anyone who's trained hard knows it: you can't out-train poor eating. This is where real, lasting change begins — on your plate.\n\nNutrition is always evolving. What we believed fifty years ago — remember when eggs were the enemy? — often looks different today, as new studies teach us more. That's not a reason to feel lost. It's simply a reminder to stay open, to keep learning and never cling too tightly to what we think we know.",
        targetHeading: "This program is for:",
        targetAudience: [
          "People who want to eat healthier but don't know where to begin.",
          "Those who feel lost in all the conflicting diet advice out there.",
          "Anyone wanting to lose weight, or simply feel better in their body, through food.",
          "People who already train, at home or elsewhere, but whose eating is holding back their results.",
          "Anyone ready for lasting change, not another crash diet that fades in a few weeks.",
        ],
        transition: "",
        includesHeading: "This program includes:",
        includes: [
          "A first consultation of about 45 minutes, to understand your goals, habits and a little about your lifestyle.",
          "An eating plan made just for you, shaped around your goals, your tastes and any dietary needs.",
          "Weekly check-ins to track your progress and adjust your plan.",
          "Healthy eating ideas, tips and recipes.",
          "Ongoing support via WhatsApp messages, so you can write to me with questions throughout the program.",
        ],
        duration: "month",
        paymentOptions: ["200 CHF per month"],
      },
      de: {
        title: "Nourish and Grow",
        intro: "Nourish and Grow ist für Menschen, die bereit sind, ihre Ernährung zu verändern. Essen ist nicht der Feind — es ist der Treibstoff für ein stärkeres, gesünderes und glücklicheres Leben. Wenn es darum geht, gut auszusehen und sich gut zu fühlen, hängen etwa 80 % davon ab, was du isst, und nur 20 % davon, wie du dich bewegst. Wer hart trainiert, weiß: Schlechte Ernährung kann man nicht wegtrainieren. Hier beginnt echte, nachhaltige Veränderung — auf deinem Teller.\n\nErnährung entwickelt sich ständig weiter. Was wir vor fünfzig Jahren geglaubt haben — denk nur daran, als Eier als ungesund galten — sieht heute oft anders aus, weil neue Studien uns mehr lehren. Das ist kein Grund, dich verloren zu fühlen. Es ist eine Erinnerung daran, offen zu bleiben, weiterzulernen und nicht zu fest an dem festzuhalten, was wir zu wissen glauben.",
        targetHeading: "Dieses Programm ist für:",
        targetAudience: [
          "Menschen, die sich gesünder ernähren möchten, aber nicht wissen, wo sie anfangen sollen.",
          "Menschen, die sich von den vielen widersprüchlichen Ernährungstipps überfordert fühlen.",
          "Menschen, die durch ihre Ernährung abnehmen oder sich einfach wohler in ihrem Körper fühlen möchten.",
          "Menschen, die bereits zu Hause oder anderswo trainieren, deren Ernährung aber ihre Ergebnisse bremst.",
          "Menschen, die bereit für eine nachhaltige Veränderung sind — keine weitere Crash-Diät, die nach ein paar Wochen endet.",
        ],
        transition: "",
        includesHeading: "Das Programm beinhaltet:",
        includes: [
          "Eine Erstberatung von etwa 45 Minuten, um deine Ziele, Gewohnheiten und etwas über deinen Alltag zu verstehen.",
          "Einen Ernährungsplan, der genau für dich erstellt und auf deine Ziele, deinen Geschmack und deine Ernährungsbedürfnisse abgestimmt wird.",
          "Wöchentliche Check-ins, um deinen Fortschritt zu verfolgen und deinen Plan anzupassen.",
          "Ideen, Tipps und Rezepte für eine gesunde Ernährung.",
          "Laufende Unterstützung per WhatsApp, damit du mir während des gesamten Programms Fragen schreiben kannst.",
        ],
        duration: "pro Monat",
        paymentOptions: ["CHF 200 pro Monat"],
      },
      sk: {
        title: "Nourish and Grow",
        intro: "Nourish and Grow je pre ľudí, ktorí sú pripravení zmeniť spôsob svojho stravovania. Jedlo nie je nepriateľ — je palivom pre silnejšie, zdravšie a šťastnejšie ja. Keď ide o to, aby si vyzeral/a a cítil/a sa čo najlepšie, približne 80 % závisí od toho, čo ješ, a iba 20 % od toho, ako sa hýbeš. Každý, kto tvrdo trénoval, to pozná: zlú stravu neprecvičíš. Tu sa začína skutočná a trvalá zmena — na tvojom tanieri.\n\nVýživa sa neustále vyvíja. To, čomu sme verili pred päťdesiatimi rokmi — spomeň si, keď boli vajcia nepriateľom — dnes často vyzerá inak, pretože nové štúdie nás učia viac. Nie je to dôvod cítiť sa stratený/stratená. Je to len pripomienka, aby sme zostali otvorení, stále sa učili a príliš sa neupínali na to, čo si myslíme, že vieme.",
        targetHeading: "Tento program je pre:",
        targetAudience: [
          "Pre ľudí, ktorí sa chcú stravovať zdravšie, ale nevedia, kde začať.",
          "Pre tých, ktorí sa strácajú vo všetkých protichodných radách o stravovaní.",
          "Pre každého, kto chce vďaka jedlu schudnúť alebo sa jednoducho cítiť lepšie vo svojom tele.",
          "Pre ľudí, ktorí už trénujú doma alebo inde, no ich stravovanie brzdí výsledky.",
          "Pre každého, kto je pripravený na trvalú zmenu, nie na ďalšiu rýchlu diétu, ktorá po pár týždňoch vyprchá.",
        ],
        transition: "",
        includesHeading: "Tento program zahŕňa:",
        includes: [
          "Prvá konzultácia v trvaní približne 45 minút, aby som pochopila tvoje ciele, návyky a niečo o tvojom životnom štýle.",
          "Stravovací plán vytvorený presne pre teba, prispôsobený tvojim cieľom, chutiam a stravovacím potrebám.",
          "Týždenné kontroly na sledovanie tvojho pokroku a úpravu plánu.",
          "Nápady, tipy a recepty na zdravé stravovanie.",
          "Priebežná podpora cez WhatsApp, takže mi môžeš počas programu písať svoje otázky.",
        ],
        duration: "mesiac",
        paymentOptions: ["200 CHF mesačne"],
      },
    },
  },
  {
    slug: "find-your-way-through",
    label: "Program C",
    image: "/images/kathy/find-your-way-white-heart.jpeg",
    imageAlt: "Katey smiling warmly",
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
