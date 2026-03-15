import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { createPortal } from "react-dom";
import LangToggle from "@/components/lang-toggle.tsx";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { defaultLang } from "@/i18n/ui";

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [t, setT] = useState(() => useTranslations(defaultLang));

  const navLinks = [
    { label: t("nav.about"), href: "#about", color: "text-primary" },
    { label: t("nav.experience"), href: "#experience", color: "text-accent" },
    { label: t("nav.projects"), href: "#projects", color: "text-cyan" },
    { label: t("nav.contact"), href: "#contact", color: "text-amber" },
  ];

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href));
    setT(() => useTranslations(lang));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
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
        "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500",
        scrolled
          ? "top-4 w-[95%] max-w-5xl rounded-full border border-white/10 bg-background/60 shadow-lg backdrop-blur-md dark:border-white/10 border-black/10"
          : "top-0 w-full max-w-6xl border-transparent bg-transparent",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500",
          scrolled ? "px-6 py-3" : "px-6 py-6"
        )}
      >
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
          <div className="flex flex-row gap-2">
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
              </ul>
            </div>,
            document.body,
          )}
      </nav>
    </header>
  );
}
