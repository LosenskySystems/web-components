import React, { useState, useMemo } from 'react';
import type { TableProps, TableContextType } from './table.types';
import { TableContext } from './TableContext';

export const Table: React.FC<TableProps> = ({
  data = [],
  columns,
  className = '',
  sortable = false,
  onSort,
  filterable = false,
  onFilter,
  pagination = false,
  pageSize = 10,
  selection = 'none',
  onSelectionChange,
  selectedRows,
  onRowClick,
  interactive = false,
  emptyMessage = 'No data available',
  loading = false,
  children,
  ...props
}) => {
  // State management
  const [internalSortKey, setInternalSortKey] = useState<string | null>(null);
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalFilterValue, setInternalFilterValue] = useState('');
  const [internalSelectedRows, setInternalSelectedRows] = useState<any[]>([]);

  // Use external or internal state
  const currentSelectedRows = selectedRows || internalSelectedRows;

  // Sorting logic
  const handleSort = (key: string) => {
    if (!sortable) return;

    const newDirection = internalSortKey === key && internalSortDirection === 'asc' ? 'desc' : 'asc';
    setInternalSortKey(key);
    setInternalSortDirection(newDirection);

    if (onSort) {
      onSort(key, newDirection);
    }
  };

  // Filtering logic
  const handleFilter = (value: string) => {
    setInternalFilterValue(value);
    if (onFilter) {
      onFilter(value);
    }
  };

  // Selection logic
  const handleSelectionChange = (rows: any[]) => {
    const newSelection = selection === 'single' ? rows.slice(-1) : rows;
    setInternalSelectedRows(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  // Process data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filtering
    if (internalFilterValue && internalFilterValue.trim()) {
      result = result.filter((row) => {
        return columns.some((col) => {
          const value = row[col.key];
          return String(value).toLowerCase().includes(internalFilterValue.toLowerCase());
        });
      });
    }

    // Apply sorting
    if (internalSortKey && internalSortDirection) {
      result = [...result].sort((a, b) => {
        const aValue = a[internalSortKey];
        const bValue = b[internalSortKey];
        if (aValue === bValue) return 0;
        const comparison = aValue < bValue ? -1 : 1;
        return internalSortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, internalFilterValue, internalSortKey, internalSortDirection, columns]);

  // Pagination
  const paginationConfig = typeof pagination === 'object' ? pagination : {};
  const effectivePageSize = (paginationConfig as any).pageSize || pageSize;
  const effectiveCurrentPage = (paginationConfig as any).currentPage || internalCurrentPage;

  const handlePageChange = (page: number) => {
    if ((paginationConfig as any).onPageChange) {
      (paginationConfig as any).onPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  const contextValue: TableContextType = {
    columns,
    sortKey: internalSortKey,
    sortDirection: internalSortDirection,
    onSort: handleSort,
    selection,
    selectedRows: currentSelectedRows,
    onSelectionChange: handleSelectionChange,
    onRowClick,
    interactive,
    filterable,
    filterValue: internalFilterValue,
    onFilter: handleFilter,
    pagination,
    pageSize: effectivePageSize,
    currentPage: effectiveCurrentPage,
    onPageChange: handlePageChange,
    processedData,
    emptyMessage,
    sortable,
  };

  const baseClasses = 'web-table';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <TableContext.Provider value={contextValue}>
      <div className={classes} {...props}>
        {filterable && (
          <div className="web-table-filter">
            <input
              type="text"
              placeholder="Search..."
              value={internalFilterValue}
              onChange={(e) => handleFilter(e.target.value)}
              className="web-table-filter-input"
            />
          </div>
        )}
        <div className="web-table-wrapper">
          <table className="web-table-inner">
            {children}
          </table>
        </div>
      </div>
    </TableContext.Provider>
  );
};

