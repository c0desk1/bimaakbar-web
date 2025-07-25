// src/pages/sitemap-index.xml.ts
import { SITE } from '../consts';

export function GET() {
  const sitemapStatic = `${SITE.url}/sitemap-static.xml`;
  const sitemapDynamic = `${SITE.url}/sitemap-dynamic.xml`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${sitemapStatic}</loc>
    </sitemap>
    <sitemap>
        <loc>${sitemapDynamic}</loc>
    </sitemap>
    </sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
