import React, { useState, useCallback } from 'react';
import type { ToggleProps } from './toggle.types';

export { type ToggleProps } from './toggle.types';

export const Toggle: React.FC<ToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  size = 'md',
  showLabels = false,
  labelPosition = 'inside',
  onLabel = 'On',
  offLabel = 'Off',
  children,
  onChange,
  className = '',
  inputProps = {},
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  // Determine if component is controlled
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // Generate CSS classes
  const baseClasses = 'web-toggle';
  const sizeClass = `web-toggle-${size}`;
  const stateClass = checked ? 'web-toggle-checked' : '';
  const disabledClass = disabled ? 'web-toggle-disabled' : '';
  const labelClass = showLabels ? `web-toggle-labels-${labelPosition}` : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    stateClass,
    disabledClass,
    labelClass,
    className
  ].filter(Boolean).join(' ');

  // Handle change
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  }, [isControlled, onChange]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!disabled) {
        handleChange({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, [disabled, checked, handleChange]);

  const renderLabels = () => {
    if (!showLabels) return null;

    const labelText = checked ? onLabel : offLabel;
    
    if (labelPosition === 'inside') {
      return (
        <span className="web-toggle-label-inside">
          {labelText}
        </span>
      );
    }

    return (
      <span className="web-toggle-label-outside">
        {labelText}
      </span>
    );
  };

  return (
    <div className={classes}>
      <div className="web-toggle-container">
        <input
          type="checkbox"
          className="web-toggle-input"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={children ? undefined : (checked ? onLabel : offLabel)}
          {...inputProps}
        />
        <div
          className="web-toggle-track"
          onClick={() => !disabled && handleChange({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
        >
          <div className="web-toggle-thumb" />
          {renderLabels()}
        </div>
      </div>
      {children && (
        <label className="web-toggle-label">
          {children}
        </label>
      )}
    </div>
  );
};
