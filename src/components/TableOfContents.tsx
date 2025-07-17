import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
};

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [headings]);

  return (
    <>
      <aside className="hidden md:block sticky top-4 bg-gray-100 p-4 text-sm border-l border-gray-300 w-64">
        <strong>Daftar Isi</strong>
        <ul className="mt-2 space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={
                  activeId === h.id
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700'
                }
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-2 z-50">
        <select
          onChange={(e) => {
            const target = document.getElementById(e.target.value);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-full p-2 border rounded"
        >
          <option disabled selected>
            Daftar Isi
          </option>
          {headings.map((h) => (
            <option key={h.id} value={h.id}>
              {h.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}