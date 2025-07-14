import { getCollection } from 'astro:content';

function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export async function getAllPosts() {
  const rawPosts = await getCollection('blog');

  const allPosts = rawPosts
    .map((post) => {
      const pubDate = post.data.pubDate;
      return {
        ...post,
        data: {
          ...post.data,
          pubDate: isValidDate(pubDate) ? pubDate : null,
        },
      };
    })
    .filter((post) => post.data.pubDate)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return allPosts;
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags?.includes(tag));
}
