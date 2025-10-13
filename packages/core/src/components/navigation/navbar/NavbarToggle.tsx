import React from 'react';
import type { NavbarToggleProps } from './navbar.types';

export const NavbarToggle: React.FC<NavbarToggleProps> = ({
  onClick,
  isOpen = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'web-navbar-toggle';
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
        className="web-navbar-toggle-icon"
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

