// src/content/config.ts

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    author: z.string().optional(),
    heroImage: image().optional(),
    featured: z.boolean().optional(),
    slug: z.string().optional(),
    canonicalURL: z.string().url().optional(),
  })
});

export const collections = {blog};