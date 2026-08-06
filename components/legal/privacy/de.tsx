/* ==========================================================================
 * LEGAL CONTENT - NOT YET VERIFIED BY A LAWYER OR SWISS LEGAL EXPERT -
 * review before this page is considered final
 * --------------------------------------------------------------------------
 * Gilt für den gesamten Text, nicht nur für die <Todo>-Platzhalter: die nDSG-
 * und DSGVO-Verweise, die genannten Rechtsgrundlagen, die Aufbewahrungsfristen
 * und die Aussagen zu den Übermittlungsmechanismen von Vercel und Resend.
 * Nichts davon hat jemand mit Schweizer Datenschutzkenntnis geprüft, und
 * gerade Angemessenheitsbeschlüsse und Framework-Zertifizierungen veralten.
 * Diese Fassung ist zudem aus dem Englischen übersetzt.
 * ========================================================================== */

import { Todo } from "@/components/site/todo";
import { SITE_HOST } from "@/lib/site-url";

/**
 * Datenschutzerklärung — German.
 *
 * Schweizer Recht zuerst (nDSG), DSGVO zusätzlich für Besuchende aus der EU.
 * Die Artikelverweise sind absichtlich wortgleich mit der englischen Fassung
 * — übersetzt wird nur der erklärende Text, nie die Rechtsgrundlage. Alle
 * echten Angaben bleiben <Todo>-Platzhalter.
 */
