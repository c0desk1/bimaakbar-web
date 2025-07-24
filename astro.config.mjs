import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  output: 'server',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin/'),
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
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
adapter: vercel({
    imagesConfig: {
      sizes: [320, 480, 640, 1280],
    },
imageService: true,
  }),

});