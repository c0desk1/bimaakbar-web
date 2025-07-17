// @ts-nocheck
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx(
      {
        shikiConfig: {
          theme: 'one-dark-pro',
          wrap: true,
        },
        remarkPlugins: [],
        rehypePlugins: [
          rehypeHeadingIds,
          rehypeAccessibleEmojis,
        ],
      },
    ),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeAccessibleEmojis,
    ],
  },
});