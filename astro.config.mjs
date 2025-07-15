// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  }
});