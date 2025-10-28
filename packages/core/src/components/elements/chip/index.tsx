import React from 'react';
import type { ChipProps } from './chip.types';

export { type ChipProps } from './chip.types';

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'md',
  removable = true,
  onRemove,
  disabled = false,
  leftSlot,
  rightSlot,
  className = '',
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-chip';
  const variantClass = `web-chip-${variant}`;
  const sizeClass = `web-chip-${size}`;
  const removableClass = removable ? 'web-chip-removable' : '';
  const disabledClass = disabled ? 'web-chip-disabled' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    removableClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove(e);
    }
  };

  return (
    <span
      className={classes}
      role={removable ? 'button' : undefined}
      {...props}
    >
      {leftSlot && <span className="web-chip-left-slot">{leftSlot}</span>}
      <span className="web-chip-content">{children}</span>
      {removable && !disabled && (
        <button
          type="button"
          className="web-chip-remove"
          onClick={handleRemove}
          aria-label="Remove"
        >
          ×
        </button>
      )}
      {rightSlot && <span className="web-chip-right-slot">{rightSlot}</span>}
    </span>
  );
};

