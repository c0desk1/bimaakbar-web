import FeaturedPost from '@/components/FeaturedPost';
import RecentPosts from '@/components/RecentPost';

async function getPosts() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbwO-juMj6NKMszdcNDZBK2WkSck7E8C1p_ttaRJhxrG5D3mxsKjpU77BhkUmYBW6o42/exec', {
    cache: 'no-store',
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Gagal parse JSON:', err);
    return [];
  }
}


export default async function HomePage() {
  const posts = await getPosts();
  const featured = posts.find((post: any) => post.featured === true);
  const recent = posts.filter((post: any) => post.status === 'PUBLISH' && post.featured !== true);

  return (
    <main className="py-16 max-w-4xl mx-auto gap-4">
      
      {featured && <FeaturedPost {...featured} />}
      <RecentPosts posts={recent} />
    </main>
  );
}
