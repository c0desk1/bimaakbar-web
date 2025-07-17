import { useEffect, useState } from 'react';

type Heading = { text: string; slug: string; depth: number };
interface Props { headings: Heading[] }

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    );

    const els = headings.map(h => document.getElementById(h.slug)).filter(Boolean) as HTMLElement[];
    els.forEach(el => observer.observe(el));

    const hash = window.location.hash.slice(1);
    if (hash) setActiveId(hash);

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const activeHeading = headings.find(h => h.slug === activeId);

  return (
    <>
      <nav aria-label="Table of contents" className="hidden md:block w-64 text-sm max-h-[calc(100vh-5rem)] overflow-visible">
        <strong className="block mb-2 text-[var(--color-fg)]">Di halaman ini</strong>
        <ul className="space-y-1">
          {headings.map(h => (
            <li key={h.slug}>
              <button onClick={() => scrollTo(h.slug)}
                className={`block w-full text-left py-2 ${
                  activeId === h.slug
                    ? 'text-[var(--color-fg)] font-semibold'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                }`}>
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="md:hidden px-4 pt-4 pb-2">
        <button className="flex items-center justify-between w-full px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm font-medium bg-[var(--color-card-bg)]" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span className="flex items-center text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
            {activeHeading ? `Bagian: ${activeHeading.text}` : 'Daftar Isi'}
          </span>
          <i className={`ri-arrow-${open ? 'up' : 'down'}-s-line ml-2`} />
        </button>
        {open && (
          <ul className="mt-2 pl-3 text-sm max-h-[50vh] overflow-auto transition-all">
            {headings.map((h) => (
              <li key={h.slug}>
                <button onClick={() => { scrollTo(h.slug); setOpen(false); }}
                  className={`block text-left w-full px-2 py-1 rounded ${
                    activeId === h.slug
                      ? 'text-[var(--color-fg)] font-semibold'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                  }`}>
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
