import type { Metadata } from "next";
import { LegalShell, Todo } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal notice (Impressum) for Katie Coaching, Ettingen (BL), Switzerland.",
  robots: { index: true, follow: true },
};

export default function ImprintPage() {
  return (
    <>
      <LegalShell
        eyebrow="Legal notice · Impressum"
        title="Imprint."
        updated="28 July 2026"
      >
        <p>
          Information provided in accordance with Art. 3 lit. s of the
          Swiss Federal Act against Unfair Competition (UWG).
        </p>

        <h2>Operator</h2>
        <p>
          Katarina Gröflin
          <br />
          <Todo>street and number</Todo>
          <br />
          <Todo>postcode</Todo> Ettingen BL
          <br />
          Switzerland
        </p>

        <h2>Contact</h2>
        <p>
          Email: <Todo>hello@katarina-coaching.example</Todo>
          <br />
          Phone (optional): <Todo>+41 phone number, if you want it public</Todo>
        </p>

        <h2>Business identification</h2>
        <p>
          UID (Unternehmens-Identifikationsnummer):{" "}
          <Todo>CHE-xxx.xxx.xxx or note “not registered — sole proprietorship below CHF 100,000 turnover”</Todo>
          <br />
          MWST-Nr. (VAT):{" "}
          <Todo>CHE-xxx.xxx.xxx MWST, or note “not VAT-registered”</Todo>
          <br />
          Commercial register (Handelsregister):{" "}
          <Todo>entry details, or note “not required at current turnover”</Todo>
        </p>

        <h2>Professional titles</h2>
        <p>
          Personal Trainer &amp; Nutrition Coach —{" "}
          <Todo>issuing body of each certificate</Todo>. These are not
          state-regulated professions in Switzerland; no cantonal licence
          or chamber membership is required. Voluntary recognition (e.g.
          EMR / ASCA / RME for complementary nutrition services) —{" "}
          <Todo>add EMR/ASCA/RME number if applicable, otherwise remove</Todo>.
        </p>

        <h2>Professional liability insurance</h2>
        <p>
          Insurer: <Todo>insurer name</Todo>,{" "}
          <Todo>insurer address</Todo>. Coverage: Switzerland{" "}
          <Todo>(add EU if you coach clients abroad)</Todo>.
        </p>

        <h2>Editorial responsibility</h2>
        <p>
          Katarina Gröflin, address as above, is responsible for the
          content of this site.
        </p>

        <h2>Dispute resolution</h2>
        <p>
          There is no obligation under Swiss law to participate in a
          consumer arbitration procedure. Katie is not, at this time,
          willing to participate in one either. EU-resident visitors may
          use the European Commission&rsquo;s online dispute resolution
          platform at{" "}
          <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>

        <h2>Liability for content</h2>
        <p>
          Content on this site is prepared with care but is offered without
          any warranty of completeness, currency, or fitness for purpose.
          The operator accepts no liability for damages resulting from the
          use, or inability to use, information provided here, to the
          extent permitted by Art. 100 et seq. of the Swiss Code of
          Obligations (OR).
        </p>

        <h2>Liability for links</h2>
        <p>
          This site may contain links to external websites over which the
          operator has no control. No responsibility is accepted for their
          content. The respective provider or operator of the linked pages
          is always responsible for their own content.
        </p>

        <h2>Copyright</h2>
        <p>
          Text, images, and layout on this site — where authored by the
          operator — are protected under the Swiss Federal Act on Copyright
          (URG). Duplication, distribution, or any commercial use outside
          the limits of copyright law requires the written consent of the
          respective author.
        </p>
      </LegalShell>
    </>
  );
}
