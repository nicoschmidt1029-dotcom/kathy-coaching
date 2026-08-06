import { Todo } from "@/components/site/todo";

/**
 * Imprint — English (source version).
 *
 * Swiss law throughout: Art. 3 lit. s UWG, not the German TMG. Keep the
 * article citations byte-identical across the three languages; only the
 * surrounding prose is translated. No real data anywhere — every fact Katie
 * has to supply stays a <Todo>.
 */
export function ImprintBodyEn() {
  return (
    <>
      <p>
        Information provided in accordance with Art. 3 lit. s of the Swiss
        Federal Act against Unfair Competition (UWG).
      </p>

      <h2>Operator</h2>
      <p>
        Katarina Gröflin
        <br />
        <Todo>street and house number</Todo>
        <br />
        <Todo>postcode</Todo> Ettingen BL
        <br />
        Switzerland
      </p>

      <h2>Contact</h2>
      <p>
        Email: <Todo>the address Katarina wants published here</Todo>
        <br />
        Phone: <Todo>a number, or confirmation that none is published</Todo>
      </p>

      <h2>Business identification</h2>
      <p>
        UID (Unternehmens-Identifikationsnummer):{" "}
        <Todo>the UID, or confirmation that the business is not registered</Todo>
        <br />
        MWST-Nr. (VAT):{" "}
        <Todo>
          the VAT number, or confirmation that the business is not
          VAT-registered
        </Todo>
        <br />
        Commercial register (Handelsregister):{" "}
        <Todo>the register entry, or confirmation that no entry is required</Todo>
      </p>

      <h2>Professional titles</h2>
      <p>
        Personal Trainer &amp; Nutrition Coach —{" "}
        <Todo>the body that issued each certificate</Todo>. These are not
        state-regulated professions in Switzerland; no cantonal licence or
        chamber membership is required. Voluntary recognition (e.g. EMR / ASCA
        / RME for complementary nutrition services) —{" "}
        <Todo>
          the registration number if one exists, otherwise this sentence is
          deleted
        </Todo>
        .
      </p>

      <h2>Professional liability insurance</h2>
      <p>
        Insurer: <Todo>name of the insurer</Todo>,{" "}
        <Todo>address of the insurer</Todo>. Coverage:{" "}
        <Todo>
          the territory the policy actually covers — do not assume Switzerland
          only
        </Todo>
        .
      </p>

      <h2>Editorial responsibility</h2>
      <p>
        Katarina Gröflin, address as above, is responsible for the content of
        this site.
      </p>

      <h2>Dispute resolution</h2>
      <p>
        There is no obligation under Swiss law to participate in a consumer
        arbitration procedure. Katie is not, at this time, willing to
        participate in one either. EU-resident visitors may use the European
        Commission&rsquo;s online dispute resolution platform at{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>Liability for content</h2>
      <p>
        Content on this site is prepared with care but is offered without any
        warranty of completeness, currency, or fitness for purpose. The
        operator accepts no liability for damages resulting from the use, or
        inability to use, information provided here, to the extent permitted
        by Art. 100 et seq. of the Swiss Code of Obligations (OR).
      </p>

      <h2>Liability for links</h2>
      <p>
        This site may contain links to external websites over which the
        operator has no control. No responsibility is accepted for their
        content. The respective provider or operator of the linked pages is
        always responsible for their own content.
      </p>

      <h2>Copyright</h2>
      <p>
        Text, images, and layout on this site — where authored by the operator
        — are protected under the Swiss Federal Act on Copyright (URG).
        Duplication, distribution, or any commercial use outside the limits of
        copyright law requires the written consent of the respective author.
      </p>
    </>
  );
}
