import React from 'react';
import type { NavbarItemProps } from './navbar.types';

export const NavbarItem: React.FC<NavbarItemProps> = ({
  href,
  active = false,
  disabled = false,
  as,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const Component = as || (href ? 'a' : 'button');
  
  // Generate state classes
  const getStateClasses = () => {
    const classes = [];
    
    if (active) {
      classes.push('text-primary-600 font-medium');
    } else {
      classes.push('text-gray-700 hover:text-primary-600');
    }
    
    if (disabled) {
      classes.push('opacity-50 cursor-not-allowed pointer-events-none');
    } else if (!active) {
      classes.push('transition-colors');
    }
    
    return classes.join(' ');
  };

  const baseClasses = 'web-navbar-item px-3 py-2 rounded-md text-sm whitespace-nowrap';
  const stateClasses = getStateClasses();
  const classes = [baseClasses, stateClasses, className].filter(Boolean).join(' ');

  const componentProps = {
    className: classes,
    ...(href && Component === 'a' ? { href } : {}),
    ...(onClick && !disabled ? { onClick } : {}),
    ...(disabled ? { 'aria-disabled': 'true' } : {}),
    ...(active ? { 'aria-current': 'page' } : {}),
    ...props,
  };

  return <Component {...componentProps}>{children}</Component>;
};

