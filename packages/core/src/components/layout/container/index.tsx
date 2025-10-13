import React from 'react';
import type { ContainerProps } from './container.types';

export { type ContainerProps } from './container.types';

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  padding,
  paddingX,
  paddingY,
  centered = true,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  // Generate size class
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'web-container-sm';
      case 'md': return 'web-container-md';
      case 'lg': return 'web-container-lg';
      case 'xl': return 'web-container-xl';
      case '2xl': return 'web-container-2xl';
      case 'full': return 'web-container-full';
      case 'fluid': return 'web-container-fluid';
      default: return 'web-container-lg';
    }
  };

  // Generate padding classes
  const getPaddingClasses = () => {
    const classes = [];
    
    if (padding) {
      classes.push(`web-container-padding-${padding}`);
    } else {
      // Apply individual padding classes if no general padding
      if (paddingX) {
        classes.push(`web-container-padding-x-${paddingX}`);
      }
      if (paddingY) {
        classes.push(`web-container-padding-y-${paddingY}`);
      }
    }
    
    return classes.join(' ');
  };

  // Generate centering class
  const getCenteringClass = () => {
    return centered ? 'web-container-centered' : '';
  };

  // Combine all classes
  const baseClasses = 'web-container';
  const sizeClass = getSizeClass();
  const paddingClasses = getPaddingClasses();
  const centeringClass = getCenteringClass();
  
  const classes = [
    baseClasses,
    sizeClass,
    paddingClasses,
    centeringClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
