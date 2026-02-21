// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import yaml from "@rollup/plugin-yaml";

import react from "@astrojs/react";

import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

import netlify from "@astrojs/netlify";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), yaml()],
    ssr: {
      noExternal: ["gsap", "@gsap/react"],
    },
  },

  integrations: [react(), markdoc(), keystatic(), mdx()],
  output: "server",
  adapter: vercel(),
});
