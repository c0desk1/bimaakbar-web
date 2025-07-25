import type { FC } from 'react';

interface SortButtonProps {
  sortAsc: boolean;
  toggleSort: () => void;
}

const SortButton: FC<SortButtonProps> = ({ sortAsc, toggleSort }) => {
  return (
    <button
      aria-label={sortAsc ? 'Urut: Terlama' : 'Urut: Terbaru'}
      aria-pressed={sortAsc}
      onClick={toggleSort}
      className="rounded-full text-sm flex items-center gap-1 px-2 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] uppercase cursor-pointer"
    >
      {sortAsc ? 'Terlama' : 'Terbaru'}
      <svg
        stroke="var(--color-fg)"
        className={`size-4 transition-transform duration-500 ${sortAsc ? 'rotate-180' : 'rotate-0'}`}
      >
        <use href="/ui.svg#arrow-up"></use>
      </svg>
    </button>
  );
};

export default SortButton;