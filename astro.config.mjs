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


export default defineConfig({
  site: "https://bimaakbar.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      gfm: true,
      shikiConfig: {
        theme: 'github-dark',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },

        wrap: true,
        
        langs: [
          'astro', 
          'css', 
          'html',
          'javascript',
          'json',
          'jsonc', 
          'jsx', 
          'markdown', 
          'mdx', 
          'tsx', 
          'typescript', 
          'xml',
          'yaml',  
          'text' 
        ],

        langAlias: {
          cjs: 'js',
          ts:'ts',
          yml: 'yml',
          md: 'md',
        },

        defaultColor: false,
      },

      syntaxHighlight: {
        type: 'shiki',
        excludeLangs: ['mermaid', 'math', 'js', 'md', 'ts', 'yml'],
      },

      remarkPlugins: [
        remarkGfm,
      ],

      rehypePlugins: [
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeRaw,
        rehypeSlug,
        rehypeFormat,
        rehypeAccessibleEmojis
      ],

      smartypants: false,

      remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1", allowDangerousHtml: true},
    }),
  ],
  markdown: {
    gfm: true,

    shikiConfig: {
      theme: 'github-dark',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },

      wrap: true,
      
      langs: [
        'astro', 
        'css', 
        'html',
        'javascript',
        'json',
        'jsonc', 
        'jsx', 
        'markdown', 
        'mdx', 
        'tsx', 
        'typescript', 
        'xml',
        'yaml',  
        'text' 
      ],

      langAlias: {
        cjs: 'js',
        ts:'ts',
        yml: 'yml',
        md: 'md',
      },

      defaultColor: false,
    },

    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math', 'js', 'md', 'ts', 'yml'],
    },

    remarkPlugins: [
      remarkGfm,
    ],

    rehypePlugins: [
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeRaw,
      rehypeSlug,
      rehypeFormat,
      rehypeAccessibleEmojis
    ],

    smartypants: false,

    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1", allowDangerousHtml: true},
  },
});
