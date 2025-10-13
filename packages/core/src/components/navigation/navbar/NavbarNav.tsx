import React from 'react';
import type { NavbarNavProps } from './navbar.types';

export const NavbarNav: React.FC<NavbarNavProps> = ({
  align = 'start',
  className = '',
  children,
  ...props
}) => {
  // Generate alignment class
  const getAlignClass = () => {
    const alignMap = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    };
    return alignMap[align];
  };

  const baseClasses = 'web-navbar-nav hidden md:flex items-center gap-6 flex-1';
  const alignClass = getAlignClass();
  const classes = [baseClasses, alignClass, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} {...props}>
      {children}
    </nav>
  );
};

