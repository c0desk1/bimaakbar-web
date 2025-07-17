import { useEffect, useState } from 'react';
type Heading = { slug: string; text: string; depth: number };

interface Props { headings: Heading[]; }

function buildNested(headings: Heading[]) {
  const toc: any[] = []; const parents = new Map<number, any>();
  headings.forEach(h => {
    const node = { ...h, sub: [] };
    parents.set(h.depth, node);
    if (h.depth === 2) toc.push(node);
    else parents.get(h.depth - 1)?.sub.push(node);
  });
  return toc;
}

export default function TableOfContents({ headings }: Props) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });
    headings.forEach(h => {
      const el = document.getElementById(h.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [headings]);

  const nested = buildNested(headings);

  const renderList = (nodes: any[]) => (
    <ul className="space-y-1 ml-4">
      {nodes.map(n => (
        <li key={n.slug}>
          <a href={`#${n.slug}`}
            className={active === n.slug ? 'text-[var(--color-fg)] font-semibold' : 'text-[var(--color-fg)]'}
          >
            {n.text}
          </a>
          {n.sub.length > 0 && renderList(n.sub)}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <aside className="hidden md:block sticky top-4 bg-[var(--color-bg)] p-4 text-sm border-l border-[var(--color-accent)] w-64">
        <strong>Daftar Isi</strong>
        {renderList(nested)}
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg)] border-t border-[var(--color-bg)] p-2 z-50">
        <select
          onChange={e => {
            const el = document.getElementById(e.target.value);
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full p-2 border rounded"
        >
          <option disabled selected>Daftar Isi</option>
          {headings.map(h => (
            <option key={h.slug} value={h.slug}>{h.text}</option>
          ))}
        </select>
      </div>
    </>
  );
}