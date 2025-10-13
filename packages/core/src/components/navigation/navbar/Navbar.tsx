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
      static: '',
      sticky: 'sticky top-0 z-50',
      fixed: 'fixed top-0 w-full z-50',
    };
    return positionMap[position];
  };

  // Generate variant classes
  const getVariantClasses = () => {
    const variantMap = {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-900 text-white',
      transparent: 'bg-transparent',
    };
    return variantMap[variant];
  };

  // Generate border class
  const getBorderClass = () => {
    if (!bordered) return '';
    return variant === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200';
  };

  // Generate shadow class
  const getShadowClass = () => {
    return shadow ? 'shadow-lg' : '';
  };

  // Generate width class
  const getWidthClass = () => {
    return fluid ? 'w-full' : '';
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
    widthClass,
    className
  ].filter(Boolean).join(' ');

  const innerClasses = fluid
    ? 'flex items-center justify-between px-4 py-3'
    : 'container mx-auto flex items-center justify-between px-4 py-3';

  return (
    <header className={outerClasses} {...props}>
      <div className={innerClasses}>
        {children}
      </div>
    </header>
  );
};

