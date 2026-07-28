import type { Metadata } from "next";
import { LegalShell, Todo } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal notice for Katarina Gröflin Coaching.",
  robots: { index: true, follow: true },
};

export default function ImprintPage() {
  return (
    <>
      <LegalShell
          eyebrow="Legal notice"
          title="Imprint."
          updated="26 July 2026"
        >
          <p>
            Information according to § 5 TMG (Germany) /
            Art. 322 CO (Switzerland — adapt as applicable).
          </p>

          <h2>Operator</h2>
          <p>
            Katarina Gröflin
            <br />
            <Todo>street and number</Todo>
            <br />
            <Todo>postcode and city</Todo>
            <br />
            <Todo>country</Todo>
          </p>

          <h2>Contact</h2>
          <p>
            Email: <Todo>hello@katarina-coaching.example</Todo>
            <br />
            Phone: <Todo>+41 / +49 phone number, if you want it public</Todo>
          </p>

          <h2>VAT / tax</h2>
          <p>
            VAT identification number according to §27a UStG:{" "}
            <Todo>VAT ID, or note “not VAT-registered (small business)”</Todo>
          </p>

          <h2>Professional titles &amp; regulator</h2>
          <p>
            Personal Trainer &amp; Nutrition Coach —{" "}
            <Todo>issuing body of each certificate, country of issue</Todo>
            . These are not state-regulated professions in Germany /
            Switzerland; no chamber membership required.
          </p>

          <h2>Editorially responsible (V.i.S.d.P.)</h2>
          <p>
            Katarina Gröflin, address as above.
          </p>

          <h2>Professional liability insurance</h2>
          <p>
            <Todo>insurer name</Todo>,{" "}
            <Todo>insurer address</Todo>. Scope of coverage:{" "}
            <Todo>Germany / EU / Switzerland — remove what doesn’t apply</Todo>.
          </p>

          <h2>Dispute resolution</h2>
          <p>
            The European Commission provides a platform for online dispute
            resolution:{" "}
            <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>
            . I am not obliged, nor willing, to participate in a dispute
            resolution procedure before a consumer arbitration board.
          </p>

          <h2>Liability for content</h2>
          <p>
            As a service provider I am responsible for my own content on these
            pages according to §7 (1) TMG. Under §§8 to 10 TMG, however, I am
            not obliged to monitor transmitted or stored external information.
            Obligations to remove or block the use of information under general
            laws remain unaffected.
          </p>

          <h2>Liability for links</h2>
          <p>
            This site may contain links to external websites over which I have
            no control. I cannot therefore accept any responsibility for their
            content. The respective provider or operator of the linked pages is
            always responsible for their content.
          </p>

          <h2>Copyright</h2>
          <p>
            Content and works on these pages created by the operator are
            subject to German / Swiss copyright law. Duplication, processing,
            distribution, or any form of commercialisation outside the limits
            of copyright require the written consent of the respective author
            or creator.
          </p>
        </LegalShell>
    </>
  );
}
