import type { Blog } from '../types';
import { SITE } from '../consts';
import { cache } from 'memory-cache';

const cacheKey = 'blog-posts';
const cacheTTL = 3600000;

function parseDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString();
  const [dd, mm, yyyy] = dateStr.split(/[-/]/);
  const iso = new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);
  return isNaN(iso.getTime()) ? new Date().toISOString() : iso.toISOString();
}

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
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const url = 'https://opensheet.elk.sh/1iG_SXsiPQLNMQcw4yqsmkSG_3EQFwdizZ4EPSocJEIs/Posts';
  const res = await fetch(url);
  const data = await res.json();

  const posts: Blog[] = data
    .filter((item) => item.status?.toUpperCase() === 'PUBLISHED')
    .map((item): Blog => {
      const tags = typeof item.tags === 'string' ? item.tags.split(/[,|\s]/).map((t: string) => t.trim()).filter(Boolean) : [];
      const metaKeywords = typeof item.metaKeywords === 'string' ? item.metaKeywords.split(/[,|\s]/).map((k: string) => k.trim()).filter(Boolean) : [];
      const slug = item.slug?.trim() || generateSlug(`${item.title}-${item.id}`);
      return {
        id: item.id,
        title: item.title || SITE.title,
        slug,
        description: item.description || '',
        content: item.content || '',
        category: item.category || tags[0] || 'uncategorized',
        tags,
        author: item.author || 'Admin',
        date: parseDate(item.date),
        lastModified: parseDate(item.lastModified),
        cover: !item.cover || item.cover.toLowerCase() === '(tidak ada)' ? null : item.cover,
        featured: ['true', 'yes', '1'].includes(String(item.featured ?? '').toLowerCase()),
        status: 'PUBLISHED',
        canonicalUrl: item.canonicalUrl?.trim() || `${SITE.url}/blog/${slug}`,
        metaTitle: item.metaTitle?.trim() || item.title,
        metaDescription: item.metaDescription?.trim() || item.description?.trim() || item.content?.split('\n')[0]?.trim().slice(0, 160) || '',
        metaKeywords,
      };
    });

  cache.put(cacheKey, posts, cacheTTL);
  return posts;
}