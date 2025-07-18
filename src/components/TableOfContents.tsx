import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

type Heading = { text: string; slug: string; depth: number };
interface Props { headings: Heading[] }

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const userScrollRef = useRef(false);
  let scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        
        if (userScrollRef.current) {
          return;
        }

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

  useEffect(() => {
    if (!activeId) return;

    const activeLink = document.querySelector(`nav button[data-slug="${activeId}"]`);

    if (activeLink) {
      activeLink.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);

    userScrollRef.current = true;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      scrollTimeout.current = window.setTimeout(() => {
        userScrollRef.current = false;
      }, 1000);
    }
  };

  const activeHeading = headings.find(h => h.slug === activeId);

  return (
    <>
      <nav aria-label="Table of contents" className="hidden md:block w-64 text-sm text-left overflow-y-auto max-h-[calc(100vh-4rem)]">
        <strong className="block mb-2 text-[var(--color-fg)] uppercase">Di halaman ini</strong>
        <ul className="pl-0 text-left">
          {headings.map(h => {
            const paddingLeft = h.depth > 2 ? `${(h.depth - 2) * 1.0}rem` : '0rem';
            return (
              <li key={h.slug} 
                  className={clsx('pl-2 border-l border-[var(--color-border)]',
                    {'border-l-2 border-[var(--color-fg)]': activeId === h.slug,
                      'border-l-2 border-[var(--color-hover)] hover:border-[var(--color-border)]': activeId !== h.slug,
                    }
                  )}>
                <button
                  data-slug={h.slug}
                  onClick={() => scrollTo(h.slug)}
                  aria-current={activeId === h.slug ? 'true' : 'false'}
                  style={{ paddingLeft }}
                  className={clsx(
                    'block w-full text-left cursor-pointer space-y-4 py-1',
                    {
                      'text-[var(--color-fg)]': activeId === h.slug,
                      'text-[var(--color-muted)] hover:text-[var(--color-fg)]': activeId !== h.slug,
                    }
                  )}>
                  {h.text}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="w-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg flex-1 items-center md:hidden px-2 py-2">
        <button className="flex items-center text-left justify-between w-full text-sm font-medium" onClick={() => setOpen(!open)} aria-expanded={open}>
          <i className={`ri-arrow-${open ? 'up' : 'down'}-s-line flex mr-1 cursor-pointer w-auto`} />
          <span className="items-center text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%] flex-1">
            {activeHeading ? `Bagian: ${activeHeading.text}` : 'Daftar Isi'}
          </span>
        </button>
        {open && (
          <ul className="mt-2 py-2 text-sm max-h-[50vh] overflow-auto transition-all">
            {headings.map(h => {
              const paddingLeft = h.depth > 2 ? `${(h.depth - 2) * 1.0}rem` : '0rem';
              return (
                <li key={h.slug}>
                  <button
                    data-slug={h.slug}
                    onClick={() => scrollTo(h.slug)}
                    aria-current={activeId === h.slug ? 'true' : 'false'}
                    style={{ paddingLeft }}
                    className={clsx(
                      'block w-full text-left py-1 cursor-pointer',
                      {
                        'text-[var(--color-fg)]': activeId === h.slug,
                        'text-[var(--color-muted)] hover:text-[var(--color-fg)]': activeId !== h.slug,
                      }
                    )}>
                    {h.text}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
