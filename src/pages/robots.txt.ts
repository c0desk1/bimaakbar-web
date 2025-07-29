// src/pages/robots.txt.ts
import { SITE } from '../consts';

export function GET() {
  const sitemapIndex = `${SITE.url}/sitemap-index.xml`;

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapIndex}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
