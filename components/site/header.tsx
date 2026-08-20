"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { Wordmark } from "./wordmark";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

/** Every item is a real route now, not an anchor on the home scroll —
 *  Katarina's explicit request: clicking a nav item navigates to its own
 *  page instead of scrolling down from Home. */
const NAV = [
  { key: "about", href: "/katey" },
  { key: "mission", href: "/mission" },
  { key: "programs", href: "/programme" },
  { key: "recipes", href: "/recipes" },
  { key: "contact", href: "/kontakt" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Permanent hairline restored, 2026-08-18 client pass: Katarina
        // remembered a soft gray line under the header that had gone
        // missing — it used to only appear once `scrolled` was true. Now
        // always present at very low opacity so the header reads as a
        // defined, premium band against the ivory body even at the top
        // of the page; the scrolled state still adds the blur/opaque
        // background on top of it, it just no longer owns the border.
        "sticky top-0 z-40 w-full border-b border-foreground/[0.06] shadow-[0_1px_16px_-4px_rgba(30,26,20,0.06)] transition-[background-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-background/75 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      {/* Mobile header compacted: py-2.5 (was py-3, matching the desktop
          py-4 ratio less closely so the row doesn't carry so much empty
          air above/below the taller full-lockup logo) — md+ untouched.
          2026-08-19 mobile-refinement pass: py-2.5 -> py-1.5 — client asked
          for a shorter header without shrinking the logo itself, so this
          only trims the empty padding above/below it (logo width in
          wordmark.tsx is untouched, "HEALTH · FITNESS · FAITH" stays the
          same legible size). md+ still untouched. */}
      <div className="container-page flex items-center justify-between gap-6 py-1.5 md:py-3.5">
        <Wordmark />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                                className={cn(
                  // nowrap: two-word labels in other languages ("O mne")
                  // otherwise break across lines in the narrow desktop nav.
                  // 2026-08-18 client pass: text bumped 0.92rem -> 0.97rem
                  // and given a touch of letter-spacing (tracking-[0.01em])
                  // — both subtle, per Katarina's "slightly bigger, not
                  // dramatic" note — and inactive opacity raised from /72
                  // to /82 so it reads as confident dark-gray rather than
                  // washed-out light gray against the ivory header.
                  // 2026-08-19 follow-up: still read a touch light/tight —
                  // tracking nudged 0.01em -> 0.02em, inactive opacity
                  // /82 -> /90. Both still subtle per her explicit "do not
                  // overdo it" — font/size unchanged from the pass above.
                  // 2026-08-19, header-balance pass: with the wordmark's
                  // text row now rendering larger (see wordmark.tsx), the
                  // 0.97rem nav read oversized next to it and the whole
                  // header felt heavy. Trimmed to 0.85rem, gap-8 -> gap-7,
                  // tracking eased back 0.02em -> 0.015em to match the
                  // smaller size — still comfortably above 12px real
                  // rendered size, still readable at a glance.
                  "group relative whitespace-nowrap text-[0.85rem] tracking-[0.015em] transition-colors duration-200",
                  active
                    ? "text-foreground"
                    : "text-foreground/90 hover:text-foreground"
                )}
              >
                {t(item.key)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-[var(--clay)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher className="hidden lg:flex" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              {/* 2026-08-19 mobile-refinement pass: icon-lg's default svg
                  (size-4, 16px) read small against the now-larger logo —
                  tap box bumped size-9 (36px) -> size-10 (40px) and the
                  icon itself to size-5 (20px), still comfortably inside
                  "elegant, not oversized". Desktop untouched — this button
                  only renders below md. */}
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={t("openMenu")}
                className="size-10 lg:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            {/*
              2026-08-18 client design pass: "der menu ist einfach gross und
              sieht unprofessionell aus" — the previous drawer was a flat
              list of same-weight links with a lot of dead air around them.
              Redesigned to borrow the same type-contrast move the rest of
              the site uses (.eyebrow small-caps label, big display serif,
              gold hairline accents): each item now gets a small mono index
              number, a large confident display-serif label, and a hairline
              divider between rows instead of empty padding doing the work.
              The current page gets the gold (--clay) index + underline
              treatment so it reads as a real "you are here" state, echoing
              the desktop active-link underline.
            */}
            {/* 2026-08-18 same-day follow-up: "too basic" / panel too big
                and the items too small. Panel narrowed from the shadcn
                default (w-3/4 sm:max-w-sm, ~300px+) to a compact
                right-aligned drawer (w-[78vw] max-w-[300px], overridden
                here rather than in sheet.tsx since every other Sheet use
                on the site should keep the default width) and the nav
                item type bumped up (2rem/2.15rem -> 2.35rem/2.5rem, plus
                font-medium) so four words carry more visual weight in the
                narrower column instead of reading thin against all the
                white space the old wide panel had. Numbered index + gold
                active-state language kept, index/gap tightened slightly
                to match. */}
            {/* 2026-08-19, second follow-up: 62vw/240px still read as
                "about half the page" — cut to 52vw/210px (230px at sm),
                clearly under half-width even on the narrowest phones.
                Nav item font size below was trimmed together with this
                (2.35rem/2.5rem -> 2rem/2.15rem) since "Meine Mission"/
                "My mission" would otherwise wrap at this width — kept the
                same weight/index/hairline treatment, just sized to fit
                the narrower column. */}
            <SheetContent
              side="right"
              className="flex w-[52vw] max-w-[210px] flex-col bg-background p-0 sm:max-w-[230px]"
            >
              <SheetHeader className="border-b border-foreground/[0.06] px-5 py-4">
                <SheetTitle className="eyebrow text-left font-mono text-xs font-medium">
                  {t("menu")}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-1 flex-col justify-center px-5">
                {NAV.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex items-baseline gap-3 border-t border-foreground/[0.08] py-4 first:border-t-0 transition-colors",
                          i === NAV.length - 1 && "border-b border-foreground/[0.08]"
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "font-mono text-[0.68rem] tracking-[0.1em] transition-colors",
                            active ? "text-[var(--clay)]" : "text-foreground/40"
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[1.85rem] leading-none font-medium tracking-tight transition-colors sm:text-[2rem]",
                            active
                              ? "text-foreground"
                              : "text-foreground/70 group-hover:text-foreground"
                          )}
                        >
                          {t(item.key)}
                        </span>
                        {active && (
                          <span
                            aria-hidden
                            className="absolute bottom-3 left-0 h-px w-8 bg-[var(--clay)]"
                          />
                        )}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="border-t border-foreground/[0.06] p-5">
                <LanguageSwitcher size="lg" className="justify-center" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
