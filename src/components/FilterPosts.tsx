// components/BlogControls.tsx
import type { FC } from 'react';
import SearchBar from './ui/SearchBar';

interface BlogControlsProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
}

const BlogControls: FC<BlogControlsProps> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="w-full py-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <ul className="flex flex-row overflow-x-auto py-4 items-center">
          {['', ...categories].map((category, index) => (
            <li key={index} className="px-1">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`text-ellipsis truncate px-2 py-1 rounded-xl border border-[var(--color-border)] text-sm cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[var(--color-hover)] text-[var(--color-fg)]'
                    : 'text-[var(--color-muted)] border-[var(--color-border)]'}`}>
                {category || 'Semua'}
              </button>
            </li>
          ))}
          {selectedCategory !== '' && (
            <li className="px-1">
              <button
                onClick={() => setSelectedCategory('')}
                className="flex items-center gap-1 text-sm p-1 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer">
                <svg stroke="var(--color-fg)" className="size-4 pointer-events-none">
                  <use href="/ui.svg#close"></use>
                </svg>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BlogControls;
