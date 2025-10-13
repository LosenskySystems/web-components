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
    if (colSpan === 'full') return 'web-grid-item-col-span-full';
    return `web-grid-item-col-span-${colSpan}`;
  };

  // Generate row span classes
  const getRowSpanClass = () => {
    if (!rowSpan) return '';
    if (rowSpan === 'full') return 'web-grid-item-row-span-full';
    return `web-grid-item-row-span-${rowSpan}`;
  };

  // Generate column start class
  const getColStartClass = () => {
    if (!colStart) return '';
    return `web-grid-item-col-start-${colStart}`;
  };

  // Generate row start class
  const getRowStartClass = () => {
    if (!rowStart) return '';
    return `web-grid-item-row-start-${rowStart}`;
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

