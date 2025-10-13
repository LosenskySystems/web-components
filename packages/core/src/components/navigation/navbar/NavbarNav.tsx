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
      start: 'web-navbar-nav-start',
      center: 'web-navbar-nav-center',
      end: 'web-navbar-nav-end',
    };
    return alignMap[align];
  };

  const baseClasses = 'web-navbar-nav';
  const alignClass = getAlignClass();
  const classes = [baseClasses, alignClass, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} {...props}>
      {children}
    </nav>
  );
};

