// components/RecentPosts.tsx
import PostCard from './PostCard.tsx';
import {fetchBlog} from '../utils/fetchBlog';

export default async function RecentPosts() {
  const posts = await fetchBlog();
  const recentPosts = posts
    .filter(post => post.status === 'PUBLISH')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[var(--color-fg)]">Terbaru</h2>
        <a href="/blog" className="text-sm hover:text-[var(--color-fg)] text-[var(--color-muted)] hover:bg-[var(--color-hover)] py-2 px-3 rounded-full">
          Semua Postingan
        </a>
      </div>

      {recentPosts.length === 0 ? (
        <p className="text-[var(--color-muted)] italic">Belum ada postingan.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
          {recentPosts.map(post => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}