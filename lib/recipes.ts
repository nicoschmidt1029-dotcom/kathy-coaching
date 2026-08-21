import type { Locale } from "@/i18n/routing";

export const RECIPE_CATEGORIES = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
  "smoothies",
  "healthyTreats",
] as const;

export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number];
type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, readonly string[]>;

const text = (en: string, de: string, sk: string): LocalizedText => ({ en, de, sk });
const list = (
  en: readonly string[],
  de: readonly string[],
  sk: readonly string[]
): LocalizedList => ({ en, de, sk });

export type IngredientGroup = {
  title?: LocalizedText;
  items: LocalizedList;
};

export type Recipe = {
  slug: string;
  title: LocalizedText;
  category: RecipeCategory;
  image: string;
  imageAlt: LocalizedText;
  shortDescription: LocalizedText;
  introduction: LocalizedText;
  prepTime: LocalizedText;
  cookTime?: LocalizedText;
  totalTime: LocalizedText;
  servings: LocalizedText;
  tags: LocalizedList;
  ingredientGroups: readonly IngredientGroup[];
  instructions: LocalizedList;
  featured?: boolean;
};

export type LocalizedIngredientGroup = {
  title?: string;
  items: readonly string[];
};

export type LocalizedRecipe = Omit<
  Recipe,
  | "title"
  | "imageAlt"
  | "shortDescription"
  | "introduction"
  | "prepTime"
  | "cookTime"
  | "totalTime"
  | "servings"
  | "tags"
  | "ingredientGroups"
  | "instructions"
> & {
  title: string;
  imageAlt: string;
  shortDescription: string;
  introduction: string;
  prepTime: string;
  cookTime?: string;
  totalTime: string;
  servings: string;
  tags: readonly string[];
  ingredientGroups: readonly LocalizedIngredientGroup[];
  instructions: readonly string[];
};

/**
 * Recipe content is kept in one typed collection so cards, filters, detail
 * pages, metadata and the sitemap cannot drift apart. Every visitor-facing
 * field carries EN/DE/SK copy; images and slugs stay shared across locales so
 * the language switcher keeps visitors on the same recipe.
 */
