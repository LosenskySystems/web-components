import React, { useState, useRef } from 'react';
import type { InputProps } from './input.types';

export { type InputProps } from './input.types';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  className = '',
  disabled = false,
  required = false,
  name,
  id,
  size = 'md',
  variant = 'default',
  error = false,
  errorText,
  successText,
  helperText,
  icon,
  iconPosition = 'left',
  clearable = false,
  loading = false,
  autoComplete,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
  readOnly = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use controlled or uncontrolled value
  const inputValue = value !== undefined ? value : internalValue;
  
  // Determine variant based on error state
  const actualVariant = error ? 'error' : variant;
  
  // Generate CSS classes
  const baseClasses = 'web-input';
  const sizeClass = `web-input-${size}`;
  const variantClass = `web-input-${actualVariant}`;
  const iconClass = icon ? `web-input-with-icon web-input-icon-${iconPosition}` : '';
  const clearableClass = clearable && inputValue ? 'web-input-clearable' : '';
  const loadingClass = loading ? 'web-input-loading' : '';
  const hasHelperClass = helperText || errorText || successText ? 'web-input-with-helper' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    iconClass,
    clearableClass,
    loadingClass,
    hasHelperClass,
    className
  ].filter(Boolean).join(' ');

  // Handle value changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(event);
  };

  // Handle clear button
  const handleClear = () => {
    if (inputRef.current) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      
      if (value === undefined) {
        setInternalValue('');
      }
      
      onChange?.(syntheticEvent);
      inputRef.current.focus();
    }
  };

  // Get helper text content and styling
  const getHelperText = () => {
    if (errorText) {
      return (
        <span className="web-input-helper web-input-helper-error" role="alert">
          {errorText}
        </span>
      );
    }
    if (successText) {
      return (
        <span className="web-input-helper web-input-helper-success">
          {successText}
        </span>
      );
    }
    if (helperText) {
      return (
        <span className="web-input-helper web-input-helper-default">
          {helperText}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="web-input-wrapper">
      <div className="web-input-container">
        {icon && iconPosition === 'left' && (
          <div className="web-input-icon web-input-icon-left">
            {icon}
          </div>
        )}
        
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classes}
          disabled={disabled || loading}
          required={required}
          name={name}
          id={id}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          {...props}
        />
        
        {loading && (
          <div className="web-input-loading-spinner">
            <div className="web-input-spinner" />
          </div>
        )}
        
        {clearable && inputValue && !loading && (
          <button
            type="button"
            className="web-input-clear-button"
            onClick={handleClear}
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        
        {icon && iconPosition === 'right' && (
          <div className="web-input-icon web-input-icon-right">
            {icon}
          </div>
        )}
      </div>
      
      {getHelperText()}
    </div>
  );
};
