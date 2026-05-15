// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import yaml from "@rollup/plugin-yaml";

import react from "@astrojs/react";

import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

import { DefaultLocale, Locales } from "./src/types/locales.types";

const isProduction = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), yaml()],
    ssr: {
      noExternal: ["gsap", "@gsap/react", "axobject-query"],
    },
  },

  i18n: {
    defaultLocale: DefaultLocale,
    locales: [Locales.EN, Locales.PL],
  },

  site: "https://www.p-wawrzenczyk.dev/",
  integrations: [
    react(),
    markdoc(),
    !isProduction && keystatic(),
    mdx(),
    sitemap({
      filter: (page) =>
        ![
          "https://www.p-wawrzenczyk.dev/",
          "https://www.p-wawrzenczyk.dev/oferta/",
        ].includes(page),

      serialize(item) {
        const locales = {
          "/pl/": { pl: "/pl/", en: "/en/", xDefault: "/" },
          "/en/": { pl: "/pl/", en: "/en/", xDefault: "/" },
          "/pl/oferta/": {
            pl: "/pl/oferta/",
            en: "/en/oferta/",
            xDefault: "/oferta/",
          },
          "/en/oferta/": {
            pl: "/pl/oferta/",
            en: "/en/oferta/",
            xDefault: "/oferta/",
          },
        };

        const base = "https://www.p-wawrzenczyk.dev";
        const path = item.url.replace(base, "");
        // @ts-ignore
        const links = locales[path];

        if (links) {
          item.links = [
            { lang: "pl", url: `${base}${links.pl}` },
            { lang: "en", url: `${base}${links.en}` },
            { lang: "x-default", url: `${base}${links.xDefault}` },
          ];
        }

        return item;
      },

      i18n: {
        defaultLocale: "pl",
        locales: {
          pl: "pl",
          en: "en",
        },
      },
    }),
  ],
  output: "static",
  adapter: vercel(),
});
