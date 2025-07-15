type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
  
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm border rounded-lg ${
                currentPage === page
                  ? "bg-[var(--color-hover)] text-[var(--color-fg)]"
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
          className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }
  