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
      return `web-grid-cols-${cols}`;
    }
    
    // Handle responsive columns
    const responsiveCols = cols as ResponsiveColumns;
    const classes = [];
    
    // Base column (use smallest breakpoint or default to 1)
    const baseCol = responsiveCols.sm || 1;
    classes.push(`web-grid-cols-${baseCol}`);
    
    // Add responsive variants
    if (responsiveCols.md) classes.push(`web-grid-cols-md-${responsiveCols.md}`);
    if (responsiveCols.lg) classes.push(`web-grid-cols-lg-${responsiveCols.lg}`);
    if (responsiveCols.xl) classes.push(`web-grid-cols-xl-${responsiveCols.xl}`);
    if (responsiveCols['2xl']) classes.push(`web-grid-cols-2xl-${responsiveCols['2xl']}`);
    
    return classes.join(' ');
  };

  // Generate row classes
  const getRowsClass = () => {
    if (!rows) return '';
    if (rows === 'auto') return 'web-grid-rows-auto';
    return `web-grid-rows-${rows}`;
  };

  // Generate gap classes
  const getGapClasses = () => {
    const gapMap = {
      none: 'none',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    };

    if (gap) {
      return `web-grid-gap-${gapMap[gap]}`;
    }

    const classes = [];
    if (gapX) classes.push(`web-grid-gap-x-${gapMap[gapX]}`);
    if (gapY) classes.push(`web-grid-gap-y-${gapMap[gapY]}`);
    
    return classes.join(' ');
  };

  // Generate alignment class
  const getAlignClass = () => {
    if (!align) return '';
    return `web-grid-align-${align}`;
  };

  // Generate justify class
  const getJustifyClass = () => {
    if (!justify) return '';
    return `web-grid-justify-${justify}`;
  };

  // Combine all classes
  const baseClasses = 'web-grid';
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

