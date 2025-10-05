import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

// Context for Select compound component
interface SelectContextType {
  value?: string;
  onChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be used within a Select');
  }
  return context;
};

// Main Select component
export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> & {
  Item: typeof SelectItem;
} = ({
  value,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

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

  // Get selected item label
  const getSelectedLabel = () => {
    const items = React.Children.toArray(children) as React.ReactElement[];
    const selectedItem = items.find(item => item.props.value === value);
    return selectedItem?.props.children || placeholder;
  };

  const baseClasses = 'web-select';
  const disabledClasses = disabled ? 'web-select-disabled' : '';
  const openClasses = isOpen ? 'web-select-open' : '';
  const allClasses = `${baseClasses} ${disabledClasses} ${openClasses} ${className || ''}`.trim();

  const contextValue: SelectContextType = {
    value,
    onChange,
    isOpen,
    setIsOpen,
    placeholder,
    disabled,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={allClasses} ref={selectRef} {...props}>
        <button
          type="button"
          className="web-select-trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="web-select-value">{getSelectedLabel()}</span>
          <span className="web-select-arrow" aria-hidden="true">
            ▼
          </span>
        </button>
        
        {isOpen && (
          <div className="web-select-dropdown" role="listbox">
            {children}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
};

// Select.Item component
export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  disabled = false,
  className,
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

  const baseClasses = 'web-select-item';
  const selectedClasses = selectedValue === value ? 'web-select-item-selected' : '';
  const disabledClasses = disabled ? 'web-select-item-disabled' : '';
  const allClasses = `${baseClasses} ${selectedClasses} ${disabledClasses} ${className || ''}`.trim();

  return (
    <div
      className={allClasses}
      role="option"
      aria-selected={selectedValue === value}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Attach Item to Select
Select.Item = SelectItem;
