import { useEffect, useState, useRef } from 'react';

type Heading = {
  text: string;
  slug: string;
  depth: number;
};

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          break;
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '0px 0px -70% 0px',
      threshold: 0.1,
    });

    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observerRef.current?.observe(el));

    const hash = window.location.hash.slice(1);
    if (hash) setActiveId(hash);

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.scrollBy(0, -80);
    }
  };

  return (
    <>
      {/* Desktop TOC */}
      <nav
        aria-label="Table of contents"
        className="hidden md:block sticky top-4 bg-[var(--color-bg)] p-4 border-l border-[var--color-border)] w-64 text-sm max-h-[calc(100vh-5rem)] overflow-auto"
      >
        <strong className="text-[var(--color-fg)] mb-2 block">Di halaman ini</strong>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.slug} className={`ml-${(h.depth - 2) * 4}`}>
              <button
                onClick={() => handleClick(h.slug)}
                aria-current={activeId === h.slug ? 'true' : undefined}
                className={`text-left w-full px-2 py-1 rounded transition-colors ${
                  activeId === h.slug
                    ? 'bg-[var(--color-accent)] text-[var(--color-fg)] font-semibold'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC (dropdown) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl z-50 p-2 shadow">
        <select
          className="w-full p-2 text-sm"
          value={activeId ?? ''}
          onChange={(e) => handleClick(e.target.value)}
        >
          <option disabled value="">
            Di halaman ini
          </option>
          {headings.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}