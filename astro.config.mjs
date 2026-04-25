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

import partytown from "@astrojs/partytown";

const isProduction = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), yaml()],
    ssr: {
      noExternal: ["gsap", "@gsap/react"],
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
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  output: "static",
  adapter: vercel(),
});
