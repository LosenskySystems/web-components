import React, { useRef, useEffect, useState } from 'react';
import type { CheckboxProps } from './checkbox.types';

export { type CheckboxProps } from './checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  indeterminate = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  children,
  onChange,
  className = '',
  inputProps = {},
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(false);
  
  // Determine if component is controlled
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // Handle indeterminate state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Generate CSS classes
  const baseClasses = 'web-checkbox';
  const sizeClass = `web-checkbox-${size}`;
  const variantClass = variant !== 'default' ? `web-checkbox-${variant}` : '';
  const stateClass = checked ? 'web-checkbox-checked' : '';
  const indeterminateClass = indeterminate ? 'web-checkbox-indeterminate' : '';
  const disabledClass = disabled ? 'web-checkbox-disabled' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    stateClass,
    indeterminateClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  // Handle change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const newChecked = event.target.checked;
      
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      
      // Call onChange callback
      if (onChange) {
        onChange(newChecked);
      }
    }
  };

  // Get icon based on state
  const getIcon = () => {
    if (indeterminate) {
      return '−'; // Minus sign for indeterminate
    }
    if (checked) {
      return '✓'; // Checkmark for checked
    }
    return '';
  };

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="web-checkbox-input"
        {...inputProps}
      />
      <div className="web-checkbox-control">
        <span className="web-checkbox-icon">{getIcon()}</span>
      </div>
      {children && (
        <span className="web-checkbox-label">{children}</span>
      )}
    </label>
  );
};