export const RECIPES: readonly Recipe[] = [
  {
    slug: "mediterranean-lemon-chicken-bowl",
    title: text(
      "Mediterranean Lemon Chicken Bowl",
      "Mediterrane Bowl mit Zitronenhähnchen",
      "Stredomorská miska s citrónovým kuraťom"
    ),
    category: "lunch",
    image: "/images/recipes/mediterranean-chicken-bowl-natural.webp",
    imageAlt: text(
      "Mediterranean lemon chicken bowl with quinoa and roasted vegetables",
      "Mediterrane Bowl mit Zitronenhähnchen, Quinoa und Ofengemüse",
      "Stredomorská miska s citrónovým kuraťom, quinoou a pečenou zeleninou"
    ),
    shortDescription: text(
      "Fresh, colorful and satisfying — an easy protein-rich bowl for lunch or meal prep.",
      "Frisch, farbenfroh und sättigend — eine einfache proteinreiche Bowl für Lunch oder Meal Prep.",
      "Svieža, pestrá a sýta — jednoduchá miska bohatá na bielkoviny na obed alebo prípravu vopred."
    ),
    introduction: text(
      "A fresh, satisfying bowl with lemon-herb chicken, roasted vegetables, quinoa and a creamy yogurt dressing. Balanced, colorful and easy to prepare ahead for busy days.",
      "Eine frische, sättigende Bowl mit Zitronen-Kräuter-Hähnchen, Ofengemüse, Quinoa und cremigem Joghurtdressing. Ausgewogen, farbenfroh und ideal zum Vorbereiten für volle Tage.",
      "Svieža a sýta miska s citrónovo-bylinkovým kuraťom, pečenou zeleninou, quinoou a krémovým jogurtovým dresingom. Vyvážená, pestrá a praktická na rušné dni."
    ),
    prepTime: text("15 min", "15 Min.", "15 min"),
    cookTime: text("15 min", "15 Min.", "15 min"),
    totalTime: text("30 min", "30 Min.", "30 min"),
    servings: text("2", "2", "2"),
    tags: list(
      ["High Protein", "Balanced Meal"],
      ["Proteinreich", "Ausgewogene Mahlzeit"],
      ["Bohaté na bielkoviny", "Vyvážené jedlo"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "300 g chicken breast",
            "120 g quinoa",
            "1 small zucchini",
            "1 red bell pepper",
            "150 g cherry tomatoes",
            "1/2 cucumber",
            "2 handfuls baby spinach",
            "1 tbsp olive oil",
            "Juice of 1/2 lemon",
            "1 tsp dried oregano",
            "1/2 tsp garlic powder",
            "Salt and black pepper",
          ],
          [
            "300 g Hähnchenbrust",
            "120 g Quinoa",
            "1 kleine Zucchini",
            "1 rote Paprika",
            "150 g Cherrytomaten",
            "1/2 Gurke",
            "2 Handvoll Babyspinat",
            "1 EL Olivenöl",
            "Saft von 1/2 Zitrone",
            "1 TL getrockneter Oregano",
            "1/2 TL Knoblauchpulver",
            "Salz und schwarzer Pfeffer",
          ],
          [
            "300 g kuracích pŕs",
            "120 g quinoy",
            "1 malá cuketa",
            "1 červená paprika",
            "150 g cherry paradajok",
            "1/2 uhorky",
            "2 hrste baby špenátu",
            "1 PL olivového oleja",
            "Šťava z 1/2 citróna",
            "1 ČL sušeného oregana",
            "1/2 ČL cesnakového prášku",
            "Soľ a čierne korenie",
          ]
        ),
      },
      {
        title: text("Dressing", "Dressing", "Dresing"),
        items: list(
          [
            "100 g Greek yogurt",
            "1 tbsp lemon juice",
            "1 tsp olive oil",
            "Fresh parsley or dill",
            "Pinch of salt",
          ],
          [
            "100 g griechischer Joghurt",
            "1 EL Zitronensaft",
            "1 TL Olivenöl",
            "Frische Petersilie oder Dill",
            "1 Prise Salz",
          ],
          [
            "100 g gréckeho jogurtu",
            "1 PL citrónovej šťavy",
            "1 ČL olivového oleja",
            "Čerstvá petržlenová vňať alebo kôpor",
            "Štipka soli",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Cook the quinoa according to the package instructions.",
        "Cut the chicken into bite-sized pieces and season with oregano, garlic, salt and pepper.",
        "Heat olive oil in a pan and cook the chicken until golden and fully cooked.",
        "Add zucchini and bell pepper and cook until slightly tender while still retaining some bite.",
        "Mix the yogurt dressing ingredients in a small bowl.",
        "Divide spinach and quinoa between two bowls.",
        "Add the chicken, vegetables, cucumber and tomatoes.",
        "Finish with the lemon yogurt dressing and fresh herbs.",
      ],
      [
        "Quinoa nach Packungsanleitung garen.",
        "Hähnchen in mundgerechte Stücke schneiden und mit Oregano, Knoblauch, Salz und Pfeffer würzen.",
        "Olivenöl in einer Pfanne erhitzen und das Hähnchen goldbraun und vollständig durchgaren.",
        "Zucchini und Paprika dazugeben und garen, bis sie leicht weich sind, aber noch Biss haben.",
        "Die Zutaten für das Joghurtdressing in einer kleinen Schüssel verrühren.",
        "Spinat und Quinoa auf zwei Bowls verteilen.",
        "Hähnchen, Gemüse, Gurke und Tomaten daraufgeben.",
        "Mit Zitronen-Joghurtdressing und frischen Kräutern vollenden.",
      ],
      [
        "Quinou uvar podľa návodu na obale.",
        "Kuracie mäso nakrájaj na kúsky a ochuť oreganom, cesnakom, soľou a korením.",
        "Na panvici rozohrej olivový olej a kura opeč dozlatista a úplne prepeč.",
        "Pridaj cuketu a papriku a opekaj, kým mierne nezmäknú, no zostanú chrumkavé.",
        "V malej miske zmiešaj všetky suroviny na jogurtový dresing.",
        "Špenát a quinou rozdeľ do dvoch misiek.",
        "Pridaj kura, zeleninu, uhorku a paradajky.",
        "Dokonči citrónovým jogurtovým dresingom a čerstvými bylinkami.",
      ]
    ),
    featured: true,
  },
  {
    slug: "berry-vanilla-overnight-oats",
    title: text(
      "Berry Vanilla Overnight Oats",
      "Vanille Overnight Oats mit Beeren",
      "Vanilkové overnight oats s bobuľovým ovocím"
    ),
    category: "breakfast",
    image: "/images/recipes/berry-overnight-oats-natural.webp",
    imageAlt: text(
      "Creamy berry vanilla overnight oats with almonds",
      "Cremige Vanille Overnight Oats mit Beeren und Mandeln",
      "Krémové vanilkové overnight oats s bobuľovým ovocím a mandľami"
    ),
    shortDescription: text(
      "A creamy make-ahead breakfast with berries, oats and protein to make busy mornings easier.",
      "Ein cremiges Frühstück zum Vorbereiten mit Beeren, Hafer und Protein für entspanntere Morgen.",
      "Krémové raňajky pripravené vopred s ovocím, ovsom a bielkovinami pre jednoduchšie rána."
    ),
    introduction: text(
      "Creamy oats, vanilla and berries come together overnight for a balanced breakfast that is ready when you are.",
      "Cremiger Hafer, Vanille und Beeren verbinden sich über Nacht zu einem ausgewogenen Frühstück, das morgens schon bereitsteht.",
      "Krémový ovos, vanilka a bobuľové ovocie sa cez noc spoja do vyvážených raňajok, ktoré sú ráno pripravené."
    ),
    prepTime: text("5 min + overnight", "5 Min. + über Nacht", "5 min + cez noc"),
    cookTime: text("0 min", "0 Min.", "0 min"),
    totalTime: text("Overnight", "Über Nacht", "Cez noc"),
    servings: text("1", "1", "1"),
    tags: list(
      ["Meal Prep", "Protein Rich"],
      ["Meal Prep", "Proteinreich"],
      ["Príprava vopred", "Bohaté na bielkoviny"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "50 g rolled oats",
            "150 g Greek yogurt or Skyr",
            "100 ml milk or unsweetened plant milk",
            "1 tbsp chia seeds",
            "1/2 tsp vanilla extract",
            "100 g mixed berries",
            "1 tsp honey or maple syrup, optional",
            "1 tbsp chopped almonds",
          ],
          [
            "50 g Haferflocken",
            "150 g griechischer Joghurt oder Skyr",
            "100 ml Milch oder ungesüßter Pflanzendrink",
            "1 EL Chiasamen",
            "1/2 TL Vanilleextrakt",
            "100 g gemischte Beeren",
            "1 TL Honig oder Ahornsirup, optional",
            "1 EL gehackte Mandeln",
          ],
          [
            "50 g ovsených vločiek",
            "150 g gréckeho jogurtu alebo skyru",
            "100 ml mlieka alebo nesladeného rastlinného nápoja",
            "1 PL chia semienok",
            "1/2 ČL vanilkového extraktu",
            "100 g zmesi bobuľového ovocia",
            "1 ČL medu alebo javorového sirupu, voliteľné",
            "1 PL nasekaných mandlí",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Mix the oats, yogurt, milk, chia seeds and vanilla in a jar.",
        "Stir until evenly combined.",
        "Add half of the berries.",
        "Refrigerate overnight or for at least four hours.",
        "Before serving, top with the remaining berries and almonds.",
        "Add a small amount of honey or maple syrup if desired.",
      ],
      [
        "Haferflocken, Joghurt, Milch, Chiasamen und Vanille in einem Glas mischen.",
        "Alles gleichmäßig verrühren.",
        "Die Hälfte der Beeren dazugeben.",
        "Über Nacht oder mindestens vier Stunden kalt stellen.",
        "Vor dem Servieren mit den restlichen Beeren und Mandeln toppen.",
        "Nach Wunsch etwas Honig oder Ahornsirup dazugeben.",
      ],
      [
        "V pohári zmiešaj vločky, jogurt, mlieko, chia semienka a vanilku.",
        "Dobre premiešaj.",
        "Pridaj polovicu ovocia.",
        "Nechaj cez noc alebo aspoň štyri hodiny v chladničke.",
        "Pred podávaním pridaj zvyšné ovocie a mandle.",
        "Podľa chuti pridaj trochu medu alebo javorového sirupu.",
      ]
    ),
  },
  {
    slug: "creamy-lemon-salmon-greens",
    title: text(
      "Creamy Lemon Salmon & Greens",
      "Cremiger Zitronenlachs mit grünem Gemüse",
      "Krémový citrónový losos so zeleninou"
    ),
    category: "dinner",
    image: "/images/recipes/lemon-salmon-natural.webp",
    imageAlt: text(
      "Lemon salmon with potatoes, green beans and spinach",
      "Zitronenlachs mit Kartoffeln, grünen Bohnen und Spinat",
      "Citrónový losos so zemiakmi, zelenými fazuľkami a špenátom"
    ),
    shortDescription: text(
      "A simple salmon dinner with greens, potatoes and a fresh creamy lemon sauce.",
      "Ein einfaches Lachsgericht mit grünem Gemüse, Kartoffeln und frischer cremiger Zitronensauce.",
      "Jednoduchá večera z lososa so zeleninou, zemiakmi a sviežou krémovou citrónovou omáčkou."
    ),
    introduction: text(
      "Golden salmon, tender potatoes and plenty of greens make a simple dinner feel special, finished with a bright yogurt, lemon and dill sauce.",
      "Goldener Lachs, zarte Kartoffeln und viel grünes Gemüse machen ein einfaches Abendessen besonders — abgerundet mit einer frischen Joghurt-Zitronen-Dill-Sauce.",
      "Zlatistý losos, jemné zemiaky a veľa zelenej zeleniny tvoria jednoduchú večeru, ktorú dopĺňa svieža jogurtová omáčka s citrónom a kôprom."
    ),
    prepTime: text("10 min", "10 Min.", "10 min"),
    cookTime: text("20 min", "20 Min.", "20 min"),
    totalTime: text("30 min", "30 Min.", "30 min"),
    servings: text("2", "2", "2"),
    tags: list(
      ["High Protein", "Omega-3"],
      ["Proteinreich", "Omega-3"],
      ["Bohaté na bielkoviny", "Omega-3"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "2 salmon fillets",
            "250 g baby potatoes",
            "200 g green beans",
            "2 handfuls spinach",
            "1 tsp olive oil",
            "Juice and zest of 1/2 lemon",
            "1 garlic clove",
            "80 g Greek yogurt",
            "Fresh dill",
            "Salt and black pepper",
          ],
          [
            "2 Lachsfilets",
            "250 g kleine Kartoffeln",
            "200 g grüne Bohnen",
            "2 Handvoll Spinat",
            "1 TL Olivenöl",
            "Saft und Abrieb von 1/2 Zitrone",
            "1 Knoblauchzehe",
            "80 g griechischer Joghurt",
            "Frischer Dill",
            "Salz und schwarzer Pfeffer",
          ],
          [
            "2 filety z lososa",
            "250 g malých zemiakov",
            "200 g zelených fazuliek",
            "2 hrste špenátu",
            "1 ČL olivového oleja",
            "Šťava a kôra z 1/2 citróna",
            "1 strúčik cesnaku",
            "80 g gréckeho jogurtu",
            "Čerstvý kôpor",
            "Soľ a čierne korenie",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Boil or roast the baby potatoes until tender.",
        "Season the salmon with salt, pepper and lemon zest.",
        "Cook the salmon in a pan with olive oil until golden and cooked through.",
        "Add green beans to a separate pan and sauté until tender.",
        "Stir together Greek yogurt, lemon juice, garlic and dill.",
        "Add spinach to the vegetables and allow it to wilt.",
        "Serve salmon with potatoes and greens.",
        "Spoon over the lemon yogurt sauce.",
      ],
      [
        "Die kleinen Kartoffeln weich kochen oder im Ofen rösten.",
        "Lachs mit Salz, Pfeffer und Zitronenabrieb würzen.",
        "Lachs mit Olivenöl in einer Pfanne goldbraun und vollständig durchgaren.",
        "Grüne Bohnen in einer zweiten Pfanne bissfest anbraten.",
        "Griechischen Joghurt, Zitronensaft, Knoblauch und Dill verrühren.",
        "Spinat zum Gemüse geben und zusammenfallen lassen.",
        "Lachs mit Kartoffeln und grünem Gemüse servieren.",
        "Die Zitronen-Joghurtsauce darübergeben.",
      ],
      [
        "Malé zemiaky uvar alebo upeč domäkka.",
        "Lososa ochuť soľou, korením a citrónovou kôrou.",
        "Lososa opeč na olivovom oleji dozlatista a úplne prepeč.",
        "Zelené fazuľky opeč na samostatnej panvici domäkka.",
        "Zmiešaj grécky jogurt, citrónovú šťavu, cesnak a kôpor.",
        "K zelenine pridaj špenát a nechaj ho zvädnúť.",
        "Lososa podávaj so zemiakmi a zeleninou.",
        "Prelej citrónovou jogurtovou omáčkou.",
      ]
    ),
  },
  {
    slug: "green-mango-protein-smoothie",
    title: text(
      "Green Mango Protein Smoothie",
      "Grüner Mango-Protein-Smoothie",
      "Zelené mangové proteínové smoothie"
    ),
    category: "smoothies",
    image: "/images/recipes/green-mango-smoothie.webp",
    imageAlt: text(
      "Creamy green mango smoothie with lime and chia seeds",
      "Cremiger grüner Mango-Smoothie mit Limette und Chiasamen",
      "Krémové zelené mangové smoothie s limetkou a chia semienkami"
    ),
    shortDescription: text(
      "Creamy mango, fresh lime and spinach in a refreshing five-minute smoothie.",
      "Cremige Mango, frische Limette und Spinat in einem erfrischenden Fünf-Minuten-Smoothie.",
      "Krémové mango, svieža limetka a špenát v osviežujúcom päťminútovom smoothie."
    ),
    introduction: text(
      "A quick, creamy blend of mango, lime, greens and yogurt for mornings or afternoons that need something fresh and easy.",
      "Ein schneller, cremiger Mix aus Mango, Limette, Blattgrün und Joghurt für Morgen oder Nachmittage, an denen es frisch und unkompliziert sein soll.",
      "Rýchla krémová kombinácia manga, limetky, špenátu a jogurtu na rána či popoludnia, keď chceš niečo svieže a jednoduché."
    ),
    prepTime: text("5 min", "5 Min.", "5 min"),
    cookTime: text("0 min", "0 Min.", "0 min"),
    totalTime: text("5 min", "5 Min.", "5 min"),
    servings: text("1", "1", "1"),
    tags: list(
      ["Quick", "Protein Rich"],
      ["Schnell", "Proteinreich"],
      ["Rýchle", "Bohaté na bielkoviny"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "1/2 frozen banana",
            "100 g frozen mango",
            "1 handful baby spinach",
            "150 g Greek yogurt or Skyr",
            "150–200 ml milk or plant milk",
            "1 tbsp chia seeds",
            "Squeeze of fresh lime",
            "Ice cubes as needed",
          ],
          [
            "1/2 gefrorene Banane",
            "100 g gefrorene Mango",
            "1 Handvoll Babyspinat",
            "150 g griechischer Joghurt oder Skyr",
            "150–200 ml Milch oder Pflanzendrink",
            "1 EL Chiasamen",
            "Ein Spritzer frischer Limettensaft",
            "Eiswürfel nach Bedarf",
          ],
          [
            "1/2 mrazeného banánu",
            "100 g mrazeného manga",
            "1 hrsť baby špenátu",
            "150 g gréckeho jogurtu alebo skyru",
            "150–200 ml mlieka alebo rastlinného nápoja",
            "1 PL chia semienok",
            "Trochu čerstvej limetkovej šťavy",
            "Kocky ľadu podľa potreby",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Add all ingredients to a blender.",
        "Blend until completely smooth.",
        "Add more liquid if a thinner consistency is preferred.",
        "Serve immediately.",
      ],
      [
        "Alle Zutaten in einen Mixer geben.",
        "Vollständig cremig mixen.",
        "Für eine dünnere Konsistenz mehr Flüssigkeit dazugeben.",
        "Sofort servieren.",
      ],
      [
        "Všetky suroviny vlož do mixéra.",
        "Rozmixuj úplne dohladka.",
        "Ak chceš redšiu konzistenciu, pridaj viac tekutiny.",
        "Ihneď podávaj.",
      ]
    ),
  },
  {
    slug: "sweet-potato-chickpea-nourish-bowl",
    title: text(
      "Sweet Potato & Chickpea Nourish Bowl",
      "Nourish Bowl mit Süßkartoffel und Kichererbsen",
      "Výživná miska s batátom a cícerom"
    ),
    category: "lunch",
    image: "/images/recipes/sweet-potato-bowl.webp",
    imageAlt: text(
      "Sweet potato and chickpea bowl with quinoa, avocado and tahini",
      "Bowl mit Süßkartoffel, Kichererbsen, Quinoa, Avocado und Tahini",
      "Miska s batátom, cícerom, quinoou, avokádom a tahini"
    ),
    shortDescription: text(
      "A colorful plant-based bowl with roasted sweet potato, chickpeas, quinoa and tahini.",
      "Eine farbenfrohe pflanzliche Bowl mit gerösteter Süßkartoffel, Kichererbsen, Quinoa und Tahini.",
      "Pestrá rastlinná miska s pečeným batátom, cícerom, quinoou a tahini."
    ),
    introduction: text(
      "Warm roasted sweet potato and chickpeas meet cool greens, avocado and a lemony tahini dressing in a nourishing plant-based bowl.",
      "Warme geröstete Süßkartoffel und Kichererbsen treffen auf frisches Blattgrün, Avocado und ein zitroniges Tahini-Dressing.",
      "Teplý pečený batát a cícer dopĺňa svieža zelenina, avokádo a citrónový tahini dresing."
    ),
    prepTime: text("15 min", "15 Min.", "15 min"),
    cookTime: text("25 min", "25 Min.", "25 min"),
    totalTime: text("40 min", "40 Min.", "40 min"),
    servings: text("2", "2", "2"),
    tags: list(
      ["Vegetarian", "Plant Based"],
      ["Vegetarisch", "Pflanzlich"],
      ["Vegetariánske", "Rastlinné"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "1 large sweet potato",
            "1 can chickpeas, drained",
            "100 g quinoa",
            "2 handfuls spinach or mixed greens",
            "1/2 avocado",
            "1/2 cucumber",
            "1 tsp paprika",
            "1/2 tsp cumin",
            "1 tbsp olive oil",
            "Salt and black pepper",
          ],
          [
            "1 große Süßkartoffel",
            "1 Dose Kichererbsen, abgetropft",
            "100 g Quinoa",
            "2 Handvoll Spinat oder Blattsalat",
            "1/2 Avocado",
            "1/2 Gurke",
            "1 TL Paprikapulver",
            "1/2 TL Kreuzkümmel",
            "1 EL Olivenöl",
            "Salz und schwarzer Pfeffer",
          ],
          [
            "1 veľký batát",
            "1 konzerva cíceru, scedená",
            "100 g quinoy",
            "2 hrste špenátu alebo listového šalátu",
            "1/2 avokáda",
            "1/2 uhorky",
            "1 ČL mletej papriky",
            "1/2 ČL rímskej rasce",
            "1 PL olivového oleja",
            "Soľ a čierne korenie",
          ]
        ),
      },
      {
        title: text("Tahini dressing", "Tahini-Dressing", "Tahini dresing"),
        items: list(
          ["1 tbsp tahini", "Juice of 1/2 lemon", "1–2 tbsp water", "Pinch of salt"],
          ["1 EL Tahini", "Saft von 1/2 Zitrone", "1–2 EL Wasser", "1 Prise Salz"],
          ["1 PL tahini", "Šťava z 1/2 citróna", "1–2 PL vody", "Štipka soli"]
        ),
      },
    ],
    instructions: list(
      [
        "Preheat the oven to 200°C.",
        "Dice the sweet potato.",
        "Toss sweet potato and chickpeas with olive oil, paprika, cumin, salt and pepper.",
        "Roast for approximately 25 minutes.",
        "Cook quinoa according to package instructions.",
        "Whisk the dressing ingredients together.",
        "Assemble greens, quinoa, cucumber, avocado, sweet potato and chickpeas.",
        "Drizzle with tahini dressing.",
      ],
      [
        "Backofen auf 200 °C vorheizen.",
        "Süßkartoffel würfeln.",
        "Süßkartoffel und Kichererbsen mit Olivenöl, Paprika, Kreuzkümmel, Salz und Pfeffer mischen.",
        "Etwa 25 Minuten rösten.",
        "Quinoa nach Packungsanleitung garen.",
        "Die Zutaten für das Dressing glatt rühren.",
        "Blattgrün, Quinoa, Gurke, Avocado, Süßkartoffel und Kichererbsen anrichten.",
        "Mit Tahini-Dressing beträufeln.",
      ],
      [
        "Rúru predhrej na 200 °C.",
        "Batát nakrájaj na kocky.",
        "Batát a cícer premiešaj s olivovým olejom, paprikou, rascou, soľou a korením.",
        "Peč približne 25 minút.",
        "Quinou uvar podľa návodu na obale.",
        "Suroviny na dresing vyšľahaj dohladka.",
        "Do misky poukladaj listy, quinou, uhorku, avokádo, batát a cícer.",
        "Pokvapkaj tahini dresingom.",
      ]
    ),
  },
  {
    slug: "apple-cinnamon-protein-pancakes",
    title: text(
      "Apple Cinnamon Protein Pancakes",
      "Protein-Pancakes mit Apfel und Zimt",
      "Proteínové lievance s jablkom a škoricou"
    ),
    category: "breakfast",
    image: "/images/recipes/apple-protein-pancakes.webp",
    imageAlt: text(
      "Apple cinnamon protein pancakes with yogurt and berries",
      "Apfel-Zimt-Protein-Pancakes mit Joghurt und Beeren",
      "Proteínové lievance s jablkom, škoricou, jogurtom a ovocím"
    ),
    shortDescription: text(
      "Soft apple-cinnamon pancakes for a cozy breakfast with an easy protein boost.",
      "Lockere Apfel-Zimt-Pancakes für ein gemütliches Frühstück mit extra Protein.",
      "Jemné jablkovo-škoricové lievance na útulné raňajky s jednoduchou dávkou bielkovín."
    ),
    introduction: text(
      "Oats, yogurt, eggs and apple make a soft stack of naturally sweet pancakes for slow weekends or an everyday breakfast.",
      "Hafer, Joghurt, Eier und Apfel ergeben einen lockeren, natürlich süßen Pancake-Stapel für ruhige Wochenenden oder jeden Morgen.",
      "Ovos, jogurt, vajcia a jablko vytvoria jemné, prirodzene sladké lievance na pomalé víkendy aj bežné rána."
    ),
    prepTime: text("10 min", "10 Min.", "10 min"),
    cookTime: text("10 min", "10 Min.", "10 min"),
    totalTime: text("20 min", "20 Min.", "20 min"),
    servings: text("2", "2", "2"),
    tags: list(
      ["High Protein", "Weekend Favorite"],
      ["Proteinreich", "Wochenendliebling"],
      ["Bohaté na bielkoviny", "Víkendový favorit"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "1 ripe banana",
            "2 eggs",
            "80 g oats",
            "100 g Greek yogurt",
            "1/2 tsp baking powder",
            "1 tsp cinnamon",
            "1/2 apple, finely diced",
            "Splash of milk if needed",
          ],
          [
            "1 reife Banane",
            "2 Eier",
            "80 g Haferflocken",
            "100 g griechischer Joghurt",
            "1/2 TL Backpulver",
            "1 TL Zimt",
            "1/2 Apfel, fein gewürfelt",
            "Ein Schuss Milch nach Bedarf",
          ],
          [
            "1 zrelý banán",
            "2 vajcia",
            "80 g ovsených vločiek",
            "100 g gréckeho jogurtu",
            "1/2 ČL prášku do pečiva",
            "1 ČL škorice",
            "1/2 jablka, nakrájaného nadrobno",
            "Trochu mlieka podľa potreby",
          ]
        ),
      },
      {
        title: text("For serving", "Zum Servieren", "Na podávanie"),
        items: list(
          ["Greek yogurt", "Apple slices", "Cinnamon", "Berries"],
          ["Griechischer Joghurt", "Apfelscheiben", "Zimt", "Beeren"],
          ["Grécky jogurt", "Plátky jablka", "Škorica", "Bobuľové ovocie"]
        ),
      },
    ],
    instructions: list(
      [
        "Blend banana, eggs, oats, Greek yogurt, baking powder and cinnamon into a batter.",
        "Fold in the diced apple.",
        "Heat a non-stick pan over medium-low heat.",
        "Cook small pancakes for approximately two minutes per side.",
        "Serve with yogurt, fresh fruit and cinnamon.",
      ],
      [
        "Banane, Eier, Haferflocken, griechischen Joghurt, Backpulver und Zimt zu einem Teig mixen.",
        "Apfelwürfel unterheben.",
        "Eine beschichtete Pfanne bei mittlerer bis niedriger Hitze erwärmen.",
        "Kleine Pancakes etwa zwei Minuten pro Seite backen.",
        "Mit Joghurt, frischem Obst und Zimt servieren.",
      ],
      [
        "Banán, vajcia, vločky, grécky jogurt, prášok do pečiva a škoricu rozmixuj na cesto.",
        "Vmiešaj nakrájané jablko.",
        "Nepriľnavú panvicu rozohrej na miernom ohni.",
        "Malé lievance opekaj približne dve minúty z každej strany.",
        "Podávaj s jogurtom, čerstvým ovocím a škoricou.",
      ]
    ),
  },
  {
    slug: "crispy-hummus-veggie-wrap",
    title: text(
      "Crispy Hummus & Veggie Wrap",
      "Knuspriger Hummus-Gemüse-Wrap",
      "Chrumkavý wrap s hummusom a zeleninou"
    ),
    category: "lunch",
    image: "/images/recipes/hummus-veggie-wrap.webp",
    imageAlt: text(
      "Crispy hummus wrap filled with vegetables and feta",
      "Knuspriger Hummus-Wrap mit Gemüse und Feta",
      "Chrumkavý hummusový wrap plnený zeleninou a fetou"
    ),
    shortDescription: text(
      "An easy crunchy wrap with hummus, fresh vegetables and feta for days when lunch needs to be quick.",
      "Ein unkomplizierter knuspriger Wrap mit Hummus, frischem Gemüse und Feta, wenn das Mittagessen schnell gehen muss.",
      "Jednoduchý chrumkavý wrap s hummusom, čerstvou zeleninou a fetou na dni, keď má byť obed rýchly."
    ),
    introduction: text(
      "Fresh vegetables, creamy hummus and salty feta are folded into a wholegrain wrap and toasted until lightly crisp.",
      "Frisches Gemüse, cremiger Hummus und würziger Feta werden in einen Vollkorn-Wrap gerollt und leicht knusprig getoastet.",
      "Čerstvá zelenina, krémový hummus a slaná feta sa zabalia do celozrnnej placky a zľahka opečú dochrumkava."
    ),
    prepTime: text("10 min", "10 Min.", "10 min"),
    cookTime: text("5 min", "5 Min.", "5 min"),
    totalTime: text("15 min", "15 Min.", "15 min"),
    servings: text("1", "1", "1"),
    tags: list(
      ["Quick Lunch", "Vegetarian"],
      ["Schnelles Mittagessen", "Vegetarisch"],
      ["Rýchly obed", "Vegetariánske"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "1 wholegrain wrap",
            "3 tbsp hummus",
            "1 handful baby spinach",
            "1/4 cucumber",
            "1/2 bell pepper",
            "Grated carrot",
            "30 g feta",
            "Squeeze of lemon",
            "Black pepper",
          ],
          [
            "1 Vollkorn-Wrap",
            "3 EL Hummus",
            "1 Handvoll Babyspinat",
            "1/4 Gurke",
            "1/2 Paprika",
            "Geraspelte Karotte",
            "30 g Feta",
            "Ein Spritzer Zitronensaft",
            "Schwarzer Pfeffer",
          ],
          [
            "1 celozrnná tortilla",
            "3 PL hummusu",
            "1 hrsť baby špenátu",
            "1/4 uhorky",
            "1/2 papriky",
            "Nastrúhaná mrkva",
            "30 g fety",
            "Trochu citrónovej šťavy",
            "Čierne korenie",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Spread hummus across the wrap.",
        "Add spinach, cucumber, bell pepper and carrot.",
        "Crumble feta over the vegetables.",
        "Finish with lemon juice and black pepper.",
        "Fold tightly.",
        "Toast briefly in a dry pan until lightly crisp on both sides.",
      ],
      [
        "Hummus auf dem Wrap verstreichen.",
        "Spinat, Gurke, Paprika und Karotte daraufgeben.",
        "Feta über das Gemüse bröseln.",
        "Mit Zitronensaft und schwarzem Pfeffer abschmecken.",
        "Fest einrollen.",
        "Kurz in einer trockenen Pfanne rösten, bis beide Seiten leicht knusprig sind.",
      ],
      [
        "Tortillu natri hummusom.",
        "Pridaj špenát, uhorku, papriku a mrkvu.",
        "Na zeleninu rozdrob fetu.",
        "Dokonči citrónovou šťavou a čiernym korením.",
        "Pevne zabaľ.",
        "Krátko opeč na suchej panvici, kým nebude z oboch strán jemne chrumkavý.",
      ]
    ),
  },
  {
    slug: "greek-yogurt-berry-crunch",
    title: text(
      "Greek Yogurt Berry Crunch",
      "Griechischer Joghurt mit Beeren-Crunch",
      "Grécky jogurt s chrumkavým ovocím"
    ),
    category: "snacks",
    image: "/images/recipes/yogurt-berry-crunch.webp",
    imageAlt: text(
      "Greek yogurt with fresh berries, nuts and pumpkin seeds",
      "Griechischer Joghurt mit frischen Beeren, Nüssen und Kürbiskernen",
      "Grécky jogurt s čerstvým ovocím, orechmi a tekvicovými semienkami"
    ),
    shortDescription: text(
      "A five-minute snack with creamy yogurt, fresh berries and a satisfying crunch.",
      "Ein Fünf-Minuten-Snack mit cremigem Joghurt, frischen Beeren und feinem Crunch.",
      "Päťminútový snack s krémovým jogurtom, čerstvým ovocím a príjemným chrumkaním."
    ),
    introduction: text(
      "Creamy yogurt, juicy berries, nuts and seeds make a quick snack with a mix of freshness, texture and staying power.",
      "Cremiger Joghurt, saftige Beeren, Nüsse und Kerne ergeben einen schnellen Snack mit Frische, Textur und guter Sättigung.",
      "Krémový jogurt, šťavnaté ovocie, orechy a semienka vytvoria rýchly snack plný sviežosti a textúry."
    ),
    prepTime: text("5 min", "5 Min.", "5 min"),
    cookTime: text("0 min", "0 Min.", "0 min"),
    totalTime: text("5 min", "5 Min.", "5 min"),
    servings: text("1", "1", "1"),
    tags: list(
      ["Quick", "Protein Rich"],
      ["Schnell", "Proteinreich"],
      ["Rýchle", "Bohaté na bielkoviny"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "200 g Greek yogurt or Skyr",
            "100 g berries",
            "1 tbsp chopped walnuts or almonds",
            "1 tbsp pumpkin seeds",
            "1 tsp honey, optional",
            "Cinnamon",
          ],
          [
            "200 g griechischer Joghurt oder Skyr",
            "100 g Beeren",
            "1 EL gehackte Walnüsse oder Mandeln",
            "1 EL Kürbiskerne",
            "1 TL Honig, optional",
            "Zimt",
          ],
          [
            "200 g gréckeho jogurtu alebo skyru",
            "100 g bobuľového ovocia",
            "1 PL nasekaných vlašských orechov alebo mandlí",
            "1 PL tekvicových semienok",
            "1 ČL medu, voliteľné",
            "Škorica",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Spoon yogurt into a bowl.",
        "Add berries.",
        "Top with nuts and pumpkin seeds.",
        "Add cinnamon and optional honey.",
      ],
      [
        "Joghurt in eine Schüssel geben.",
        "Beeren dazugeben.",
        "Mit Nüssen und Kürbiskernen toppen.",
        "Zimt und nach Wunsch Honig dazugeben.",
      ],
      [
        "Jogurt daj do misky.",
        "Pridaj ovocie.",
        "Posyp orechmi a tekvicovými semienkami.",
        "Pridaj škoricu a podľa chuti med.",
      ]
    ),
  },
  {
    slug: "date-almond-energy-bites",
    title: text(
      "Date & Almond Energy Bites",
      "Dattel-Mandel-Energy-Bites",
      "Datľovo-mandľové energetické guľky"
    ),
    category: "snacks",
    image: "/images/recipes/date-almond-bites.webp",
    imageAlt: text(
      "No-bake date and almond energy bites",
      "Ungebackene Dattel-Mandel-Energy-Bites",
      "Nepečené datľovo-mandľové energetické guľky"
    ),
    shortDescription: text(
      "Simple no-bake bites made from dates, almonds, oats and cocoa.",
      "Einfache Energy-Bites ohne Backen aus Datteln, Mandeln, Hafer und Kakao.",
      "Jednoduché nepečené guľky z datlí, mandlí, ovsa a kakaa."
    ),
    introduction: text(
      "Naturally sweet dates, almonds, oats and cocoa turn into an easy batch of bites to keep chilled for busy afternoons.",
      "Natürlich süße Datteln, Mandeln, Hafer und Kakao werden zu unkomplizierten Bites für volle Nachmittage.",
      "Prirodzene sladké datle, mandle, ovos a kakao sa premenia na jednoduché guľky do zásoby na rušné popoludnia."
    ),
    prepTime: text("10 min", "10 Min.", "10 min"),
    cookTime: text("0 min", "0 Min.", "0 min"),
    totalTime: text("40 min including chilling", "40 Min. mit Kühlzeit", "40 min vrátane chladenia"),
    servings: text("10–12 bites", "10–12 Stück", "10–12 guľôčok"),
    tags: list(
      ["Meal Prep", "No Bake"],
      ["Meal Prep", "Ohne Backen"],
      ["Príprava vopred", "Bez pečenia"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "150 g soft dates, pitted",
            "80 g almonds",
            "30 g oats",
            "1 tbsp cocoa powder",
            "1 tbsp chia seeds",
            "Pinch of sea salt",
            "1–2 tsp water if needed",
          ],
          [
            "150 g weiche Datteln, entsteint",
            "80 g Mandeln",
            "30 g Haferflocken",
            "1 EL Kakaopulver",
            "1 EL Chiasamen",
            "1 Prise Meersalz",
            "1–2 TL Wasser nach Bedarf",
          ],
          [
            "150 g mäkkých datlí bez kôstok",
            "80 g mandlí",
            "30 g ovsených vločiek",
            "1 PL kakaa",
            "1 PL chia semienok",
            "Štipka morskej soli",
            "1–2 ČL vody podľa potreby",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Add all ingredients to a food processor.",
        "Blend until the mixture begins to stick together.",
        "Add a small amount of water only if needed.",
        "Roll into small balls.",
        "Refrigerate for at least 30 minutes.",
        "Store refrigerated in a sealed container.",
      ],
      [
        "Alle Zutaten in eine Küchenmaschine geben.",
        "Mixen, bis die Masse zusammenhält.",
        "Nur bei Bedarf wenig Wasser dazugeben.",
        "Zu kleinen Kugeln rollen.",
        "Mindestens 30 Minuten kalt stellen.",
        "In einem verschlossenen Behälter im Kühlschrank aufbewahren.",
      ],
      [
        "Všetky suroviny vlož do kuchynského robota.",
        "Mixuj, kým sa zmes nezačne spájať.",
        "Len podľa potreby pridaj trochu vody.",
        "Vytvaruj malé guľky.",
        "Daj aspoň na 30 minút do chladničky.",
        "Uchovávaj v uzavretej nádobe v chladničke.",
      ]
    ),
  },
  {
    slug: "dark-chocolate-berry-yogurt-bark",
    title: text(
      "Dark Chocolate Berry Yogurt Bark",
      "Joghurt-Bark mit Beeren und dunkler Schokolade",
      "Jogurtová kôra s ovocím a horkou čokoládou"
    ),
    category: "healthyTreats",
    image: "/images/recipes/yogurt-bark.webp",
    imageAlt: text(
      "Frozen yogurt bark with berries, dark chocolate and pistachios",
      "Gefrorener Joghurt-Bark mit Beeren, dunkler Schokolade und Pistazien",
      "Mrazená jogurtová kôra s ovocím, horkou čokoládou a pistáciami"
    ),
    shortDescription: text(
      "A refreshing frozen yogurt treat with berries, dark chocolate and crunchy nuts.",
      "Ein erfrischender gefrorener Joghurt-Snack mit Beeren, dunkler Schokolade und knackigen Nüssen.",
      "Osviežujúca mrazená jogurtová maškrta s ovocím, horkou čokoládou a chrumkavými orechmi."
    ),
    introduction: text(
      "Creamy yogurt freezes into a crisp, refreshing treat with juicy berries, dark chocolate and a little nutty crunch.",
      "Cremiger Joghurt wird mit saftigen Beeren, dunkler Schokolade und etwas Nuss-Crunch zu einer erfrischenden gefrorenen Nascherei.",
      "Krémový jogurt zamrzne na sviežu chrumkavú maškrtu so šťavnatým ovocím, horkou čokoládou a orechmi."
    ),
    prepTime: text("10 min", "10 Min.", "10 min"),
    cookTime: text("2–3 hr freeze", "2–3 Std. Gefrierzeit", "2–3 hod. mrazenia"),
    totalTime: text("2–3 hr 10 min", "2–3 Std. 10 Min.", "2–3 hod. 10 min"),
    servings: text("8 pieces", "8 Stück", "8 kúskov"),
    tags: list(
      ["Freezer Friendly", "Simple"],
      ["Für den Tiefkühler", "Einfach"],
      ["Do mrazničky", "Jednoduché"]
    ),
    ingredientGroups: [
      {
        items: list(
          [
            "300 g Greek yogurt",
            "100 g strawberries or raspberries",
            "20 g dark chocolate",
            "1 tbsp chopped pistachios or almonds",
            "1 tsp honey, optional",
          ],
          [
            "300 g griechischer Joghurt",
            "100 g Erdbeeren oder Himbeeren",
            "20 g dunkle Schokolade",
            "1 EL gehackte Pistazien oder Mandeln",
            "1 TL Honig, optional",
          ],
          [
            "300 g gréckeho jogurtu",
            "100 g jahôd alebo malín",
            "20 g horkej čokolády",
            "1 PL nasekaných pistácií alebo mandlí",
            "1 ČL medu, voliteľné",
          ]
        ),
      },
    ],
    instructions: list(
      [
        "Line a tray with baking paper.",
        "Spread Greek yogurt into an even layer.",
        "Add berries.",
        "Melt or finely chop the dark chocolate and drizzle it over the yogurt.",
        "Sprinkle with nuts.",
        "Freeze until firm.",
        "Break into pieces before serving.",
      ],
      [
        "Ein Blech mit Backpapier auslegen.",
        "Griechischen Joghurt gleichmäßig darauf verstreichen.",
        "Beeren darauf verteilen.",
        "Dunkle Schokolade schmelzen oder fein hacken und über den Joghurt geben.",
        "Mit Nüssen bestreuen.",
        "Fest gefrieren lassen.",
        "Vor dem Servieren in Stücke brechen.",
      ],
      [
        "Plech vylož papierom na pečenie.",
        "Grécky jogurt rozotri do rovnomernej vrstvy.",
        "Pridaj ovocie.",
        "Horkú čokoládu rozpusti alebo nadrobno nasekaj a pokvapkaj ňou jogurt.",
        "Posyp orechmi.",
        "Zmraz, kým nebude zmes pevná.",
        "Pred podávaním rozlám na kúsky.",
      ]
    ),
  },
];

