import { useAppDispatch } from "../../app/hooks";
import { setCurrentPage } from "../../features/filters/filtersSlice";
import "../../styles/components/Pagination.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

/**
 * Reusable Pagination component
 * Handles page navigation for filtered and sorted products
 */
const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Calculate start and end of visible range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if near start
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }

      // Adjust if near end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </button>

      <div className="pagination-numbers">
        {renderPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${currentPage}-${index}`}
                className="pagination-ellipsis"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              className={`pagination-number ${
                pageNum === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
