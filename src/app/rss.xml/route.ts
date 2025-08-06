export const runtime = 'edge';
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config";

export async function GET() {
  const posts = await getAllPosts();

  const feedItems = posts.map((post) => {
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteConfig.url}/blog/${post.slug}</link>
        <guid>${siteConfig.url}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt || ""}]]></description>
      </item>
    `;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>id</language>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
    },
  });

}
