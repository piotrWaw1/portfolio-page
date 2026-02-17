// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";

import react from "@astrojs/react";

import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), markdoc(), keystatic(), mdx()],
  output: "static",
});