/** Only recipes Katarina has explicitly reviewed are part of the public journal. */
export const PUBLIC_RECIPE_SLUGS = [
  "berry-vanilla-overnight-oats",
  "mediterranean-lemon-chicken-bowl",
  "creamy-lemon-salmon-greens",
] as const;

function localizeRecipe(recipe: Recipe, locale: Locale): LocalizedRecipe {
  return {
    ...recipe,
    title: recipe.title[locale],
    imageAlt: recipe.imageAlt[locale],
    shortDescription: recipe.shortDescription[locale],
    introduction: recipe.introduction[locale],
    prepTime: recipe.prepTime[locale],
    cookTime: recipe.cookTime?.[locale],
    totalTime: recipe.totalTime[locale],
    servings: recipe.servings[locale],
    tags: recipe.tags[locale],
    ingredientGroups: recipe.ingredientGroups.map((group) => ({
      title: group.title?.[locale],
      items: group.items[locale],
    })),
    instructions: recipe.instructions[locale],
  };
}

export function getRecipes(locale: Locale): LocalizedRecipe[] {
  return RECIPES.map((recipe) => localizeRecipe(recipe, locale));
}

export function getRecipe(slug: string, locale: Locale): LocalizedRecipe | undefined {
  const recipe = RECIPES.find((item) => item.slug === slug);
  return recipe ? localizeRecipe(recipe, locale) : undefined;
}

export function getRelatedRecipes(
  current: LocalizedRecipe,
  locale: Locale,
  limit = 3
): LocalizedRecipe[] {
  const candidates = getRecipes(locale).filter((recipe) => recipe.slug !== current.slug);
  return [
    ...candidates.filter((recipe) => recipe.category === current.category),
    ...candidates.filter((recipe) => recipe.category !== current.category),
  ].slice(0, limit);
}
