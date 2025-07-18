// @ts-nocheck
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';


// https://astro.build/config
export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  vite: {
    plugins: [
		tailwindcss()
	],
  },
  integrations: [
    react(),
    sitemap(),
    mdx(
      {
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
      },
    ),
  ],
  markdown: {
warp: false,
    gfm: true,
  }
});
