import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';

import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  integrations: [
    react(),
    sitemap(),
    rss(),
    expressiveCode(
      {
        themes: ['plastic', 'one-light'],
        removeUnusedThemes: false,
        shiki: {
          langs: [
            'css',
            'astro',
            'html',
            'javascript',
            'json',
            'jsonc',
            'jsx',
            'make',
            'markdown',
            'mdx',
            'php',
            'postcss',
            'powershell',
            'python',
            'sass',
            'scss',
            'shellsession',
            'sql',
            'tsx',
            'typescript',
            'xml',
            'yaml	',
          ],
          langAlias: [
            'js',
            'makefile',
            'md',
            'py',
            'console',
            'ts',
            'cmd',
            'yml'
          ],
        },
      }
    ),
    mdx(),
  ],
  markdown: {
    gfm: true,
    smartypants: false,
    remarkPlugins: [
      remarkGfm,
    ],
    rehypePlugins: [
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeRaw,
      rehypeSlug,
      rehypeFormat,
      rehypeAccessibleEmojis,
    ],
    syntaxHighlight: false,
    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1", allowDangerousHtml: true},
  },
});