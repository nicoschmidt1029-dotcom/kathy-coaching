import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Mission } from "@/components/site/mission";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

const MISSION_EN_BODY = `We all have something that gives our life meaning, something that makes us feel alive and fulfilled. For me, that is helping improve the quality of life for people who desire it.

My first priority is always health, whether physical or mental. We can be the most beautiful in the world, but what good is that if we can't say the same about our inner self? That's why it's important not only to exercise and eat well, but to take care of our heart, our beliefs and our mindset.

Life is a gift from God, and to live it to its full potential, we have to love, appreciate and take care of the gift that was given to us. Every person matters, and every person is important. We are all different; not even two fingerprints are the same in this world. Within each of us, around thirty-seven trillion cells work together every single moment, without us even thinking about it. All the unseen work happening inside our bodies was perfectly designed for us. This gift was given to us, and now it is up to us how we take care of it. When you see yourself in the mirror, just as you are, and you like what you see, that tells you how well you have cared for the outside. But look inside too. If what you find there is anger, envy, unforgiveness, fear, the need to gossip, sadness you can't name or things we hide, then you know something inside is still waiting to be healed or simply left behind. Some of us are given the chance to learn this early in life, others discover it much later, and that is okay, because we still can change.

And just as this body was so carefully designed, it was also given the remarkable ability to heal itself. The same is true of what is inside. Our heart and our mind can heal too, when we stop ignoring what is there and let the healing happen.

I'm deeply drawn to a holistic approach to life, looking at the whole person — body, mind and spirit together — rather than isolated symptoms. Functional medicine is a powerful approach that looks beyond symptoms to understand the true root cause.

And that changes everything.

This isn't just something I have read about. I experienced this in my own life, when I went through real health challenges. What really helped me was when I started looking for the root cause of my problems, instead of only treating the symptoms.

Sometimes what we need is not another prescription, but to find out what caused it in the first place. And this is why I'm fascinated by functional medicine.

I believe the more we understand this, the more we can support life rather than work against it. And it's never too late to start, though the earlier we learn how to care for what we've been given — physically, mentally and spiritually — the more we lay the foundation for the life ahead of us.`;

const MISSION_SK_BODY = `Každý z nás má niečo, čo dáva nášmu životu zmysel, niečo, vďaka čomu sa cítime živí a naplnení. Pre mňa je to pomoc pri zlepšovaní kvality života ľudí, ktorí o to stoja.

Mojou prvoradou prioritou je vždy zdravie, či už fyzické alebo duševné. Môžeme byť tými najkrajšími ľuďmi na svete, no čo z toho, ak to isté nemôžeme povedať o svojom vnútri? Preto je dôležité nielen cvičiť a zdravo sa stravovať, ale starať sa aj o svoje srdce, svoje presvedčenia a svoje nastavenie mysle.

Život je dar od Boha a ak ho chceme prežiť naplno, musíme milovať, vážiť si a starať sa o tento dar, ktorý sme dostali. Na každom človeku záleží a každý človek je dôležitý. Všetci sme odlišní; na svete neexistujú ani dva rovnaké odtlačky prstov. V každom z nás v každom okamihu spolupracuje približne tridsaťsedem biliónov buniek, a to bez toho, aby sme na to vôbec mysleli. Všetka tá neviditeľná práca, ktorá prebieha v našom tele, bola pre nás dokonale navrhnutá. Tento dar sme dostali a teraz je len na nás, ako sa oň budeme starať. Keď sa pozriete do zrkadla, takí, akí ste, a páči sa vám, čo vidíte, hovorí to o tom, ako dobre ste sa starali o svoj zovňajšok. Pozrite sa však aj do svojho vnútra. Ak tam nájdete hnev, závisť, neschopnosť odpúšťať, strach, potrebu ohovárať, smútok, ktorý neviete pomenovať, či veci, ktoré skrývate, potom viete, že niečo vo vašom vnútri stále čaká na uzdravenie alebo na to, aby ste to jednoducho nechali za sebou. Niektorí z nás dostanú šancu naučiť sa to už v mladosti, iní na to prídu oveľa neskôr – a to je v poriadku, pretože stále sa môžeme zmeniť.

A tak ako bolo toto telo starostlivo navrhnuté, dostalo aj pozoruhodnú schopnosť samo sa uzdravovať. To isté platí aj pre naše vnútro. Aj naše srdce a myseľ sa môžu uzdraviť, keď prestaneme ignorovať, že im treba pomôcť.

Veľmi ma oslovuje holistický prístup k životu, ktorý vníma človeka ako celok – telo, myseľ a ducha spoločne – a nezameriava sa len na izolované príznaky. Funkčná medicína predstavuje mocný prístup, ktorý hľadá skutočnú príčinu problémov a pozerá sa za hranice samotných príznakov. A to všetko mení.
Nie je to len niečo, o čom som čítala. Sama som to zažila na vlastnej koži, keď som mala vážne zdravotné problémy. Skutočne mi pomohlo, keď som začala hľadať prvotnú príčinu svojich ťažkostí namiesto potláčania príznakov.

Niekedy nepotrebujeme ďalší lekársky predpis, ale skôr zistiť, čo daný problém vôbec spôsobilo. Práve preto ma funkčná medicína tak fascinuje.

Verím, že čím lepšie tomu rozumieme, tým viac môžeme život podporovať, namiesto toho, aby sme proti nemu bojovali. Nikdy nie je neskoro začať, no čím skôr sa naučíme starať o to, čo nám bolo dané – po fyzickej, duševnej i duchovnej stránke –, tým lepšie si vybudujeme základy pre život, ktorý máme pred sebou.`;

/**
 * Mission — its own page now, per Katarina's request (nav clicks navigate
 * to real pages, not anchors on the home scroll). Was a band on the
 * one-pager between HowIWork and Contact.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.mission" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/mission"),
  };
}

export default async function MissionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const { locale } = await params;
  const { adminPreview } = await searchParams;
  setRequestLocale(locale);
  const missionTranslations = await getTranslations({ locale, namespace: "mission" });
  const isPreview = adminPreview === "mission";
  const entry = isPreview ? await getAdminPreviewEntry("website", "mission") : await getPublicWebsiteEntry("mission");
  const data = entry?.data as { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string> } | undefined;
  const content = locale === "en"
    ? {
        eyebrow: data?.eyebrow?.[locale] ?? missionTranslations("eyebrow"),
        headline: data?.headline?.[locale] ?? missionTranslations("title"),
        body: MISSION_EN_BODY,
        image: entry?.image_path,
      }
    : locale === "sk"
      ? {
          eyebrow: data?.eyebrow?.[locale] ?? missionTranslations("eyebrow"),
          headline: "Tvoje najlepšie roky nie sú za tebou – sú to tie, ktoré práve môžeš vytvoriť.",
          body: MISSION_SK_BODY,
          image: entry?.image_path,
        }
      : entry
        ? { eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], image: entry.image_path }
        : undefined;

  return <>{isPreview && <DraftPreviewBanner backHref="/admin/mission" />}<Mission content={content} /></>;
}
