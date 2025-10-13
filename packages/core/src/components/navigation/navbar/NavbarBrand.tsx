import React from 'react';
import type { NavbarBrandProps } from './navbar.types';

export const NavbarBrand: React.FC<NavbarBrandProps> = ({
  href,
  as,
  className = '',
  children,
  ...props
}) => {
  const Component = as || (href ? 'a' : 'div');
  
  const baseClasses = 'web-navbar-brand';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  const componentProps = {
    className: classes,
    ...(href && Component === 'a' ? { href } : {}),
    ...props,
  };

  return <Component {...componentProps}>{children}</Component>;
};

