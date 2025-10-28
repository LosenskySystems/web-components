import React, { useMemo } from 'react';
import type { PaginationProps } from './pagination.types';

export { type PaginationProps } from './pagination.types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showPageNumbers = true,
  showInfo = true,
  size = 'md',
  showFirstLast = true,
  maxVisible = 7,
}) => {
  // Calculate visible page numbers
  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisible / 2);

    if (currentPage <= half + 1) {
      // Near the beginning
      for (let i = 1; i <= maxVisible - 2; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - half) {
      // Near the end
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalPages - maxVisible + 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      pages.push(1);
      pages.push('ellipsis');
      const start = currentPage - half + 2;
      const end = currentPage + half - 2;
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisible]);

  // Generate CSS classes
  const baseClasses = 'web-pagination';
  const sizeClass = `web-pagination-${size}`;
  
  const classes = [
    baseClasses,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={classes}>
      {showInfo && (
        <div className="web-pagination-info">
          Page {currentPage} of {totalPages}
        </div>
      )}
      
      <div className="web-pagination-controls">
        {showFirstLast && (
          <button
            className="web-pagination-button web-pagination-first"
            onClick={(e) => handlePageChange(1, e)}
            disabled={currentPage === 1}
            aria-label="Go to first page"
          >
            «
          </button>
        )}
        
        <button
          className="web-pagination-button web-pagination-prev"
          onClick={(e) => handlePageChange(currentPage - 1, e)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          ‹
        </button>
        
        {showPageNumbers &&
          visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="web-pagination-ellipsis"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }
            
            return (
              <button
                key={page}
                className={`web-pagination-button web-pagination-page ${
                  page === currentPage ? 'web-pagination-active' : ''
                }`}
                onClick={(e) => handlePageChange(page as number, e)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        
        <button
          className="web-pagination-button web-pagination-next"
          onClick={(e) => handlePageChange(currentPage + 1, e)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          ›
        </button>
        
        {showFirstLast && (
          <button
            className="web-pagination-button web-pagination-last"
            onClick={(e) => handlePageChange(totalPages, e)}
            disabled={currentPage === totalPages}
            aria-label="Go to last page"
          >
            »
          </button>
        )}
      </div>
    </div>
  );
};

