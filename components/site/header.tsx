"use client";

import * as React from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { Wordmark } from "./wordmark";

const EXPLORE = [
  { key: "mission", href: "/mission" },
  { key: "recipes", href: "/recipes" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const exploreRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const exploreActive = EXPLORE.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  const programsActive = pathname === "/programme" || pathname.startsWith("/programme/");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!exploreRef.current?.contains(event.target as Node)) setExploreOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const linkClass = "group relative whitespace-nowrap py-2 text-[0.85rem] tracking-[0.015em] text-foreground/82 transition-colors hover:text-foreground";
  const underline = "absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--clay)] transition-transform duration-300";

  return (
    <header className={cn("sticky top-0 z-40 w-full border-b border-foreground/[0.06] shadow-[0_1px_16px_-4px_rgba(30,26,20,0.06)] transition duration-300", scrolled ? "bg-background/85 backdrop-blur-md" : "bg-background/65 backdrop-blur-sm")}>
      <div className="container-page flex items-center justify-between gap-6 py-1.5 md:py-3.5">
        <Wordmark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label={t("menu")}>
          <Link href="/katey" className={linkClass}>{t("about")}<span aria-hidden className={cn(underline, pathname === "/katey" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} /></Link>
          <div ref={exploreRef} className="relative" onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)} onKeyDown={(event) => event.key === "Escape" && setExploreOpen(false)}>
            <button type="button" aria-haspopup="menu" aria-expanded={exploreOpen} onClick={() => setExploreOpen((open) => !open)} className={cn(linkClass, "flex items-center gap-1.5", exploreActive && "text-foreground")}>{t("explore")}<ChevronDown className={cn("size-3.5 transition-transform duration-200", exploreOpen && "rotate-180")} /><span aria-hidden className={cn(underline, exploreActive || exploreOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} /></button>
            <div role="menu" className={cn("absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 pt-2 transition duration-150", exploreOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0")}>
              <div className="rounded-xl border border-foreground/10 bg-[#fbf8f2] p-1.5 shadow-[0_16px_38px_-24px_rgba(30,26,20,0.45)]">
                {EXPLORE.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return <Link role="menuitem" key={item.href} href={item.href} onClick={() => setExploreOpen(false)} className={cn("block min-h-11 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-[var(--sand)] focus-visible:bg-[var(--sand)] focus-visible:outline-none", active ? "font-medium text-[var(--plum)]" : "text-foreground/72")}>{t(item.key)}</Link>;
                })}
              </div>
            </div>
          </div>
          <Link href="/programme" className={cn(linkClass, programsActive && "text-foreground")}>{t("programs")}<span aria-hidden className={cn(underline, programsActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} /></Link>
          <Link href="/kontakt" className={linkClass}>{t("contact")}<span aria-hidden className={cn(underline, pathname === "/kontakt" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} /></Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher className="hidden lg:flex" />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon-lg" aria-label={t("openMenu")} className="size-10 lg:hidden"><Menu className="size-5" /></Button></SheetTrigger>
            <SheetContent side="right" className="flex w-[78vw] max-w-[310px] flex-col bg-background p-0">
              <SheetHeader className="border-b border-foreground/[0.06] px-6 py-4"><SheetTitle className="eyebrow text-left font-mono text-xs">{t("menu")}</SheetTitle></SheetHeader>
              <nav className="flex flex-1 flex-col justify-center px-6">
                <SheetClose asChild><Link href="/katey" className="border-b border-foreground/[0.08] py-4 font-display text-[2rem]">{t("about")}</Link></SheetClose>
                <div className="border-b border-foreground/[0.08] py-4"><p className="font-display text-[2rem]">{t("explore")}</p><div className="mt-3 space-y-1 border-l border-[var(--clay)]/40 pl-4">{EXPLORE.map((item) => <SheetClose key={item.href} asChild><Link href={item.href} className="block min-h-11 py-3 text-[0.95rem] text-foreground/65">{t(item.key)}</Link></SheetClose>)}</div></div>
                <SheetClose asChild><Link href="/programme" className="border-b border-foreground/[0.08] py-4 font-display text-[2rem]">{t("programs")}</Link></SheetClose>
                <SheetClose asChild><Link href="/kontakt" className="border-b border-foreground/[0.08] py-4 font-display text-[2rem]">{t("contact")}</Link></SheetClose>
              </nav>
              <div className="border-t border-foreground/[0.06] p-5"><LanguageSwitcher size="lg" className="justify-center" /></div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
