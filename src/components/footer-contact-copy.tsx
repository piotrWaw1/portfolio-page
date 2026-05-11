import { Check, Mail, Phone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useEffect, useState } from "react";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { DefaultLocale } from "@/types/locales.types";

export function FooterContactCopy() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [t, setT] = useState(() => useTranslations(DefaultLocale));
  //   const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (value: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(value);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 800);
    }
    // if (type === "phone") {
    //   setCopiedPhone(true);
    //   setTimeout(() => setCopiedPhone(false), 600);
    // }
  };

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href));
    setT(() => useTranslations(lang));
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
      <TooltipProvider>
        <Tooltip open={copiedEmail}>
          <TooltipTrigger asChild>
            <button
              onClick={() =>
                copyToClipboard("p.wawrzenczyk1@gmail.com", "email")
              }
              className="text-muted-foreground hover:text-amber flex cursor-pointer items-center gap-2 font-mono text-sm transition-colors"
            >
              <Mail className="h-4 w-4" />
              p.wawrzenczyk1@gmail.com
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-1">
              <Check size={15} /> {t("footer.copied")}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* <Tooltip open={copiedPhone}>
          <TooltipTrigger asChild>
            <button
              onClick={() => copyToClipboard("+48 22", "phone")}
              className="text-muted-foreground hover:text-primary flex cursor-pointer items-center gap-2 font-mono text-sm transition-colors"
            >
              <Phone className="h-4 w-4" />
              +48 21 37
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copied</p>
          </TooltipContent>
        </Tooltip> */}
      </TooltipProvider>
    </div>
  );
}
