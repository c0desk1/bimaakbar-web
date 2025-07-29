import rss from '@astrojs/rss';
import { fetchBlog } from '../utils/fetchBlog';
import { SITE } from "../consts"; 

export async function GET(context) {
  const Posts = await fetchBlog();

  const allPosts = [...Posts];
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.title,
      date: post.date,
      description: post.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
    <language>id-ID</language>`,
  });
}