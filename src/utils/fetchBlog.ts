// src/lib/fetchPosts.ts
import type { Blog } from '../types'
import { SITE } from '../consts'

/**
 * Utility: Convert date from dd-mm-yyyy to ISO string
 */
function parseDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString()
  const [dd, mm, yyyy] = dateStr.split(/[-/]/)
  const iso = new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`)
  return isNaN(iso.getTime()) ? new Date().toISOString() : iso.toISOString()
}

/**
 * Utility: Clean string to slug
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Main function to fetch blog posts
 */
export async function fetchBlog(): Promise<Blog[]> {
  const url = 'https://opensheet.elk.sh/1iG_SXsiPQLNMQcw4yqsmkSG_3EQFwdizZ4EPSocJEIs/Posts'
  const seenSlugs = new Set<string>()

  function generateUniqueSlug(title: string): string {
    let baseSlug = generateSlug(title)
    let uniqueSlug = baseSlug
    let counter = 1
    while (seenSlugs.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`
      counter++
    }
    seenSlugs.add(uniqueSlug)
    return uniqueSlug
  }

  try {
    const res = await fetch(url)
    const data = await res.json()
    const now = new Date().toISOString()

    const posts: Blog[] = Array.isArray(data)
      ? data
          .filter((item) => item.status?.toUpperCase() === 'PUBLISHED')
          .map((item): Blog => {
            const tags = typeof item.tags === 'string'
              ? item.tags.split(/[,|\s]/).map(t => t.trim()).filter(Boolean)
              : []

            const metaKeywords = typeof item.metaKeywords === 'string'
              ? item.metaKeywords.split(/[,|\s]/).map(k => k.trim()).filter(Boolean)
              : []

            const slug = item.slug?.trim() || generateUniqueSlug(`${item.title}-${item.id}`)

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
              metaDescription:
                item.metaDescription?.trim() ||
                item.description?.trim() ||
                item.content?.split('\n')[0]?.trim().slice(0, 160) ||
                '',
              metaKeywords,
            }
          })
      : []

    return posts
  } catch (err) {
    console.error('Gagal fetch blog:', err)
    return []
  }
}