// src/pages/sitemap-dynamic.xml.ts
import { SITE } from '../consts';
import { fetchBlog } from '../utils/fetchBlog';

export async function GET() {
  const baseUrl = SITE.url;
  const posts = await fetchBlog();

  const urls = posts
    .filter((post) => post.status === 'PUBLISH' && post.slug)
    .map((post) => {
      const date = post.date ? new Date(post.date) : new Date();
      const lastmod = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
      return `<url>
  <loc>${baseUrl}/blog/${post.slug}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
