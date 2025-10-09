import React, { useState, useRef, useEffect } from 'react';
import type { DropdownProps, DropdownItemProps, DropdownDividerProps, DropdownMenuProps } from './dropdown.types';

export { type DropdownProps, type DropdownItemProps, type DropdownDividerProps, type DropdownMenuProps } from './dropdown.types';

// DropdownItem component
export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  icon,
  disabled = false,
  onClick,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const classes = [
    'web-dropdown-item',
    disabled ? 'web-dropdown-item-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={handleClick}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {icon && <span className="web-dropdown-item-icon">{icon}</span>}
      {children}
    </div>
  );
};

// DropdownDivider component
export const DropdownDivider: React.FC<DropdownDividerProps> = ({
  className = '',
}) => {
  return <div className={`web-dropdown-divider ${className}`} />;
};

// DropdownMenu component
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  placement = 'bottom',
  size = 'md',
  className = '',
}) => {
  const placementClass = `web-dropdown-menu-${placement}`;
  const sizeClass = `web-dropdown-${size}`;
  
  const classes = [
    'web-dropdown-menu',
    placementClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="menu">
      {children}
    </div>
  );
};

// Main Dropdown component
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  placement = 'bottom',
  size = 'md',
  isOpen: controlledIsOpen,
  onOpenChange,
  className = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = (newIsOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
    }
  };

  const handleTriggerClick = () => {
    handleOpenChange(!isOpen);
  };

  const handleItemClick = (item: DropdownItemProps) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    handleOpenChange(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const triggerElement = React.Children.only(children) as React.ReactElement<any>;
  
  const enhancedTrigger = React.cloneElement(triggerElement, {
    onClick: (event: React.MouseEvent) => {
      (triggerElement.props as any).onClick?.(event);
      handleTriggerClick();
    }
  } as any);

  return (
    <div ref={dropdownRef} className={`web-dropdown ${className}`}>
      {enhancedTrigger}
      
      {isOpen && (
        <DropdownMenu placement={placement} size={size}>
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              icon={item.icon}
              disabled={item.disabled}
              onClick={() => handleItemClick(item)}
            >
              {item.children}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
};