export function PrivacyBodyDe() {
  return (
    <>
      <p>
        Diese Seite erklärt, welche Personendaten bei der Nutzung von{" "}
        <em>{SITE_HOST}</em> erhoben werden, warum, wie lange sie aufbewahrt
        werden und welche Rechte du hast. Sie ist so geschrieben, dass man sie
        versteht — nicht nur so, dass sie den Vorschriften genügt.
      </p>
      <p>
        Katies Hauptsitz ist die Schweiz, deshalb gilt das revidierte
        Datenschutzgesetz (nDSG, in Kraft seit 1. September 2023). Wenn du aus
        einem EU-/EWR-Staat zugreifst, gilt zusätzlich die
        EU-Datenschutz-Grundverordnung (DSGVO); beide Rechtekataloge werden
        gemeinsam eingehalten.
      </p>

      <h2>1. Wer verantwortlich ist</h2>
      <p>
        Verantwortliche im Sinne von Art. 5 lit. j nDSG (und Art. 4 Abs. 7
        DSGVO für Besuchende aus der EU) ist:
      </p>
      <p>
        Katarina Gröflin
        <br />
        <Todo>Strasse und Hausnummer</Todo>
        <br />
        <Todo>Postleitzahl</Todo> Ettingen BL, Schweiz
        <br />
        E-Mail: <Todo>die Adresse, die Katarina hier veröffentlichen möchte</Todo>
      </p>

      <h2>2. Welche Daten erhoben werden, und wozu</h2>

      <h3>2.1 Beim Besuch der Website</h3>
      <p>
        Die Website wird von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA gehostet. Beim Laden einer Seite erhält Vercel technische
        Daten — IP-Adresse, Zeitstempel, User-Agent, verweisende URL — um die
        Seite auszuliefern und Missbrauch abzuwehren. Das ist ein legitimer
        Geschäftszweck nach Art. 31 Abs. 2 lit. c nDSG (und Art. 6 Abs. 1 lit. f
        DSGVO für Besuchende aus der EU: berechtigtes Interesse am sicheren
        Betrieb der Website).
      </p>
      <p>
        Vercel handelt als Auftragsbearbeiterin auf Grundlage eines
        abgeschlossenen Data Processing Addendum. Die Übermittlung in die USA
        ist durch Standardvertragsklauseln abgedeckt; für Teilnehmer am
        EU-U.S. Data Privacy Framework gelten die USA derzeit als Land mit
        angemessenem Schutzniveau (Vercel ist zertifiziert). Für Schweizer
        Daten stützt sich die Übermittlung auf Standardvertragsklauseln sowie,
        soweit anwendbar, auf das Swiss-U.S. DPF.
      </p>

      <h3>2.2 Bei Nutzung des Kontaktformulars</h3>
      <p>
        Das Kontaktformular erhebt deinen Namen, deine E-Mail-Adresse, die
        Sprache, in der du eine Antwort bevorzugst (optional), woher du
        schreibst (optional) und deine Nachricht. Diese Daten werden
        ausschliesslich verwendet, um deine Anfrage zu beantworten und — falls
        eine Zusammenarbeit entsteht — um die weitere Arbeit zu organisieren.
      </p>
      <ul>
        <li>
          Zweck: Beantwortung deiner Anfrage / vorvertragliche Massnahmen auf
          deinen Wunsch (Art. 6 lit. a nDSG, also rechtmässige Bearbeitung zu
          einem legitimen Zweck; Art. 6 Abs. 1 lit. b DSGVO für Besuchende aus
          der EU).
        </li>
        <li>Empfängerin: ausschliesslich Katarina Gröflin.</li>
        <li>
          Technische Auftragsbearbeiterin: Resend Inc., 2261 Market Street
          #5039, San Francisco, CA 94114, USA — versendet die E-Mail von der
          Website an Katies Postfach. Gebunden durch ein Data Processing
          Addendum und Standardvertragsklauseln; Resend ist im Swiss-U.S. und
          im EU-U.S. Data Privacy Framework zertifiziert.
        </li>
        <li>
          Aufbewahrung: so lange, wie es zum Abschluss des Gesprächs nötig ist,
          und — falls eine Zusammenarbeit entsteht — für die Dauer der
          Coaching-Beziehung zuzüglich gesetzlicher Aufbewahrungsfristen
          (10 Jahre für buchhaltungsrelevante Korrespondenz nach Art. 958f OR,{" "}
          <Todo>Umfang mit Katies Steuerberatung klären</Todo>). Führt die
          Anfrage zu nichts, wird die Nachricht innerhalb von 12 Monaten
          gelöscht.
        </li>
      </ul>

      <h3>2.3 Ein Honeypot-Feld</h3>
      <p>
        Das Formular enthält ein verstecktes Feld, das für Menschen unsichtbar
        ist, von Spam-Bots aber meist ausgefüllt wird. Ist es ausgefüllt, wird
        die Nachricht stillschweigend verworfen. In diesem Fall werden keine
        Daten gespeichert.
      </p>

      <h2>3. Was hier nicht passiert</h2>
      <ul>
        <li>Es werden keine Cookies gesetzt. Ein Consent-Banner ist nicht nötig.</li>
        <li>
          Keine Analyse-Dienste von Dritten (kein Google Analytics, kein Meta
          Pixel, kein Plausible, kein Fathom).
        </li>
        <li>Keine Werbe-Tracker.</li>
        <li>
          Die Schriften (Fraunces, Inter) werden über <code>next/font</code>{" "}
          selbst ausgeliefert — beim Laden einer Seite gehen keine Anfragen an
          Google.
        </li>
        <li>
          Das Hero-Video wird von derselben Domain ausgeliefert und nicht über
          einen fremden Player eingebunden.
        </li>
      </ul>

      <h2>4. Deine Rechte</h2>
      <p>
        Nach dem Schweizer nDSG (und nach der DSGVO, wenn du aus der EU/dem EWR
        zugreifst) hast du das Recht:
      </p>
      <ul>
        <li>
          Auskunft über die zu dir bearbeiteten Daten zu verlangen (Art. 25 nDSG
          / Art. 15 DSGVO);
        </li>
        <li>
          unrichtige Daten berichtigen zu lassen (Art. 32 Abs. 1 nDSG / Art. 16
          DSGVO);
        </li>
        <li>
          deine Daten löschen zu lassen (Art. 32 Abs. 2 lit. c nDSG / Art. 17
          DSGVO);
        </li>
        <li>
          der Bearbeitung zu widersprechen (Art. 30 Abs. 2 lit. b nDSG / Art. 21
          DSGVO);
        </li>
        <li>
          deine Daten in einem übertragbaren Format zu erhalten (Art. 28 nDSG /
          Art. 20 DSGVO);
        </li>
        <li>
          bei einer Aufsichtsbehörde Beschwerde zu erheben — in der Schweiz beim
          Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB){" "}
          <a href="https://www.edoeb.admin.ch" rel="noopener noreferrer">
            www.edoeb.admin.ch
          </a>
          ; in der EU bei der Datenschutzbehörde deines Wohnsitzstaates.
        </li>
      </ul>
      <p>
        Um eines dieser Rechte auszuüben, schreib an{" "}
        <Todo>die Adresse, die Katarina hier veröffentlichen möchte</Todo>. Eine
        Antwort folgt innerhalb von 30 Tagen.
      </p>

      <h2>5. Automatisierte Entscheidungen</h2>
      <p>
        Es findet keine automatisierte Entscheidungsfindung statt, kein
        Profiling und keine KI-Auswertung deiner Anfrage. Katie liest jede
        Nachricht selbst.
      </p>

      <h2>6. Änderungen dieser Erklärung</h2>
      <p>
        Ändern sich die Website oder der Umgang mit Daten, wird diese Erklärung
        aktualisiert und oben neu datiert. Wesentliche Änderungen werden
        bestehenden Klientinnen und Klienten direkt mitgeteilt.
      </p>
    </>
  );
}
