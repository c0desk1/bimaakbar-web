import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from "../consts"; 

export async function GET(context) {
  const blogPosts = await getCollection('blog');
  const projectPosts = await getCollection('projects');

  const allPosts = [...blogPosts, ...projectPosts];
  const sortedPosts = allPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      date: post.data.date,
      description: post.data.summary,
      link: `/${post.collection}/${post.slug}/`,
    })),
    customData: `<language>id-id</language>`,
  });
}