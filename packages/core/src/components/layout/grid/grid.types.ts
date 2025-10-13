import React from 'react';

export interface ResponsiveColumns {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}

export interface GridProps {
  /** Column configuration (responsive) */
  cols?: number | ResponsiveColumns;
  
  /** Row configuration (optional) */
  rows?: number | 'auto';
  
  /** Gap spacing for both directions */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Horizontal gap spacing */
  gapX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Vertical gap spacing */
  gapY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Align items on cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Justify items on main axis */
  justify?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around';
  
  /** Polymorphic component type */
  as?: React.ElementType;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface GridItemProps {
  /** Column span */
  colSpan?: number | 'full';
  
  /** Row span */
  rowSpan?: number | 'full';
  
  /** Column start position */
  colStart?: number;
  
  /** Row start position */
  rowStart?: number;
  
  /** Polymorphic component type */
  as?: React.ElementType;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

