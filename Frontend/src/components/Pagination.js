import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
