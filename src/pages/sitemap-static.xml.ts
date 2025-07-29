// src/pages/sitemap-static.xml.ts
import { SITE } from '../consts';

export function GET() {
  const baseUrl = SITE.url;
  const staticPaths = [
    '',
    '/about',
    '/blog',
  ];

  const urls = staticPaths
    .map((path) => {
      return `<url>
  <loc>${baseUrl}${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
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
