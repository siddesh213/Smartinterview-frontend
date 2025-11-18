import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ page, onPageChange, hasMore }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={!hasMore}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
