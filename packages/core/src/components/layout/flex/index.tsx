import React from 'react';
import type { FlexProps } from './flex.types';

export { type FlexProps } from './flex.types';

export const Flex: React.FC<FlexProps> = ({
  children,
  className = '',
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-flex';
  const directionClass = `web-flex-${direction}`;
  const alignClass = align ? `web-flex-align-${align}` : '';
  const justifyClass = justify ? `web-flex-justify-${justify}` : '';
  const wrapClass = wrap ? `web-flex-wrap-${wrap}` : '';
  const gapClass = gap ? `web-flex-gap-${gap}` : '';
  
  const classes = [
    baseClasses,
    directionClass,
    alignClass,
    justifyClass,
    wrapClass,
    gapClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

