import React from 'react';
import type { NavbarActionsProps } from './navbar.types';

export const NavbarActions: React.FC<NavbarActionsProps> = ({
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'web-navbar-actions hidden md:flex items-center gap-2';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

