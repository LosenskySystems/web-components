import { createContext, useContext } from 'react';
import type { TableContextType } from './table.types';

// Table Context
export const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('Table compound components must be used within a Table');
  }
  return context;
};

