// components/BlogControls.tsx
import type { FC } from 'react';
import SearchBar from './SearchBar';

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
    <div className="sticky top-16 w-full flex flex-col md:flex-row bg-[var(--color-bg)] gap-4 z-10">
      <div className="flex-1">
        <ul className="flex flex-row overflow-x-auto py-4 items-center">
          {['', ...categories].map((category, index) => (
            <li key={index} className="px-1">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`text-ellipsis truncate px-2 py-1 rounded-full border border-[var(--color-border)] text-sm cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[var(--color-hover)] text-[var(--color-fg)]'
                    : 'text-[var(--color-muted)] border-[var(--color-border)]'
                }`}
              >
                {category || 'Semua'}
              </button>
            </li>
          ))}
          {selectedCategory !== '' && (
            <li className="px-1">
              <button
                onClick={() => setSelectedCategory('')}
                className="flex items-center gap-1 text-sm p-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer">
                <svg stroke="var(--color-fg)" className="size-4 pointer-events-none">
                  <use href="/ui.svg#close"></use>
                </svg>
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="w-auto md:max-w-[40%] py-4">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    </div>
  );
};

export default BlogControls;
