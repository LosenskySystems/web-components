export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageNumbers?: boolean;
  showInfo?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showFirstLast?: boolean;
  maxVisible?: number;
}

