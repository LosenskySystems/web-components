import React from 'react';

export interface ColumnDef {
  key: string;
  header: string | React.ReactNode;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  filterable?: boolean;
}

export interface TableProps {
  data: any[];
  columns: ColumnDef[];
  className?: string;
  sortable?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  filterable?: boolean;
  onFilter?: (filterValue: string) => void;
  pagination?: boolean | PaginationConfig;
  pageSize?: number;
  selection?: 'none' | 'single' | 'multiple';
  onSelectionChange?: (selectedRows: any[]) => void;
  selectedRows?: any[];
  onRowClick?: (row: any) => void;
  interactive?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export interface PaginationConfig {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  showPageNumbers?: boolean;
  showInfo?: boolean;
}

export interface TableContextType {
  columns: ColumnDef[];
  sortKey: string | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort?: (key: string) => void;
  selection: 'none' | 'single' | 'multiple';
  selectedRows?: any[];
  onSelectionChange?: (selectedRows: any[]) => void;
  onRowClick?: (row: any) => void;
  interactive?: boolean;
  filterable?: boolean;
  filterValue?: string;
  onFilter?: (value: string) => void;
  pagination?: boolean | PaginationConfig;
  pageSize?: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  processedData?: any[];
  emptyMessage?: string;
  sortable?: boolean;
}

export interface TableHeaderProps {
  className?: string;
}

export interface TableBodyProps {
  data?: any[];
  className?: string;
}

export interface TableRowProps {
  row: any;
  className?: string;
  selected?: boolean;
  interactive?: boolean;
}

export interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableFooterProps {
  className?: string;
}

