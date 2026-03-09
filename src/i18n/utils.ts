import { transaltions, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in transaltions) return lang as keyof typeof transaltions;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof transaltions) {
  return function t(key: keyof (typeof transaltions)[typeof defaultLang]) {
    return transaltions[lang][key] || transaltions[defaultLang][key];
  };
}
