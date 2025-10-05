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
  color,
  colorHover,
  colorText,
  colorBorder,
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

  // Custom styles for color overrides
  const customStyles: React.CSSProperties = {};
  
  if (variant === 'custom' || color) {
    if (color) customStyles.backgroundColor = color;
    if (colorText) customStyles.color = colorText;
    if (colorBorder) customStyles.borderColor = colorBorder;
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      style={customStyles}
      data-color-hover={colorHover}
      {...props}
    >
      {loading && <span className="web-btn-spinner" aria-hidden="true" />}
      <span className={loading ? 'web-btn-content-loading' : ''}>{children}</span>
    </button>
  );
};
