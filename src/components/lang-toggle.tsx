import { cn } from "@/lib/utils.ts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";

export default function LangToggle() {
  const [currentLang, setCurrentLang] = useState("");

  useEffect(() => {
    const lang = window.location.pathname.split("/")[1];
    if (lang === "pl" || lang === "en") {
      setCurrentLang(lang);
    }
  }, []);

  const handleSwitch = () => {
    const switchTo = currentLang === "en" ? "pl" : "en";
    setCurrentLang(switchTo);
    document.cookie = `preferred-lang=${switchTo}; path=/; max-age=31536000`;

    const currentPath =
      window.location.pathname.replace(/^\/(en|pl)/, "") || "/";

    window.location.href = `/${switchTo}${currentPath}`;
  };

  return (
    <Button
      onClick={handleSwitch}
      variant="secondary"
      className="border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary flex h-9 items-center gap-1 rounded-lg border px-3 font-mono text-xs font-medium transition-all"
      aria-label="Toggle language"
    >
      <span
        className={cn(
          "transition-colors",
          currentLang === "en" ? "text-primary" : "text-muted-foreground",
        )}
      >
        EN
      </span>
      <span className="text-border">/</span>
      <span
        className={cn(
          "transition-colors",
          currentLang === "pl" ? "text-primary" : "text-muted-foreground",
        )}
      >
        PL
      </span>
    </Button>
  );
}
