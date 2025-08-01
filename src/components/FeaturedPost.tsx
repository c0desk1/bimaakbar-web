'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FeaturedPostProps {
  title: string;
  slug: string;
  description: string;
  cover?: string;
  category?: string;
  date?: string;
}

export default function FeaturedPost({ title, slug, description, cover, category, date }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${slug}`} className="block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--hover)]">
      {cover && (
        <div className="relative w-full h-60">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {category && (
          <span className="uppercase text-xs px-2 py-1 bg-[var(--background)] text-[var(--foreground)] rounded-lg border border-[var(--border)] font-medium">
            {category}
          </span>
        )}
        <h2 className="text-2xl font-semibold mt-2 text-[var(--foreground)]">{title}</h2>
        <p className="mt-3 text-[var(--muted)]">{description}</p>
        {date && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            {new Date(date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
