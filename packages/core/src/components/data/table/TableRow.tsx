import React from 'react';
import type { TableRowProps } from './table.types';
import { useTableContext } from './TableContext';
import { TableCell } from './TableCell';

export const TableRow: React.FC<TableRowProps> = ({
  row,
  className = '',
  selected = false,
  interactive: rowInteractive,
}) => {
  const context = useTableContext();
  const { columns, selection, selectedRows, onRowClick, interactive } = context;
  const isInteractive = rowInteractive !== undefined ? rowInteractive : interactive;

  const handleRowClick = () => {
    if (isInteractive && onRowClick) {
      onRowClick(row);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (selection === 'none') return;

    if (selection === 'multiple') {
      const currentSelected = selectedRows || [];
      let newSelected;

      if (selected) {
        newSelected = currentSelected.filter((r) => r !== row);
      } else {
        newSelected = [...currentSelected, row];
      }
      context.onSelectionChange?.(newSelected);
    } else {
      // Single selection
      context.onSelectionChange?.([row]);
    }
  };

  const rowClasses = [
    'web-table-row',
    isInteractive ? 'web-table-row-interactive' : '',
    selected ? 'web-table-row-selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={rowClasses} onClick={isInteractive ? handleRowClick : undefined}>
      {selection !== 'none' && (
        <td className="web-table-cell web-table-cell-checkbox">
          <input
            type={selection === 'single' ? 'radio' : 'checkbox'}
            className="web-table-checkbox"
            checked={selected}
            onChange={handleSelect}
            onClick={(e) => e.stopPropagation()}
          />
        </td>
      )}
      {columns.map((column) => (
        <TableCell key={column.key} align={column.align}>
          {column.render ? column.render(row[column.key], row) : row[column.key]}
        </TableCell>
      ))}
    </tr>
  );
};

