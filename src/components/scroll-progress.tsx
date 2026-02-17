import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils.ts";

const sections = [
  {
    id: "hero",
    label: "Home",
    activeColor: "bg-rose border-rose shadow-[0_0_20px_var(--color-rose)]",
  },
  {
    id: "about",
    label: "About",
    activeColor:
      "bg-primary border-primary shadow-[0_0_20px_var(--glow-primary)]",
  },
  {
    id: "experience",
    label: "Experience",
    activeColor: "bg-accent border-accent shadow-[0_0_20px_var(--glow-accent)]",
  },
  {
    id: "projects",
    label: "Projects",
    activeColor: "bg-cyan border-cyan shadow-[0_0_20px_var(--color-cyan)]",
  },
  {
    id: "contact",
    label: "Contact",
    activeColor: "bg-amber border-amber shadow-[0_0_20px_var(--color-amber)]",
  },
];

const ScrollProgress = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-1/2 right-10 z-50 hidden -translate-y-1/2 transform flex-col gap-4 xl:flex">
      <div className="absolute top-0 bottom-0 left-1/2 -z-10 w-0.5 -translate-x-1/2 bg-gray-600 opacity-50 dark:bg-gray-200" />
      <div
        className="gradient-line absolute top-0 left-1/2 -z-10 w-0.5 -translate-x-1/2 transition-all duration-500 ease-out"
        style={{
          height: `${(sections.findIndex((s) => s.id === activeSection) / (sections.length - 1)) * 100}%`,
        }}
      />

      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleScroll(section.id)}
          className="group relative flex items-center justify-center focus:outline-none"
          aria-label={`Scroll to ${section.label}`}
        >
          <span className="bg-popover border-border text-popover-foreground absolute right-8 translate-x-2 rounded-md border px-2 py-1 text-xs font-medium opacity-0 shadow-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {section.label}
          </span>
          <div
            className={cn(
              "h-4 w-4 rounded-full border-2 transition-all duration-300",
              activeSection === section.id
                ? `${section.activeColor} scale-125`
                : "bg-background border-muted-foreground/30 group-hover:border-primary/50 group-hover:scale-110",
            )}
          />
        </button>
      ))}
    </nav>
  );
};

export default ScrollProgress;
