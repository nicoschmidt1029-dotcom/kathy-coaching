/* ==========================================================================
 * LEGAL CONTENT - NOT YET VERIFIED BY A LAWYER OR SWISS LEGAL EXPERT -
 * review before this page is considered final
 * --------------------------------------------------------------------------
 * Applies to the whole text, not just the <Todo> placeholders: the nDSG and
 * GDPR citations, the stated legal bases, the retention periods, and the
 * claims about Vercel's and Resend's transfer mechanisms. None of it has been
 * checked by anyone qualified in Swiss data protection law, and
 * adequacy-decision and framework claims in particular can go stale.
 *
 * This file carries a second, independent risk: it is also an unreviewed
 * machine translation (see below). Legal wording and language review are two
 * separate sign-offs — neither has happened.
 * ========================================================================== */

import { Todo } from "@/components/site/todo";
import { SITE_HOST } from "@/lib/site-url";

/**
 * Ochrana osobných údajov — Slovak.
 *
 * DRAFT — NEEDS NATIVE SPEAKER REVIEW. Drafted by an AI, not by Katarína,
 * and not checked by anyone who speaks the language. Legal prose carries a
 * higher cost for a wrong word than marketing copy does, so this needs a
 * review before it can be relied on; every /sk page already carries the
 * draft notice (DRAFT_LOCALES in i18n/routing.ts).
 *
 * Najprv švajčiarske právo (nDSG), GDPR dodatočne pre návštevníkov z EÚ.
 * Odkazy na články sú zámerne totožné s anglickou verziou — prekladá sa len
 * vysvetľujúci text, nikdy právny základ. Všetky skutočné údaje zostávajú
 * ako <Todo> zástupné miesta.
 */
