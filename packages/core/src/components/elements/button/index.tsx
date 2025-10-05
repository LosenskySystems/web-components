import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  // Custom color props
  color?: string;
  colorHover?: string;
  colorText?: string;
  colorBorder?: string;
}

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
