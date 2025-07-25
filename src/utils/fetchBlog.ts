import type { Blog } from '../types';
import { SITE } from '../consts';

export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function fetchBlog(): Promise<Blog[]> {
  const url = import.meta.env.PUBLIC_GOOGLE_BLOG_URL;
  const seenSlugs = new Set<string>();

  function generateUniqueSlug(title: string): string {
    let baseSlug = generateSlug(title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (seenSlugs.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    seenSlugs.add(uniqueSlug);
    return uniqueSlug;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    const now = new Date().toISOString();

    const posts: Blog[] = Array.isArray(data)
      ? data.map((item): Blog => {
          const tags: string[] = typeof item.tags === 'string'
            ? Array.from(
                new Set(
                  item.tags
                    .trim()
                    .split(/\s+/)
                    .map((t: string) => t.trim())
                    .filter((t: string): t is string => !!t)
                )
              )
            : [];

          const metaKeywords: string[] = typeof item.metaKeywords === 'string'
            ? Array.from(
                new Set(
                  item.metaKeywords
                    .trim()
                    .split(/\s+/)
                    .map((t: string) => t.trim())
                    .filter((t: string): t is string => !!t)
                )
              )
            : [];

          const slug = item.slug?.trim() || generateUniqueSlug(`${item.title}-${item.id}`);

          return {
            id: item.id,
            title: item.title || SITE.title,
            slug,
            description: item.description,
            content: item.content,
            category: item.category || tags[0] || 'uncategorized',
            tags,
            author: item.author,
            date: item.date || now,
            lastModified: item.lastModified || now,
            cover: !item.cover || item.cover === '(tidak ada)' ? null : item.cover ?? null,
            featured: ['true', 'yes', '1'].includes(String(item.featured ?? '').toLowerCase()),
            status: item.status?.toUpperCase() || 'DRAFT',
            canonicalUrl: item.canonicalUrl?.trim() || `${SITE.url}/blog/${slug}`,
            metaTitle: item.metaTitle?.trim() || item.title,
            metaDescription: item.metaDescription?.trim()
              || item.description?.trim()
              || item.content?.split('\n')[0]?.trim().slice(0, 160)
              || '',
            metaKeywords,
          };
        })
      : [];

    return posts;
  } catch (err) {
    console.error('Gagal fetch blog:', err);
    return [];
  }
}
