import React from "react";

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
  console.log(totalPage);
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
            className={currentPage === i ? "active" : ""}
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
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
