import React from 'react';
import type { ButtonProps } from './button.types';

export { type ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  loading = false,
  loadingText = 'Loading...',
  ...props
}) => {
  // Component-first approach - complete styles in CSS, Tailwind for overrides
  const baseClasses = 'web-btn';
  const variantClass = `web-btn-${variant}`;
  const sizeClass = `web-btn-${size}`;
  const disabledClass = disabled ? 'web-btn-disabled' : '';
  const loadingClass = loading ? 'web-btn-loading' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');


  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      aria-label={loading ? loadingText : undefined}
      {...props}
    >
      {loading ? (
        <>
          <span className="web-btn-spinner" aria-hidden="true" />
          <span className="web-btn-loading-text">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
