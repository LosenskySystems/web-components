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
      return 'web-stack-horizontal';
    }
    return 'web-stack-vertical'; // vertical or column
  };

  // Generate spacing class
  const getSpacingClass = () => {
    const spacingMap = {
      none: 'none',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    };
    
    // Only use gap if not using dividers
    if (!divider) {
      return `web-stack-spacing-${spacingMap[spacing]}`;
    }
    return '';
  };

  // Generate alignment class
  const getAlignClass = () => {
    if (!align) return '';
    return `web-stack-align-${align}`;
  };

  // Generate justify class
  const getJustifyClass = () => {
    if (!justify) return '';
    return `web-stack-justify-${justify}`;
  };

  // Generate wrap class
  const getWrapClass = () => {
    return wrap ? 'web-stack-wrap' : '';
  };

  // Combine all classes
  const baseClasses = 'web-stack';
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
      none: 'none',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    };

    const isHorizontal = direction === 'horizontal' || direction === 'row';
    const dividerClass = isHorizontal 
      ? `web-stack-divider-horizontal web-stack-divider-spacing-${spacingMap[spacing]}` 
      : `web-stack-divider-vertical web-stack-divider-spacing-${spacingMap[spacing]}`;

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

