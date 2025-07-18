import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import rehypeFormat from 'rehype-format';

export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      shikiConfig: {
        theme: 'github-dark',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        wrap: true,
        langs: ['astro', 'css', 'html', 'js', 'ts', 'jsx', 'tsx', 'json', 'mdx', 'markdown',
        ],
        langAlias: {
          cjs: 'javascript',
        },
        defaultColor: false,
      },
      rehypePlugins: [
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeStringify,
        remarkParse,
        rehypeFormat,
      ],
      gfm: true,
      syntaxHighlight: 'shiki',
     
      remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1", allowDangerousHtml: true},
    }),
  ],
  markdown: {
    gfm: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
      langs: ['text', 'yaml', 'astro', 'css', 'html', 'js', 'ts', 'jsx', 'tsx', 'json', 'mdx', 'markdown', 'javascript', 'typescript', 'toml', 'config'
      ],
      langAlias: {
        cjs: 'javascript',
      },
      defaultColor: false,
    },
    rehypePlugins: [
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeStringify,
      remarkParse,
      rehypeFormat,
    ],
    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1", allowDangerousHtml: true},
  },
});
