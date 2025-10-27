import { Table } from './Table';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';

// Export types
export {
  type TableProps,
  type ColumnDef,
  type PaginationConfig,
  type TableHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableCellProps,
  type TableFooterProps,
} from './table.types';

// Export main Table component and attach compound components
(Table as any).Head = TableHead;
(Table as any).Body = TableBody;
(Table as any).Row = TableRow;
(Table as any).Cell = TableCell;
(Table as any).Footer = TableFooter;

export { Table };
