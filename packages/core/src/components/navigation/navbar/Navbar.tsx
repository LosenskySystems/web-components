import React from 'react';
import type { NavbarProps } from './navbar.types';

export const Navbar: React.FC<NavbarProps> = ({
  position = 'static',
  variant = 'light',
  bordered = false,
  shadow = false,
  fluid = false,
  className = '',
  children,
  ...props
}) => {
  // Generate position classes
  const getPositionClasses = () => {
    const positionMap = {
      static: 'web-navbar-static',
      sticky: 'web-navbar-sticky',
      fixed: 'web-navbar-fixed',
    };
    return positionMap[position];
  };

  // Generate variant classes
  const getVariantClasses = () => {
    const variantMap = {
      light: 'web-navbar-light',
      dark: 'web-navbar-dark',
      transparent: 'web-navbar-transparent',
    };
    return variantMap[variant];
  };

  // Generate border class
  const getBorderClass = () => {
    if (!bordered) return '';
    return variant === 'dark' ? 'web-navbar-bordered-dark' : 'web-navbar-bordered-light';
  };

  // Generate shadow class
  const getShadowClass = () => {
    return shadow ? 'web-navbar-shadow' : '';
  };

  // Generate width class
  const getWidthClass = () => {
    return fluid ? 'web-navbar-fluid' : 'web-navbar-container';
  };

  const baseClasses = 'web-navbar';
  const positionClasses = getPositionClasses();
  const variantClasses = getVariantClasses();
  const borderClass = getBorderClass();
  const shadowClass = getShadowClass();
  const widthClass = getWidthClass();

  const outerClasses = [
    baseClasses,
    positionClasses,
    variantClasses,
    borderClass,
    shadowClass,
    className
  ].filter(Boolean).join(' ');

  const innerClasses = widthClass;

  return (
    <header className={outerClasses} {...props}>
      <div className={innerClasses}>
        {children}
      </div>
    </header>
  );
};

