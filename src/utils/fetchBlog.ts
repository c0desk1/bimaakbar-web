export async function fetchBlog() {
  try {
    const res = await fetch('https://opensheet.elk.sh/1x404DP2RoiOOJa_Ik5uo54ZtIDjjUuj5EY0AjeGPFKQ/Blog');

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const blogs = data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.description,
      content: item.content,
      cover: !item.cover || item.cover === '(tidak ada)' ? null : item.cover,
      author: item.author,
      featured: ['true', 'yes', '1'].includes(String(item.featured).toLowerCase()),
      status: item.status?.toUpperCase() || 'DRAFT',
      category: item.category,
      lastModified: item.lastModified ? new Date(item.lastModified) : null,
      date: item.date ? new Date(item.date) : null,
      canonicalUrl: item.canonicalUrl?.trim() || '',
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription?.trim() || '',
      metaKeywords: item.metaKeywords
        ?.split(' ')
        .map((kw: string) => kw.trim())
        .filter(Boolean) || [],
      tags: item.tags
        ?.split(' ')
        .map((tag: string) => tag.trim())
        .filter(Boolean) || [],
    }));

    return blogs;
  } catch (error) {
    console.error('Gagal mengambil data Blog:', error);
    return [];
  }
}