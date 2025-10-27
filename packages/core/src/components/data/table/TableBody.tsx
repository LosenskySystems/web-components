import React from 'react';
import type { TableBodyProps } from './table.types';
import { useTableContext } from './TableContext';
import { TableRow } from './TableRow';

export const TableBody: React.FC<TableBodyProps> = ({ data, className = '' }) => {
  const context = useTableContext();
  const { columns, interactive, pagination, currentPage, pageSize, processedData, emptyMessage } = context;

  const bodyClasses = ['web-table-body', className].filter(Boolean).join(' ');

  // Use pagination if enabled
  let displayData = data || processedData || [];

  if (pagination && !data) {
    const startIndex = (currentPage - 1) * (pageSize || 10);
    const endIndex = startIndex + (pageSize || 10);
    displayData = processedData?.slice(startIndex, endIndex) || [];
  }

  if (displayData.length === 0) {
    return (
      <tbody className={bodyClasses}>
        <tr>
          <td colSpan={columns.length + (context.selection !== 'none' ? 1 : 0)} className="web-table-empty">
            {emptyMessage || 'No data available'}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={bodyClasses}>
      {displayData.map((row: any, index: number) => (
        <TableRow
          key={index}
          row={row}
          interactive={interactive}
          selected={(context.selectedRows || []).includes(row)}
        />
      ))}
    </tbody>
  );
};

