// src/app/blog/[slug]/components/PostFooter.tsx
import Link from "next/link";
import ShareButtons from "@/components/ui/ShareButtons";
import Spacer from "@/components/ui/Spacer";
import Card from "@/components/ui/Card";
import { PostMeta } from "@/types";

interface PostFooterProps {
  data: PostMeta;
  prev: PostMeta | null;
  next: PostMeta | null;
  related: PostMeta[];
}

export default function PostFooter({ data, prev, next, related }: PostFooterProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-start md:justify-start items-center mb-6">
        <div className="flex items-center gap-2">
          {data.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-sm text-[var(--muted-foreground)] rounded-xl bg-[var(--background)] border border-[var(--border)]">#{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="border-y border-[var(--border)]">
        <ShareButtons title={data.title} />
      </div>
      {related.length > 0 && (
        <div>
          <Spacer />
          <h2 className="my-4 text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
            Postingan Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-16">
            {related.map((post) => (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
                category={post.category}
              />
            ))}
          </div>
        </div>
      )}
      <Spacer />
      <div className="border-y border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex flex-col items-start text-start py-4">
            <span className="text-md text-[var(--muted-foreground)]">Sebelumnya</span>
            <span className="text-[var(--muted-foreground)] font-medium group-hover:text-[var(--foreground)] line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col items-end text-end py-4">
            <span className="text-md text-[var(--muted-foreground)]">Selanjutnya</span>
            <span className="text-[var(--muted-foreground)] font-medium group-hover:text-[var(--foreground)] line-clamp-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}