import { formatDate } from "../lib/utils";
import type {Blog} from '../types'

type Props = {
  post: Blog;
};

export default function PostCard({ post }: Props) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group overflow-hidden flex flex-col justify-between h-full w-full text-left p-4 gap-2 border rounded-xl bg-[var(--color-bg)] hover:bg-[var(--color-card-bg)] border-[var(--color-border)]">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex justify-between items-center">
          <div className="text-sm uppercase text-[var(--color-muted)]">
            {post.date ? formatDate(post.date) : "Tanpa tanggal"}
          </div>
          <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-[var(--color-border)]">
            {post.category}
          </div>
        </div>

        <div className="flex items-center font-semibold mt-3 text-[var(--color-fg)] line-clamp-2">
          {post.featured && (
            <span className="text-[var(--color-accent)] mr-1">
              <svg stroke="var(--color-border)" fill="var(--color-accent)" className="justify-center size-4 pointer-events-none">
                <use href="/ui.svg#featured"></use>
              </svg>
            </span>
          )}
          {post.title}
        </div>

        <div className="text-sm text-[var(--color-muted)] line-clamp-2 my-2">
          {post.description}
        </div>

        {post.tags.length > 0 && (
          <ul className="flex flex-wrap mt-auto gap-1">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="text-center text-xs uppercase px-2 py-1 rounded-lg text-[var(--color-fg)] border border-[var(--color-border)]">
                # {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}