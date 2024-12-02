import React from "react";

import "./Pagination.scss";

interface PaginationPropsType {
  totalPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationPropsType> = ({
  totalPage,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 1;
    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 ||
        i === totalPage ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? "active" : ""}`}
            aria-current={currentPage === i ? "page" : undefined}
            aria-label={`Go to page ${i}`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - range - 1 && i > 1) ||
        (i === currentPage + range + 1 && i < totalPage)
      ) {
        pageNumbers.push(
          <span key={`ellipsis-${i}`} className="ellipsis">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };
  return (
    <nav className="pagination-container" aria-label="Pagination Navigation">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="nav-button"
        aria-label="Go to previous page"
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="nav-button"
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
