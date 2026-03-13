import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { createPortal } from "react-dom";
import LangToggle from "@/components/lang-toggle.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavLinks {
  label: string;
  href: string;
  color: string;
}

interface NavbarProps {
  navLinks: NavLinks[];
  redirectToPage: { title: string; url: string; portfolio: boolean };
}

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const href = e.currentTarget.getAttribute("href");
  if (href?.startsWith("#")) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export function Navbar({ navLinks, redirectToPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-border/50 bg-background/80 border-b backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href={"#hero"}
          onClick={handleSmoothScroll}
          className="gradient-text font-mono text-base font-bold tracking-wider"
        >
          {"<PW />"}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleSmoothScroll}
                  className="group text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
                >
                  <span className={cn("font-mono text-xs", link.color)}>
                    {`0${i + 1}.`}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-row gap-4">
            <a
              href={redirectToPage.url}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-4 font-mono text-sm",
                redirectToPage.portfolio
                  ? "border-cyan/30 bg-cyan/5 text-cyan hover:border-cyan/50 hover:bg-cyan/10"
                  : "border-accent/30 bg-accent/5 text-accent hover:border-accent/50 hover:bg-accent/10",
              )}
            >
              {redirectToPage.portfolio && <ArrowLeft className="h-4 w-4" />}
              {redirectToPage.title}
              {!redirectToPage.portfolio && <ArrowRight className="h-4 w-4" />}
            </a>
            <LangToggle />
            <ModeToggle />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
          <ModeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "bg-primary h-0.5 w-5 rounded-full transition-all duration-300",
                mobileOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "bg-accent h-0.5 w-5 rounded-full transition-all duration-300",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "bg-cyan h-0.5 w-5 rounded-full transition-all duration-300",
                mobileOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>

        {mobileOpen &&
          createPortal(
            <div className="mesh-bg bg-background/95 fixed inset-0 z-40 flex items-center justify-center backdrop-blur-lg md:hidden">
              <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-foreground flex flex-col items-center gap-1 text-lg"
                    >
                      <span className={cn("font-mono text-xs", link.color)}>
                        {`0${i + 1}.`}
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={redirectToPage.url}
                    onClick={() => setMobileOpen(false)}
                    className="border-accent/30 bg-accent/5 text-accent inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 font-mono text-sm"
                  >
                    {redirectToPage.title}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>,
            document.body,
          )}
      </nav>
    </header>
  );
}
