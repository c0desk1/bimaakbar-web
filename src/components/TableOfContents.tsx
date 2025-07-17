import { useEffect, useState, useRef, KeyboardEvent } from 'react';

type Heading = { text: string; slug: string; depth: number };
interface Props { headings: Heading[]; }

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const obsRef = useRef<IntersectionObserver>();

  // Build nested tree for collapse
  const tree = headings.reduce<Record<string, Heading & { children?: any[] }>>((acc, h) => {
    acc[h.slug] = { ...h, children: [] };
    return acc;
  }, {});
  headings.forEach(h => {
    if (h.depth === 3) {
      const parent = headings.find(p => p.depth === 2 && headings.indexOf(p) < headings.indexOf(h));
      if (parent) tree[parent.slug].children!.push(tree[h.slug]);
    }
  });

  const roots = headings.filter(h => h.depth === 2).map(h => tree[h.slug]);

  // Scroll spy
  useEffect(() => {
    const cb = (entries: IntersectionObserverEntry[]) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setActiveId(e.target.id);
          history.replaceState(null, '', `#${e.target.id}`);
          break;
        }
      }
    };
    obsRef.current = new IntersectionObserver(cb, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });
    headings.forEach(h => {
      const el = document.getElementById(h.slug);
      if (el) obsRef.current!.observe(el);
    });
    const hash = location.hash.slice(1);
    if (hash) setActiveId(hash);
    return () => obsRef.current?.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const headerH = document.querySelector('header')?.clientHeight || 80;
      window.scrollBy(0, -headerH);
    }
  };

  const handleKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollTo(id);
      setOpenMobile(false);
    }
  };

  return (
    <>
      {/* Desktop */}
      <nav
        ref={navRef}
        aria-label="Table of contents"
        className="hidden md:block sticky top-4 bg-[var(--color-bg)] p-4 w-64 text-sm max-h-[calc(100vh-5rem)] overflow-auto border border-[var(--color-border)] rounded"
      >
        <strong className="text-[var(--color-fg)] mb-2 block">Di halaman ini</strong>
        {roots.map(r => (
          <div key={r.slug}>
            <button
              onClick={() => scrollTo(r.slug)}
              onKeyDown={e => handleKey(e, r.slug)}
              aria-current={activeId === r.slug ? 'true' : undefined}
              className={`w-full text-left px-2 py-1 rounded transition-colors ${
                activeId === r.slug ? 'bg-[var(--color-bg)] text-[var(--color-fg)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
              }`}
            >
              {r.text}
            </button>
            {r.children?.length && (
              <>
                <button
                  onClick={() => setCollapsed(c => ({ ...c, [r.slug]: !c[r.slug] }))}
                  className="text-xs text-[var(--color-muted)] mb-1 ml-4"
                  aria-expanded={!collapsed[r.slug]}
                >
                  {collapsed[r.slug] ? '►' : '▼'} {collapsed[r.slug] ? 'Tampilkan' : 'Sembunyikan'} sub
                </button>
                {!collapsed[r.slug] &&
                  r.children.map(c => (
                    <button
                      key={c.slug}
                      onClick={() => scrollTo(c.slug)}
                      onKeyDown={e => handleKey(e, c.slug)}
                      aria-current={activeId === c.slug ? 'true' : undefined}
                      className={`block w-full text-left px-4 py-1 rounded transition-colors ${
                        activeId === c.slug ? 'bg-[var(--color-bg)] text-[var--color-fg)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                      }`}
                    >
                      {c.text}
                    </button>
                  ))}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Floating mobile toggle */}
      <button
        className="md:hidden fixed bottom-4 right-4 bg-[var(--color-card-bg)] text-[var(--color-fg)] p-3 rounded-full shadow-lg z-50"
        aria-label="Toggle Table of Contents"
        onClick={() => setOpenMobile(!openMobile)}
      >
        <i className="ri-list-check-line text-xl"></i>
      </button>

      {/* Mobile panel */}
      {openMobile && (
        <div className="md:hidden fixed inset-0 bg-[var(--color-bg)] bg-opacity-50 z-40">
          <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-card-bg)] border-t border-[var(--color-border)] rounded-t-lg shadow-lg max-h-[70vh] overflow-auto p-4 z-50">
            <strong className="block text-[var(--color-fg)] mb-2">Di halaman ini</strong>
            {roots.map(r => (
              <div key={`m-${r.slug}`} className="mb-2">
                <button
                  onClick={() => { scrollTo(r.slug); setOpenMobile(false); }}
                  className={`w-full text-left px-2 py-1 rounded transition-colors ${
                    activeId === r.slug ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                  }`}
                >
                  {r.text}
                </button>
                {r.children?.length && (
                  <div className="ml-4">
                    {r.children.map(c => (
                      <button
                        key={`mc-${c.slug}`}
                        onClick={() => { scrollTo(c.slug); setOpenMobile(false); }}
                        className={`block w-full text-left px-2 py-1 rounded transition-colors ${
                          activeId === c.slug ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                        }`}
                      >
                        {c.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}