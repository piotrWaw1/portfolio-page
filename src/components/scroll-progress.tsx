import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils.ts";

const sections = [
  {
    id: "hero",
    label: "Home",
    color: "bg-rose border-rose",
    inactive: "bg-rose",
  },
  {
    id: "about",
    label: "About",
    color: "bg-primary border-primary",
    inactive: "bg-primary",
  },
  {
    id: "experience",
    label: "Experience",
    color: "bg-accent border-accent",
    inactive: "bg-accent",
  },
  {
    id: "projects",
    label: "Projects",
    color: "bg-cyan border-cyan",
    inactive: "bg-cyan",
  },
  {
    id: "contact",
    label: "Contact",
    color: "bg-amber border-amber",
    inactive: "bg-amber",
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
    // Fixed container on the right side
    <nav className="fixed top-1/2 right-10 z-50 hidden -translate-y-1/2 transform flex-col gap-4 xl:flex">
      {/* The vertical connecting line */}
      <div className="absolute top-0 bottom-0 left-1/2 -z-10 w-0.5 -translate-x-1/2 bg-gray-600 opacity-50 dark:bg-gray-200" />

      {/* Optional: The "Progress" colored line */}
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
          className="group relative flex items-center justify-center"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Tooltip (visible on hover) */}
          <span className="absolute right-8 rounded bg-black px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {section.label}
          </span>

          {/* The Dot */}
          <div
            className={cn(
              "h-4 w-4 rounded-full border-2 transition-all duration-300",
              activeSection === section.id
                ? `${section.color} scale-125` // Active styles
                : `${section.inactive} border-white hover:border-blue-400 dark:border-black`, // Inactive styles
            )}
          />
        </button>
      ))}
    </nav>
  );
};

export default ScrollProgress;
