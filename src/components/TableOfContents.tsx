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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const activeText = headings.find((h) => h.slug === activeId)?.text ?? 'Di halaman ini';

  return (
    <>
      {/* Desktop TOC */}
      <nav aria-label="Table of contents" className="hidden md:block sticky top-4 bg-[var(--color-bg)] p-4 w-64 text-sm max-h-[calc(100vh-5rem)] overflow-auto">
        <strong className="text-[var(--color-fg)] mb-2 block">Di halaman ini</strong>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.slug} className={`ml-${(h.depth - 2) * 4}`}>
              <button
                onClick={() => handleClick(h.slug)}
                aria-current={activeId === h.slug ? 'true' : undefined}
                className={`text-left w-full px-2 py-1 rounded transition-colors ${
                  activeId === h.slug
                    ? 'text-[var(--color-fg)] font-semibold'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl z-50 shadow-md">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-t-xl"
        >
          <span className="flex items-center gap-2">
            <i className="ri-list-check mr-1 text-lg" />
            {activeText}
          </span>
          <i className={`ri-arrow-${mobileOpen ? 'up' : 'down'}-s-line`} />
        </button>

        {mobileOpen && (
          <ul className="max-h-64 overflow-auto bg-[var(--color-bg)] border-t text-sm rounded-b-xl">
            {headings.map((h) => (
              <li key={h.slug}>
                <button
                  onClick={() => {
                    handleClick(h.slug);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                    activeId === h.slug
                      ? 'bg-[var(--color-bg)] text-[var(--color-fg)] font-semibold'
                      : 'hover:bg-[var(--color-hover)]'
                  }`}
                >
                  <i
                    className={`${
                      h.depth === 2
                        ? 'ri-subtract-line'
                        : h.depth === 3
                        ? 'ri-arrow-right-s-line'
                        : 'ri-circle-line'
                    } text-xs`}
                  />
                  {h.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}