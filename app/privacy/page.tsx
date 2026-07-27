import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { LegalShell, Todo } from "@/components/site/legal-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Katarina Gröflin Coaching handles your data — plain-language privacy notice, GDPR-compliant.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <LegalShell
          eyebrow="Privacy notice"
          title="How I handle your data."
          updated="26 July 2026"
        >
          <p>
            This page explains what personal data is collected when you use{" "}
            <em>katarina-coaching.vercel.app</em>, why, how long it&rsquo;s
            kept, and what rights you have. It&rsquo;s written to be
            understandable, not just compliant.
          </p>

          <h2>1. Who is responsible</h2>
          <p>
            The controller (in the sense of Art. 4 (7) GDPR) for personal data
            processed via this site is:
          </p>
          <p>
            Katarina Gröflin
            <br />
            <Todo>street and number</Todo>
            <br />
            <Todo>postcode and city, country</Todo>
            <br />
            Email: <Todo>hello@katarina-coaching.example</Todo>
          </p>

          <h2>2. What data is collected, and why</h2>

          <h3>2.1 When you visit the site</h3>
          <p>
            The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, USA. When you load a page, Vercel receives technical
            data — IP address, timestamp, user-agent, referring URL — for the
            purpose of delivering the page and defending against abuse. Legal
            basis: Art. 6 (1)(f) GDPR (legitimate interest in running the
            site securely). Vercel is a data processor under a signed Data
            Processing Addendum with Standard Contractual Clauses for the
            EU-to-US transfer.
          </p>

          <h3>2.2 When you use the contact form</h3>
          <p>
            The contact form collects your name, email address, the program
            you&rsquo;re interested in (optional), and your message. This
            data is used only to reply to your enquiry and, if you become a
            client, to arrange the discovery call.
          </p>
          <ul>
            <li>Legal basis: Art. 6 (1)(b) GDPR (pre-contractual measures at your request).</li>
            <li>Recipients: Katarina Gröflin only.</li>
            <li>
              Technical processor: Resend Inc., 2261 Market Street #5039, San
              Francisco, CA 94114, USA — sends the email from the site to
              Katarina&rsquo;s inbox. Bound by a Data Processing Addendum and
              Standard Contractual Clauses.
            </li>
            <li>
              Retention: kept as long as needed to complete the conversation,
              and — if you become a client — for the duration of the coaching
              relationship plus statutory retention periods (typically up to
              10 years for invoice-related correspondence,{" "}
              <Todo>confirm with Katarina&rsquo;s tax advisor</Todo>).
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
            <li>No third-party analytics (no Google Analytics, no Meta Pixel).</li>
            <li>No advertising trackers.</li>
            <li>
              Fonts (Fraunces, Inter) are self-hosted via{" "}
              <code>next/font</code> — no requests go to Google when you load
              a page.
            </li>
          </ul>

          <h2>4. Your rights</h2>
          <p>Under the GDPR you have the right to:</p>
          <ul>
            <li>request access to the data held about you (Art. 15);</li>
            <li>have inaccurate data corrected (Art. 16);</li>
            <li>have your data deleted (Art. 17);</li>
            <li>restrict processing (Art. 18);</li>
            <li>receive your data in a portable format (Art. 20);</li>
            <li>object to processing based on legitimate interest (Art. 21);</li>
            <li>
              lodge a complaint with a supervisory authority — for Germany
              this is the data protection authority of your federal state; for
              Switzerland the FDPIC{" "}
              <a
                href="https://www.edoeb.admin.ch"
                rel="noopener noreferrer"
              >
                www.edoeb.admin.ch
              </a>
              .
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <Todo>hello@katarina-coaching.example</Todo>. A reply follows
            within one month.
          </p>

          <h2>5. Automated decisions</h2>
          <p>
            There is no automated decision-making, no profiling, and no AI
            evaluation of your enquiry. Katarina reads every message herself.
          </p>

          <h2>6. Changes to this notice</h2>
          <p>
            If the site or its data-handling practices change, this notice is
            updated and re-dated at the top. Meaningful changes will be
            communicated to existing clients directly.
          </p>
        </LegalShell>
      </main>
      <Footer />
    </>
  );
}
