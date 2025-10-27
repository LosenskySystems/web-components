import React from 'react';
import type { TableHeaderProps } from './table.types';
import { useTableContext } from './TableContext';

export const TableHead: React.FC<TableHeaderProps> = ({ className = '' }) => {
  const context = useTableContext();
  const { columns, sortKey, sortDirection, onSort, selection, sortable } = context;

  const classes = ['web-table-header', className].filter(Boolean).join(' ');

  return (
    <thead className={classes}>
      <tr>
        {selection !== 'none' && (
          <th className="web-table-header-cell web-table-header-cell-checkbox">
            {selection === 'multiple' && <input type="checkbox" className="web-table-checkbox" />}
          </th>
        )}
        {columns.map((column) => {
          const isSortable = column.sortable && sortable;
          const isSorted = sortKey === column.key;
          const cellClasses = [
            'web-table-header-cell',
            isSortable ? 'web-table-header-cell-sortable' : '',
            isSorted ? 'web-table-header-cell-sorted' : '',
            isSorted && sortDirection === 'asc' ? 'web-table-header-cell-sort-asc' : '',
            isSorted && sortDirection === 'desc' ? 'web-table-header-cell-sort-desc' : '',
            column.align ? `web-table-header-cell-align-${column.align}` : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <th
              key={column.key}
              className={cellClasses}
              style={column.width ? { width: column.width } : undefined}
              onClick={isSortable ? () => onSort?.(column.key) : undefined}
            >
              {column.header}
              {isSorted && (
                <span className="web-table-sort-icon">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

