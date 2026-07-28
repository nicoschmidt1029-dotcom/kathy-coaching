"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programme" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/kontakt" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
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
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative text-[0.92rem] transition-colors duration-200",
                  active
                    ? "text-foreground"
                    : "text-foreground/72 hover:text-foreground"
                )}
              >
                {item.label}
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

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            className="hidden bg-[var(--plum)] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90 md:inline-flex"
          >
            <Link href="/kontakt">Free discovery call</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open menu"
                className="md:hidden"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background p-0">
              <SheetHeader className="border-b border-foreground/[0.06] px-6 py-5">
                <SheetTitle className="font-display text-lg font-normal">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 py-4">
                {NAV.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-lg px-3 py-3 font-display text-2xl tracking-tight transition-colors hover:bg-[var(--sand)]/70",
                          active ? "text-[var(--plum)]" : "text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-auto border-t border-foreground/[0.06] p-5">
                <SheetClose asChild>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[var(--plum)] text-[var(--primary-foreground)] hover:bg-[var(--plum)]/90"
                  >
                    <Link href="/kontakt">Free discovery call</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
