// src/content/config.ts

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
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
    image: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    draft: z.boolean().optional(),
  }),
});

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

export const collections = {
  'blog': blog,
  'projects': projects,
  'legal': legal,
  'work': work,
};