export function PrivacyBodySk() {
  return (
    <>
      <p>
        Táto stránka vysvetľuje, aké osobné údaje sa pri používaní{" "}
        <em>{SITE_HOST}</em> spracúvajú, prečo, ako dlho sa uchovávajú a aké
        máš práva. Je napísaná tak, aby jej bolo rozumieť — nielen tak, aby
        spĺňala predpisy.
      </p>
      <p>
        Katie pôsobí predovšetkým vo Švajčiarsku, preto sa uplatňuje revidovaný
        švajčiarsky zákon o ochrane údajov (nDSG, účinný od 1. septembra 2023).
        Ak pristupuješ z členského štátu EÚ/EHP, dodatočne sa uplatňuje
        európske nariadenie GDPR; obidva súbory práv sa dodržiavajú spoločne.
      </p>

      <h2>1. Kto je zodpovedný</h2>
      <p>
        Prevádzkovateľkou v zmysle čl. 5 písm. j nDSG (a čl. 4 ods. 7 GDPR pre
        návštevníkov z EÚ) je:
      </p>
      <p>
        Katarína Gröflin
        <br />
        <Todo>ulica a číslo</Todo>
        <br />
        <Todo>PSČ</Todo> Ettingen BL, Švajčiarsko
        <br />
        E-mail: <Todo>adresa, ktorú tu chce Katarína zverejniť</Todo>
      </p>

      <h2>2. Aké údaje sa spracúvajú a prečo</h2>

      <h3>2.1 Pri návšteve stránky</h3>
      <p>
        Stránku hostuje Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
        USA. Pri načítaní stránky dostáva Vercel technické údaje — IP adresu,
        časovú značku, user-agent, odkazujúcu URL — aby stránku doručil a
        bránil sa zneužitiu. Ide o legitímny obchodný účel podľa čl. 31 ods. 2
        písm. c nDSG (a čl. 6 ods. 1 písm. f GDPR pre návštevníkov z EÚ:
        oprávnený záujem na bezpečnej prevádzke stránky).
      </p>
      <p>
        Vercel koná ako sprostredkovateľ na základe uzavretého Data Processing
        Addendum. Prenos do USA je krytý štandardnými zmluvnými doložkami; pre
        účastníkov rámca EU-U.S. Data Privacy Framework sa USA v súčasnosti
        považujú za krajinu s primeranou úrovňou ochrany (Vercel je
        certifikovaný). Pri švajčiarskych údajoch sa prenos opiera o štandardné
        zmluvné doložky a, ak sa uplatní, o Swiss-U.S. DPF.
      </p>

      <h3>2.2 Pri použití kontaktného formulára</h3>
      <p>
        Kontaktný formulár zbiera tvoje meno, e-mailovú adresu, jazyk, v ktorom
        chceš odpoveď (nepovinné), odkiaľ píšeš (nepovinné) a tvoju správu.
        Tieto údaje sa používajú výhradne na odpoveď na tvoju otázku a — ak
        vznikne spolupráca — na zorganizovanie ďalšej práce.
      </p>
      <ul>
        <li>
          Účel: odpoveď na tvoju otázku / predzmluvné kroky na tvoju žiadosť
          (čl. 6 písm. a nDSG, teda zákonné spracúvanie viazané na legitímny
          účel; čl. 6 ods. 1 písm. b GDPR pre návštevníkov z EÚ).
        </li>
        <li>Príjemca: výhradne Katarína Gröflin.</li>
        <li>
          Technický sprostredkovateľ: Resend Inc., 2261 Market Street #5039,
          San Francisco, CA 94114, USA — odosiela e-mail zo stránky do Katinej
          schránky. Viazaný Data Processing Addendum a štandardnými zmluvnými
          doložkami; Resend je certifikovaný v rámcoch Swiss-U.S. a EU-U.S.
          Data Privacy Framework.
        </li>
        <li>
          Uchovávanie: tak dlho, ako je potrebné na dokončenie rozhovoru, a — ak
          vznikne spolupráca — po dobu trvania koučingového vzťahu plus zákonné
          lehoty uchovávania (10 rokov pre korešpondenciu relevantnú pre
          účtovníctvo podľa čl. 958f OR,{" "}
          <Todo>rozsah overiť s Katinou daňovou poradkyňou</Todo>). Ak z otázky
          nič nevznikne, správa sa vymaže do 12 mesiacov.
        </li>
      </ul>

      <h3>2.3 Honeypot pole</h3>
      <p>
        Formulár obsahuje skryté pole, ktoré je pre ľudí neviditeľné, ale
        spamovacie roboty ho zvyčajne vyplnia. Ak je vyplnené, správa sa ticho
        zahodí. V takom prípade sa neukladajú žiadne údaje.
      </p>

      <h2>3. Čo sa tu nerobí</h2>
      <ul>
        <li>Nenastavujú sa žiadne cookies. Súhlasný banner nie je potrebný.</li>
        <li>
          Žiadna analytika tretích strán (žiadny Google Analytics, žiadny Meta
          Pixel, žiadny Plausible, žiadny Fathom).
        </li>
        <li>Žiadne reklamné sledovače.</li>
        <li>
          Písma (Fraunces, Inter) sú hostované priamo cez <code>next/font</code>{" "}
          — pri načítaní stránky nejdú na Google žiadne požiadavky.
        </li>
        <li>
          Video v hlavičke sa načítava z tej istej domény, nie cez prehrávač
          tretej strany.
        </li>
      </ul>

      <h2>4. Tvoje práva</h2>
      <p>
        Podľa švajčiarskeho nDSG (a podľa GDPR, ak pristupuješ z EÚ/EHP) máš
        právo:
      </p>
      <ul>
        <li>
          požiadať o informácie o údajoch, ktoré sa o tebe spracúvajú (čl. 25
          nDSG / čl. 15 GDPR);
        </li>
        <li>
          dať opraviť nesprávne údaje (čl. 32 ods. 1 nDSG / čl. 16 GDPR);
        </li>
        <li>
          dať svoje údaje vymazať (čl. 32 ods. 2 písm. c nDSG / čl. 17 GDPR);
        </li>
        <li>
          namietať proti spracúvaniu (čl. 30 ods. 2 písm. b nDSG / čl. 21 GDPR);
        </li>
        <li>
          dostať svoje údaje v prenosnom formáte (čl. 28 nDSG / čl. 20 GDPR);
        </li>
        <li>
          podať sťažnosť dozornému orgánu — vo Švajčiarsku Spolkovému
          zmocnencovi pre ochranu údajov a informácií (EDÖB){" "}
          <a href="https://www.edoeb.admin.ch" rel="noopener noreferrer">
            www.edoeb.admin.ch
          </a>
          ; v EÚ dozornému orgánu krajiny tvojho pobytu.
        </li>
      </ul>
      <p>
        Ak chceš niektoré z týchto práv uplatniť, napíš na{" "}
        <Todo>adresa, ktorú tu chce Katarína zverejniť</Todo>. Odpoveď príde do
        30 dní.
      </p>

      <h2>5. Automatizované rozhodovanie</h2>
      <p>
        Neprebieha žiadne automatizované rozhodovanie, žiadne profilovanie a
        žiadne vyhodnocovanie tvojej otázky umelou inteligenciou. Katie číta
        každú správu sama.
      </p>

      <h2>6. Zmeny tohto dokumentu</h2>
      <p>
        Ak sa stránka alebo spôsob narábania s údajmi zmení, tento dokument sa
        aktualizuje a hore dostane nový dátum. Podstatné zmeny sa existujúcim
        klientkam a klientom oznámia priamo.
      </p>
    </>
  );
}
