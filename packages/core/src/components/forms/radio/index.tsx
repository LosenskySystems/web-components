import React, { useRef, useState } from 'react';
import type { RadioProps } from './radio.types';

export { type RadioProps } from './radio.types';

export const Radio: React.FC<RadioProps> = ({
  checked: controlledChecked,
  disabled = false,
  size = 'md',
  variant = 'default',
  children,
  onChange,
  className = '',
  inputProps = {},
  value,
  name,
  allowUncheck = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(false);
  
  // Determine if component is controlled
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // Generate CSS classes
  const baseClasses = 'web-radio';
  const sizeClass = `web-radio-${size}`;
  const variantClass = variant !== 'default' ? `web-radio-${variant}` : '';
  const stateClass = checked ? 'web-radio-checked' : '';
  const disabledClass = disabled ? 'web-radio-disabled' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    stateClass,
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

  // Handle click for unchecking when allowUncheck is true
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!disabled && allowUncheck && checked) {
      event.preventDefault();
      
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalChecked(false);
      }
      
      // Call onChange callback
      if (onChange) {
        onChange(false);
      }
    }
  };

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        type="radio"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onClick={handleClick}
        className="web-radio-input"
        value={value}
        name={name}
        {...inputProps}
      />
      <div className="web-radio-control">
        <div className="web-radio-dot"></div>
      </div>
      {children && (
        <span className="web-radio-label">{children}</span>
      )}
    </label>
  );
};
