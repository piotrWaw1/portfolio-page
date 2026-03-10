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
    defaultLocale: "en",
    locales: ["pl", "en"],
  },

  site: "https://www.p-wawrzenczyk.dev/",
  integrations: [
    react(),
    markdoc(),
    !isProduction && keystatic(),
    mdx(),
    sitemap({
      i18n:{
        defaultLocale: "en",
        locales:{
          en: 'en-US',
          pl: 'pl-PL'
        }
      }
    }),
  ],
  output: "static",
  adapter: vercel(),
});
