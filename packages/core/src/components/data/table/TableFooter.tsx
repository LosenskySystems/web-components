import React from 'react';
import type { TableFooterProps } from './table.types';
import { useTableContext } from './TableContext';

export const TableFooter: React.FC<TableFooterProps> = ({ className = '' }) => {
  const context = useTableContext();
  const { pagination, currentPage, onPageChange, pageSize, processedData } = context as any;

  if (!pagination) return null;

  const totalItems = processedData?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const pageNumbers = [];
  const maxPageNumbers = 5;
  const halfMax = Math.floor(maxPageNumbers / 2);
  let startPage = Math.max(1, currentPage - halfMax);
  let endPage = Math.min(totalPages, currentPage + halfMax);

  if (endPage - startPage < maxPageNumbers) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, maxPageNumbers);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const footerClasses = ['web-table-footer', className].filter(Boolean).join(' ');

  return (
    <tfoot className={footerClasses}>
      <tr>
        <td colSpan={100} className="web-table-pagination">
          <div className="web-table-pagination-container">
            <div className="web-table-pagination-info">
              Showing {startIndex}-{endIndex} of {totalItems}
            </div>
            <div className="web-table-pagination-controls">
              <button
                className="web-table-pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`web-table-pagination-btn ${
                    page === currentPage ? 'web-table-pagination-btn-active' : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="web-table-pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

