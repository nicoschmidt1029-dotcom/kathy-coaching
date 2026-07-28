import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute discovery call with Katarina Gröflin. No commitment — just a real conversation about whether coaching together is a fit.",
};

export default function KontaktPage() {
  return (
    <>
      <Contact />
      <section className="border-t border-foreground/[0.08] py-10">
        <div className="container-page text-center text-[0.85rem] text-foreground/55">
          <p>
            Legal:{" "}
            <Link
              href="/imprint"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Imprint
            </Link>{" "}
            ·{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Privacy
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
