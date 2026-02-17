import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export function ModeToggle() {
  const [theme, setThemeState] = useState<"theme-light" | "dark">("dark");

  const moonRef = useRef(null);
  const sunRef = useRef(null);

  const { contextSafe } = useGSAP();

  const handleAnimation = contextSafe(() => {
    const isThemeDark = theme !== "dark";

    const moonTargetScale = isThemeDark ? 1 : 0;
    const sunTargetScale = isThemeDark ? 0 : 1;

    gsap.to(moonRef.current, {
      // scale: moonTargetScale,
      opacity: moonTargetScale, // Optional: fade out helps smooth it
      rotate: isThemeDark ? 0 : 90, // Optional: slight counter-rotation
    });

    // 3. Animate the Sun (Scale & Rotate)
    gsap.to(sunRef.current, {
      // scale: sunTargetScale,
      opacity: sunTargetScale,
      rotate: isThemeDark ? -90 : 0,
    });
  });

  const toggleTheme = () => {
    if (theme === "theme-light") {
      setThemeState("dark");
    } else {
      setThemeState("theme-light");
    }
    handleAnimation();
  };

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="secondary"
      className="hover:broder-red-500 hover:text-primary border"
      aria-label="Toggle Theme"
    >
      <Moon ref={moonRef} className="absolute h-[1.2rem] w-[1.2rem]" />
      <Sun ref={sunRef} className="absolute h-[1.2rem] w-[1.2rem] opacity-0" />
    </Button>
  );
}

// "relative z-50 flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-secondary/50 text-muted-foreground"
