import React from 'react';
import type { TableCellProps } from './table.types';

export const TableCell: React.FC<TableCellProps> = ({ children, align = 'left', className = '' }) => {
  const cellClasses = ['web-table-cell', `web-table-cell-align-${align}`, className]
    .filter(Boolean)
    .join(' ');

  return <td className={cellClasses}>{children}</td>;
};

