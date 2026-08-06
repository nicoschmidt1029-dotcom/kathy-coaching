/* ==========================================================================
 * LEGAL CONTENT - NOT YET VERIFIED BY A LAWYER OR SWISS LEGAL EXPERT -
 * review before this page is considered final
 * --------------------------------------------------------------------------
 * Applies to the whole text, not just the <Todo> placeholders: the choice of
 * legal basis, the article citations, the liability and copyright wording,
 * and whether the disclosures are complete for how Katarína actually
 * operates. None of it has been checked by anyone qualified in Swiss law.
 *
 * This file carries a second, independent risk: it is also an unreviewed
 * machine translation (see below). Legal wording and language review are two
 * separate sign-offs — neither has happened.
 * ========================================================================== */

import { Todo } from "@/components/site/todo";

/**
 * Právne informácie (Impressum) — Slovak.
 *
 * DRAFT — NEEDS NATIVE SPEAKER REVIEW. Drafted by an AI, not by Katarína,
 * and not checked by anyone who speaks the language. Legal prose carries a
 * higher cost for a wrong word than marketing copy does, so this needs a
 * review before it can be relied on; every /sk page already carries the
 * draft notice (DRAFT_LOCALES in i18n/routing.ts).
 *
 * Švajčiarske právo, nie nemecké TMG: základom je čl. 3 písm. s UWG.
 * Odkazy na články sú zámerne totožné s anglickou verziou — prekladá sa len
 * vysvetľujúci text, nikdy právny základ. Všetky skutočné údaje zostávajú
 * ako <Todo> zástupné miesta.
 */
export function ImprintBodySk() {
  return (
    <>
      <p>
        Údaje podľa čl. 3 písm. s švajčiarskeho Spolkového zákona proti
        nekalej súťaži (UWG).
      </p>

      <h2>Prevádzkovateľka</h2>
      <p>
        Katarína Gröflin
        <br />
        <Todo>ulica a číslo domu</Todo>
        <br />
        <Todo>PSČ</Todo> Ettingen BL
        <br />
        Švajčiarsko
      </p>

      <h2>Kontakt</h2>
      <p>
        E-mail: <Todo>adresa, ktorú tu chce Katarína zverejniť</Todo>
        <br />
        Telefón:{" "}
        <Todo>číslo, alebo potvrdenie, že sa žiadne nezverejňuje</Todo>
      </p>

      <h2>Identifikácia podnikateľky</h2>
      <p>
        UID (Unternehmens-Identifikationsnummer):{" "}
        <Todo>UID, alebo potvrdenie, že podnikanie nie je registrované</Todo>
        <br />
        MWST-Nr. (DPH):{" "}
        <Todo>
          číslo DPH, alebo potvrdenie, že registrácia na DPH neexistuje
        </Todo>
        <br />
        Obchodný register (Handelsregister):{" "}
        <Todo>zápis v registri, alebo potvrdenie, že zápis nie je potrebný</Todo>
      </p>

      <h2>Odborné označenia</h2>
      <p>
        Osobná trénerka a výživová poradkyňa —{" "}
        <Todo>inštitúcia, ktorá jednotlivé certifikáty vydala</Todo>. Vo
        Švajčiarsku nejde o štátom regulované povolania; kantonálne povolenie
        ani členstvo v komore sa nevyžaduje. Dobrovoľné uznanie (napr. EMR /
        ASCA / RME pre doplnkové výživové služby) —{" "}
        <Todo>
          registračné číslo, ak existuje, inak sa táto veta vypúšťa
        </Todo>
        .
      </p>

      <h2>Poistenie profesijnej zodpovednosti</h2>
      <p>
        Poisťovateľ: <Todo>názov poisťovateľa</Todo>,{" "}
        <Todo>adresa poisťovateľa</Todo>. Územná platnosť:{" "}
        <Todo>
          územie, ktoré poistka skutočne pokrýva — nepredpokladať len
          Švajčiarsko
        </Todo>
        .
      </p>

      <h2>Zodpovednosť za obsah</h2>
      <p>
        Za obsah tejto stránky zodpovedá Katarína Gröflin, adresa ako vyššie.
      </p>

      <h2>Riešenie sporov</h2>
      <p>
        Podľa švajčiarskeho práva neexistuje povinnosť zúčastniť sa
        spotrebiteľského rozhodcovského konania. Katie sa na ňom v súčasnosti
        ani zúčastniť nechce. Návštevníci s bydliskom v EÚ môžu využiť
        platformu Európskej komisie na riešenie sporov online:{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>Zodpovednosť za obsah stránky</h2>
      <p>
        Obsah tejto stránky je pripravovaný so starostlivosťou, ale bez záruky
        úplnosti, aktuálnosti či vhodnosti na konkrétny účel. Prevádzkovateľka
        nezodpovedá za škody vzniknuté použitím alebo nemožnosťou použitia tu
        uvedených informácií, a to v rozsahu, ktorý pripúšťa čl. 100 a nasl.
        švajčiarskeho Obligačného zákonníka (OR).
      </p>

      <h2>Zodpovednosť za odkazy</h2>
      <p>
        Táto stránka môže obsahovať odkazy na externé weby, nad ktorými
        prevádzkovateľka nemá kontrolu. Za ich obsah sa nepreberá žiadna
        zodpovednosť. Za obsah odkazovaných stránok zodpovedá vždy ich
        poskytovateľ alebo prevádzkovateľ.
      </p>

      <h2>Autorské práva</h2>
      <p>
        Texty, obrázky a grafická úprava tejto stránky sú, pokiaľ ich vytvorila
        prevádzkovateľka, chránené švajčiarskym autorským zákonom (URG).
        Rozmnožovanie, šírenie alebo akékoľvek komerčné použitie nad rámec
        autorského zákona si vyžaduje písomný súhlas príslušného autora.
      </p>
    </>
  );
}
