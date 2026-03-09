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
      opacity: moonTargetScale,
      rotate: isThemeDark ? 0 : 90,
    });

    gsap.to(sunRef.current, {
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
      className="hover:text-primary hover:border-primary/40 border"
      aria-label="Toggle Theme"
    >
      <Moon ref={moonRef} className="absolute h-[1.2rem] w-[1.2rem]" />
      <Sun ref={sunRef} className="absolute h-[1.2rem] w-[1.2rem] opacity-0" />
    </Button>
  );
}
