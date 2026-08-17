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
        "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-foreground/[0.06] bg-background/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Wordmark />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                                className={cn(
                  // nowrap: two-word labels in other languages ("O mne")
                  // otherwise break across lines in the narrow desktop nav
                  "group relative whitespace-nowrap text-[0.92rem] transition-colors duration-200",
                  active
                    ? "text-foreground"
                    : "text-foreground/72 hover:text-foreground"
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
          <LanguageSwitcher className="hidden md:flex" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={t("openMenu")}
                className="md:hidden"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background p-0">
              <SheetHeader className="border-b border-foreground/[0.06] px-6 py-5">
                <SheetTitle className="font-display text-lg font-normal">
                  {t("menu")}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 py-4">
                {NAV.map((item) => {
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                                                className={cn(
                          "rounded-lg px-3 py-3 font-display text-2xl tracking-tight transition-colors hover:bg-[var(--sand)]/70",
                          "text-foreground"
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-auto border-t border-foreground/[0.06] p-5">
                <LanguageSwitcher size="lg" className="justify-center" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
