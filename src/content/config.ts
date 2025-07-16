// src/content/config.ts

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string(),
    technologies: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  'blog': blog,
  'projects': projects,
};