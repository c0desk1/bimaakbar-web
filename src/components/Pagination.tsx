import type { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex justify-center items-center gap-2" aria-label="Navigasi halaman">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm px-2 py-1 border border-[var(--color-border)] hover:bg-[var(--color-hover)] rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-30">
        Sebelumnya
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-sm px-2 py-1 rounded-full border border-[var(--color-border)] ${
            currentPage === page
              ? "bg-[var(--color-hover)] text-[var(--color-fg)]"
              : "text-[var(--color-muted)] hover:bg-[var(--color-hover)]"
          }`}
          aria-current={currentPage === page ? "page" : undefined}>
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm px-2 py-1 border border-[var(--color-border)] hover:bg-[var(--color-hover)] rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-30">
        Berikutnya
      </button>
    </nav>
  );
};

export default Pagination;
