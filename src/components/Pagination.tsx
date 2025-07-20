type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
      <div className="flex justify-center items-center gap-4 py-6">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
          className="px-3 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] text-sm border border-[var(--color-border)] rounded-lg cursor-pointer disabled:opacity-50">
          Sebelumnya
        </button>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`p-2 size-9 items-center text-center text-sm border border-[var(--color-border)] rounded-full cursor-pointer ${
                currentPage === page
                  ? "bg-[var(--color-bg)] text-[var(--color-fg)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] text-sm border border-[var(--color-border)] rounded-lg cursor-pointer disabled:opacity-50">
          Selanjutnya
        </button>
      </div>
    );
  }
  