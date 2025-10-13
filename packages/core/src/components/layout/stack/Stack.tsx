import React from 'react';
import type { StackProps } from './stack.types';

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  spacing = 'md',
  align,
  justify,
  wrap = false,
  divider = false,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  // Generate direction class
  const getDirectionClass = () => {
    if (direction === 'horizontal' || direction === 'row') {
      return 'flex-row';
    }
    return 'flex-col'; // vertical or column
  };

  // Generate spacing class
  const getSpacingClass = () => {
    const spacingMap = {
      none: '0',
      xs: '1',
      sm: '2',
      md: '4',
      lg: '6',
      xl: '8',
      '2xl': '12',
    };
    
    // Only use gap if not using dividers
    if (!divider) {
      return `gap-${spacingMap[spacing]}`;
    }
    return '';
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
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
    };
    return justifyMap[justify];
  };

  // Generate wrap class
  const getWrapClass = () => {
    return wrap ? 'flex-wrap' : '';
  };

  // Combine all classes
  const baseClasses = 'flex web-stack';
  const directionClass = getDirectionClass();
  const spacingClass = getSpacingClass();
  const alignClass = getAlignClass();
  const justifyClass = getJustifyClass();
  const wrapClass = getWrapClass();

  const classes = [
    baseClasses,
    directionClass,
    spacingClass,
    alignClass,
    justifyClass,
    wrapClass,
    className
  ].filter(Boolean).join(' ');

  // Handle dividers
  const renderChildren = () => {
    if (!divider) {
      return children;
    }

    const spacingMap = {
      none: '0',
      xs: '1',
      sm: '2',
      md: '4',
      lg: '6',
      xl: '8',
      '2xl': '12',
    };

    const isHorizontal = direction === 'horizontal' || direction === 'row';
    const dividerClass = isHorizontal 
      ? `border-l border-gray-300 mx-${spacingMap[spacing]}` 
      : `border-t border-gray-300 my-${spacingMap[spacing]}`;

    const childrenArray = React.Children.toArray(children);
    
    return childrenArray.map((child, index) => (
      <React.Fragment key={index}>
        {child}
        {index < childrenArray.length - 1 && (
          <div className={dividerClass} />
        )}
      </React.Fragment>
    ));
  };

  return (
    <Component className={classes} {...props}>
      {renderChildren()}
    </Component>
  );
};

