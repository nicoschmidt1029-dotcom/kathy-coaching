import Link from "next/link";
import { Wordmark } from "./wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-foreground/[0.08] bg-background">
      <div className="container-page py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-[0.92rem] leading-relaxed text-foreground/65">
              Holistic coaching for body, nutrition, and soul — rooted in
              faith, open to everyone.
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-[0.92rem] text-foreground/70 sm:flex-row sm:gap-6">
            <Link
              href="/imprint"
              className="transition-colors hover:text-foreground"
            >
              Imprint
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#contact"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-foreground/[0.07] pt-6 text-[0.8rem] text-foreground/50 sm:flex-row sm:items-center">
          <p>© {year} Katarina Coaching. All rights reserved.</p>
          <p className="caption">Made with care</p>
        </div>
      </div>
    </footer>
  );
}
