import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { createPortal } from "react-dom";

const navLinks = [
  { label: "About", href: "#about", color: "text-primary" },
  { label: "Experience", href: "#experience", color: "text-accent" },
  { label: "Projects", href: "#projects", color: "text-cyan" },
  { label: "Contact", href: "#contact", color: "text-amber" },
];

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
          <ModeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {/*<ModeToggle />*/}

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
