/* ==========================================================================
 * LEGAL CONTENT - NOT YET VERIFIED BY A LAWYER OR SWISS LEGAL EXPERT -
 * review before this page is considered final
 * --------------------------------------------------------------------------
 * Gilt für den gesamten Text, nicht nur für die <Todo>-Platzhalter: Wahl der
 * Rechtsgrundlage, Artikelverweise, Haftungs- und Urheberrechtsformulierungen
 * und die Frage, ob die Angaben für Katarinas tatsächliche Tätigkeit
 * vollständig sind. Nichts davon hat jemand mit Schweizer Rechtskenntnis
 * geprüft. Diese Fassung ist zudem aus dem Englischen übersetzt — auch die
 * Übersetzung juristischer Begriffe gehört gegengelesen.
 * ========================================================================== */

import { Todo } from "@/components/site/todo";

/**
 * Impressum — German.
 *
 * Schweizer Recht, nicht deutsches TMG: Grundlage ist Art. 3 lit. s UWG.
 * Die Artikelverweise sind absichtlich wortgleich mit der englischen Fassung
 * — übersetzt wird nur der erklärende Text, nie die Rechtsgrundlage. Alle
 * echten Angaben bleiben <Todo>-Platzhalter.
 */
export function ImprintBodyDe() {
  return (
    <>
      <p>
        Angaben gemäss Art. 3 lit. s des Bundesgesetzes gegen den unlauteren
        Wettbewerb (UWG).
      </p>

      <h2>Betreiberin</h2>
      <p>
        Katarina Gröflin
        <br />
        <Todo>Strasse und Hausnummer</Todo>
        <br />
        <Todo>Postleitzahl</Todo> Ettingen BL
        <br />
        Schweiz
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: katey.coaching.newlife@gmail.com
        <br />
        Telefon:{" "}
        <Todo>eine Nummer, oder die Bestätigung, dass keine veröffentlicht wird</Todo>
      </p>

      <h2>Unternehmensidentifikation</h2>
      <p>
        UID (Unternehmens-Identifikationsnummer):{" "}
        <Todo>
          die UID, oder die Bestätigung, dass das Unternehmen nicht eingetragen
          ist
        </Todo>
        <br />
        MWST-Nr.:{" "}
        <Todo>
          die Mehrwertsteuernummer, oder die Bestätigung, dass keine
          MWST-Pflicht besteht
        </Todo>
        <br />
        Handelsregister:{" "}
        <Todo>
          der Registereintrag, oder die Bestätigung, dass kein Eintrag nötig ist
        </Todo>
      </p>

      <h2>Berufsbezeichnungen</h2>
      <p>
        Personal Trainerin &amp; Ernährungsberaterin —{" "}
        <Todo>die Stelle, die das jeweilige Zertifikat ausgestellt hat</Todo>.
        Das sind in der Schweiz keine staatlich reglementierten Berufe; eine
        kantonale Bewilligung oder Kammermitgliedschaft ist nicht erforderlich.
        Freiwillige Anerkennung (z.&nbsp;B. EMR / ASCA / RME für komplementäre
        Ernährungsleistungen) —{" "}
        <Todo>
          die Registriernummer, falls vorhanden, sonst entfällt dieser Satz
        </Todo>
        .
      </p>

      <h2>Berufshaftpflichtversicherung</h2>
      <p>
        Versicherer: <Todo>Name des Versicherers</Todo>,{" "}
        <Todo>Adresse des Versicherers</Todo>. Geltungsbereich:{" "}
        <Todo>
          das tatsächlich versicherte Gebiet — nicht einfach die Schweiz
          annehmen
        </Todo>
        .
      </p>

      <h2>Inhaltliche Verantwortung</h2>
      <p>
        Für den Inhalt dieser Website verantwortlich ist Katarina Gröflin,
        Adresse wie oben.
      </p>

      <h2>Streitbeilegung</h2>
      <p>
        Nach Schweizer Recht besteht keine Pflicht, an einem
        Streitbeilegungsverfahren für Konsumentinnen und Konsumenten
        teilzunehmen. Katey ist derzeit auch nicht bereit, an einem solchen
        teilzunehmen. Besucherinnen und Besucher mit Wohnsitz in der EU können
        die Online-Streitbeilegungsplattform der Europäischen Kommission nutzen:{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website werden mit Sorgfalt erstellt, jedoch ohne
        Gewähr für Vollständigkeit, Aktualität oder Eignung für einen bestimmten
        Zweck. Die Betreiberin haftet nicht für Schäden, die aus der Nutzung
        oder Nichtnutzung der hier bereitgestellten Informationen entstehen,
        soweit dies nach Art. 100 ff. des Schweizerischen Obligationenrechts
        (OR) zulässig ist.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website kann Links zu externen Websites enthalten, auf die die
        Betreiberin keinen Einfluss hat. Für deren Inhalte wird keine Haftung
        übernommen. Für die Inhalte verlinkter Seiten ist stets deren Anbieter
        oder Betreiber verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Texte, Bilder und Gestaltung dieser Website sind, soweit von der
        Betreiberin erstellt, nach dem Schweizerischen Urheberrechtsgesetz
        (URG) geschützt. Vervielfältigung, Verbreitung oder jede kommerzielle
        Nutzung ausserhalb der Schranken des Urheberrechts bedarf der
        schriftlichen Zustimmung der jeweiligen Urheberin oder des jeweiligen
        Urhebers.
      </p>
    </>
  );
}
