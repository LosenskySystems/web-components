import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import type { SelectContextType, SelectProps, SelectItemProps } from './select.types';

export { type SelectProps, type SelectItemProps, type SelectContextType } from './select.types';

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be used within a Select');
  }
  return context;
};

// Main Select component
export const Select: React.FC<SelectProps> & {
  Item: typeof SelectItem;
} = ({
  value,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  className = '',
  children,
  size = 'md',
  variant = 'default',
  error = false,
  errorText,
  successText,
  helperText,
  loading = false,
  autoFocus = false,
  required = false,
  name,
  id,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Determine variant based on error state
  const actualVariant = error ? 'error' : variant;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [autoFocus]);

  // Get selected item label
  const getSelectedLabel = () => {
    const items = React.Children.toArray(children) as React.ReactElement[];
    const selectedItem = items.find(item => item.props.value === value);
    return selectedItem?.props.children || placeholder;
  };

  // Generate CSS classes
  const baseClasses = 'web-select';
  const sizeClass = `web-select-${size}`;
  const variantClass = `web-select-${actualVariant}`;
  const disabledClass = disabled ? 'web-select-disabled' : '';
  const openClass = isOpen ? 'web-select-open' : '';
  const loadingClass = loading ? 'web-select-loading' : '';
  const hasHelperClass = helperText || errorText || successText ? 'web-select-with-helper' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    disabledClass,
    openClass,
    loadingClass,
    hasHelperClass,
    className
  ].filter(Boolean).join(' ');

  const contextValue: SelectContextType = {
    value,
    onChange,
    isOpen,
    setIsOpen,
    placeholder,
    disabled,
    size,
    variant: actualVariant,
    error,
    loading,
  };

  // Get helper text content and styling
  const getHelperText = () => {
    if (errorText) {
      return (
        <span className="web-select-helper web-select-helper-error" role="alert">
          {errorText}
        </span>
      );
    }
    if (successText) {
      return (
        <span className="web-select-helper web-select-helper-success">
          {successText}
        </span>
      );
    }
    if (helperText) {
      return (
        <span className="web-select-helper web-select-helper-default">
          {helperText}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="web-select-wrapper">
      <SelectContext.Provider value={contextValue}>
        <div className={classes} ref={selectRef} {...props}>
          <button
            ref={triggerRef}
            type="button"
            className="web-select-trigger"
            onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
            disabled={disabled || loading}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-required={required}
            name={name}
            id={id}
          >
            <span className="web-select-value">{getSelectedLabel()}</span>
            <span className={`web-select-arrow ${isOpen ? 'web-select-arrow-open' : ''}`} aria-hidden="true">
              ▼
            </span>
            
            {loading && (
              <div className="web-select-loading-spinner">
                <div className="web-select-spinner" />
              </div>
            )}
          </button>
          
          {isOpen && !loading && (
            <div className="web-select-dropdown" role="listbox">
              {children}
            </div>
          )}
        </div>
        
        {getHelperText()}
      </SelectContext.Provider>
    </div>
  );
};

// Select.Item component
const SelectItem: React.FC<SelectItemProps> = ({
  value,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const { value: selectedValue, onChange, setIsOpen } = useSelectContext();
  
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const baseClasses = 'web-select-item';
  const selectedClasses = selectedValue === value ? 'web-select-item-selected' : '';
  const disabledClasses = disabled ? 'web-select-item-disabled' : '';
  
  const classes = [
    baseClasses,
    selectedClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="option"
      aria-selected={selectedValue === value}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </div>
  );
};

// Attach Item to Select
Select.Item = SelectItem;
