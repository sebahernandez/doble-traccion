interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-gray-800 text-white disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="px-4 py-2 text-white">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-gray-800 text-white disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}
