import React from 'react';
import type { GridProps, ResponsiveColumns } from './grid.types';

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  rows,
  gap,
  gapX,
  gapY,
  align,
  justify,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  // Generate column classes (responsive)
  const getColsClasses = () => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    
    // Handle responsive columns
    const responsiveCols = cols as ResponsiveColumns;
    const classes = [];
    
    // Base column (use smallest breakpoint or default to 1)
    const baseCol = responsiveCols.sm || 1;
    classes.push(`grid-cols-${baseCol}`);
    
    // Add responsive variants
    if (responsiveCols.md) classes.push(`md:grid-cols-${responsiveCols.md}`);
    if (responsiveCols.lg) classes.push(`lg:grid-cols-${responsiveCols.lg}`);
    if (responsiveCols.xl) classes.push(`xl:grid-cols-${responsiveCols.xl}`);
    if (responsiveCols['2xl']) classes.push(`2xl:grid-cols-${responsiveCols['2xl']}`);
    
    return classes.join(' ');
  };

  // Generate row classes
  const getRowsClass = () => {
    if (!rows) return '';
    if (rows === 'auto') return 'grid-rows-auto';
    return `grid-rows-${rows}`;
  };

  // Generate gap classes
  const getGapClasses = () => {
    const gapMap = {
      none: '0',
      xs: '1',
      sm: '2',
      md: '4',
      lg: '6',
      xl: '8',
    };

    if (gap) {
      return `gap-${gapMap[gap]}`;
    }

    const classes = [];
    if (gapX) classes.push(`gap-x-${gapMap[gapX]}`);
    if (gapY) classes.push(`gap-y-${gapMap[gapY]}`);
    
    return classes.join(' ');
  };

  // Generate alignment class
  const getAlignClass = () => {
    if (!align) return '';
    return `items-${align}`;
  };

  // Generate justify class
  const getJustifyClass = () => {
    if (!justify) return '';
    const justifyMap = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      stretch: 'justify-stretch',
      between: 'justify-between',
      around: 'justify-around',
    };
    return justifyMap[justify];
  };

  // Combine all classes
  const baseClasses = 'grid web-grid';
  const colsClasses = getColsClasses();
  const rowsClass = getRowsClass();
  const gapClasses = getGapClasses();
  const alignClass = getAlignClass();
  const justifyClass = getJustifyClass();

  const classes = [
    baseClasses,
    colsClasses,
    rowsClass,
    gapClasses,
    alignClass,
    justifyClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

