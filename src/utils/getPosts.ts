import { glob } from 'astro:content';

export async function getAllPosts() {
  const posts = await glob('../content/blog/*.mdx');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.data.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.tags?.includes(tag));
}
