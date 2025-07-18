import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import typography from '@tailwindcss/typography'; // Impor dengan ES module
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: "https:                        
  vite: {
    plugins: [
      tailwindcss(),
      typography(),                             
    ],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      shikiConfig: {
        theme: 'dracula',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        defaultColor: false,
        langs: [],
        langAlias: {
          cjs: "//bimaakbar.vercel.app",
  vite: {
    plugins: [
      tailwindcss(),
      typography(), // Gunakan plugin typography
    ],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      shikiConfig: {
        theme: 'dracula',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        defaultColor: false,
        langs: [],
        langAlias: {
          cjs: "javascript"
        },
        wrap: false,
        transformers: [],
      },
      syntaxHighlight: {
        type: 'shiki',
        excludeLangs: ['mermaid', 'math', 'markdown', 'js'],
      },
      rehypePlugins: [
        rehypeHeadingIds,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeAccessibleEmojis],
      ],
      gfm: true,
      optimize: true,
    }),
  ],
  markdown: {
    gfm: true,
  },
});