import type { Metadata } from "next";
import { LegalShell, Todo } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy notice for Katarina Gröflin Coaching — how your data is handled under Swiss nDSG and the EU GDPR.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalShell
        eyebrow="Privacy notice · Datenschutz"
        title="How I handle your data."
        updated="28 July 2026"
      >
        <p>
          This page explains what personal data is collected when you use{" "}
          <em>katarina-coaching.vercel.app</em>, why, how long it&rsquo;s
          kept, and what rights you have. It is written to be
          understandable, not just compliant.
        </p>
        <p>
          Katarina&rsquo;s primary jurisdiction is Switzerland, so the
          revised Swiss Data Protection Act (nDSG, in force since 1 Sep
          2023) applies. If you visit from an EU/EEA member state, the
          EU General Data Protection Regulation (GDPR) additionally
          applies; both sets of rights are honoured together.
        </p>

        <h2>1. Who is responsible</h2>
        <p>
          The controller in the sense of Art. 5 lit. j nDSG (and Art. 4(7)
          GDPR for EU visitors) is:
        </p>
        <p>
          Katarina Gröflin
          <br />
          <Todo>street and number</Todo>
          <br />
          <Todo>postcode</Todo> Ettingen BL, Switzerland
          <br />
          Email: <Todo>hello@katarina-coaching.example</Todo>
        </p>

        <h2>2. What data is collected, and why</h2>

        <h3>2.1 When you visit the site</h3>
        <p>
          The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut,
          CA 91789, USA. When you load a page, Vercel receives technical
          data — IP address, timestamp, user-agent, referring URL — to
          serve the page and defend against abuse. This is a legitimate
          business purpose under Art. 31 para. 2 lit. c nDSG (and Art.
          6(1)(f) GDPR for EU visitors: legitimate interest in running the
          site securely).
        </p>
        <p>
          Vercel acts as a data processor under an executed Data
          Processing Addendum. The transfer to the USA is covered by
          Standard Contractual Clauses; the USA is currently recognised as
          providing adequate protection for EU-EU-U.S. Data Privacy
          Framework participants (Vercel is enrolled). For Swiss data,
          the transfer relies on Standard Contractual Clauses plus the
          Swiss-U.S. DPF where applicable.
        </p>

        <h3>2.2 When you use the contact form</h3>
        <p>
          The contact form collects your name, email address, the program
          you&rsquo;re interested in (optional), and your message. This
          data is used only to reply to your enquiry and, if you become a
          client, to arrange the discovery call.
        </p>
        <ul>
          <li>
            Purpose: reply to your enquiry / pre-contractual measures at
            your request (Art. 6 lit. a nDSG, i.e. lawful processing tied
            to a legitimate purpose; Art. 6(1)(b) GDPR for EU visitors).
          </li>
          <li>Recipients: Katarina Gröflin only.</li>
          <li>
            Technical processor: Resend Inc., 2261 Market Street #5039,
            San Francisco, CA 94114, USA — sends the email from the site
            to Katarina&rsquo;s inbox. Bound by a Data Processing Addendum
            and Standard Contractual Clauses; Resend is enrolled in the
            Swiss-U.S. and EU-U.S. Data Privacy Frameworks.
          </li>
          <li>
            Retention: kept as long as needed to complete the conversation,
            and — if you become a client — for the duration of the
            coaching relationship plus any statutory retention periods
            (10 years for accounting-related correspondence under Art. 958f
            OR,{" "}
            <Todo>confirm scope with Katarina&rsquo;s tax advisor</Todo>).
            If nothing comes of the enquiry, the message is deleted within
            12 months.
          </li>
        </ul>

        <h3>2.3 A honeypot field</h3>
        <p>
          The form has a hidden field that&rsquo;s invisible to humans but
          usually filled in by spam bots. If it&rsquo;s filled, the message
          is silently discarded. No data is stored in that case.
        </p>

        <h2>3. What is not done here</h2>
        <ul>
          <li>No cookies are set. No consent banner is needed.</li>
          <li>
            No third-party analytics (no Google Analytics, no Meta Pixel,
            no Plausible, no Fathom).
          </li>
          <li>No advertising trackers.</li>
          <li>
            Fonts (Fraunces, Inter) are self-hosted via{" "}
            <code>next/font</code> — no requests go to Google when you load
            a page.
          </li>
          <li>
            The hero video is served from the same domain, not embedded
            from a third-party player.
          </li>
        </ul>

        <h2>4. Your rights</h2>
        <p>
          Under the Swiss nDSG (and the GDPR, if you visit from the EU/EEA)
          you have the right to:
        </p>
        <ul>
          <li>
            request information about the data held about you (Art. 25 nDSG
            / Art. 15 GDPR);
          </li>
          <li>
            have inaccurate data corrected (Art. 32 para. 1 nDSG / Art. 16
            GDPR);
          </li>
          <li>have your data deleted (Art. 32 para. 2 lit. c nDSG / Art. 17 GDPR);</li>
          <li>object to processing (Art. 30 para. 2 lit. b nDSG / Art. 21 GDPR);</li>
          <li>
            receive your data in a portable format (Art. 28 nDSG / Art. 20
            GDPR);
          </li>
          <li>
            lodge a complaint with a supervisory authority — in Switzerland
            the Federal Data Protection and Information Commissioner
            (FDPIC/EDÖB){" "}
            <a href="https://www.edoeb.admin.ch" rel="noopener noreferrer">
              www.edoeb.admin.ch
            </a>
            ; in the EU, the data protection authority of your country of
            residence.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <Todo>hello@katarina-coaching.example</Todo>. A reply follows
          within 30 days.
        </p>

        <h2>5. Automated decisions</h2>
        <p>
          There is no automated decision-making, no profiling, and no AI
          evaluation of your enquiry. Katarina reads every message
          herself.
        </p>

        <h2>6. Changes to this notice</h2>
        <p>
          If the site or its data-handling practices change, this notice is
          updated and re-dated at the top. Meaningful changes will be
          communicated to existing clients directly.
        </p>
      </LegalShell>
    </>
  );
}
