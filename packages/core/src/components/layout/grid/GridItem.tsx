import React from 'react';
import type { GridItemProps } from './grid.types';

export const GridItem: React.FC<GridItemProps> = ({
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  // Generate column span classes
  const getColSpanClass = () => {
    if (!colSpan) return '';
    if (colSpan === 'full') return 'col-span-full';
    return `col-span-${colSpan}`;
  };

  // Generate row span classes
  const getRowSpanClass = () => {
    if (!rowSpan) return '';
    if (rowSpan === 'full') return 'row-span-full';
    return `row-span-${rowSpan}`;
  };

  // Generate column start class
  const getColStartClass = () => {
    if (!colStart) return '';
    return `col-start-${colStart}`;
  };

  // Generate row start class
  const getRowStartClass = () => {
    if (!rowStart) return '';
    return `row-start-${rowStart}`;
  };

  // Combine all classes
  const classes = [
    'web-grid-item',
    getColSpanClass(),
    getRowSpanClass(),
    getColStartClass(),
    getRowStartClass(),
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

