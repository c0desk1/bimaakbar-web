import type {Blog} from '../types'

export async function fetchBlog(): Promise<Blog[]> {
  const url = import.meta.env.PUBLIC_GOOGLE_BLOG_URL;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('✅ Blog data:', data);
    const posts: Blog[] = Array.isArray(data)
      ? data.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          content: item.content,
          category: item.category,
          tags: item.tags ? item.tags.trim().split(/\s+/) : [],
          author: item.author,
          date: item.date,
          lastModified: item.lastModified,
          cover: !item.cover || item.cover === '(tidak ada)' ? null : item.cover,
          featured: ['true', 'yes', '1'].includes(String(item.featured).toLowerCase()),
          status: item.status?.toUpperCase() || 'DRAFT',
          canonicalUrl: item.canonicalUrl?.trim() || '',
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription?.trim() || '',
          metaKeywords: item.metaKeywords
          ?.split(' ')
          .map((kw: string) => kw.trim())
          .filter(Boolean) || [],
        }))
      : [];

    return posts;
  } catch (err) {
    console.error('Gagal fetch blog:', err);
    return [];
  }
}