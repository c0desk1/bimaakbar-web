import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { BLOG } from "../consts"; 

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date, 
      description: post.data.summary, 
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>id-id</language>`,
  });
}