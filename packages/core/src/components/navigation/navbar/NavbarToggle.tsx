import React from 'react';
import type { NavbarToggleProps } from './navbar.types';

export const NavbarToggle: React.FC<NavbarToggleProps> = ({
  onClick,
  isOpen = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'web-navbar-toggle md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
      {...props}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

