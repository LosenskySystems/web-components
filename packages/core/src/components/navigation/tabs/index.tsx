import React, { useState, createContext, useContext } from 'react';
import type { 
  TabsProps, 
  TabsListProps, 
  TabsTriggerProps, 
  TabsContentProps, 
  TabsPanelProps 
} from './tabs.types';

export { 
  type TabsProps, 
  type TabsListProps, 
  type TabsTriggerProps, 
  type TabsContentProps, 
  type TabsPanelProps 
} from './tabs.types';

// Context for tabs state
interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'pills' | 'underline';
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  size = 'md',
  variant = 'default',
  orientation = 'horizontal',
  className = '',
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const contextValue: TabsContextType = {
    value: currentValue,
    onValueChange: handleValueChange,
    size,
    variant,
    orientation,
  };

  const baseClasses = 'web-tabs';
  const sizeClass = `web-tabs-${size}`;
  const variantClass = variant !== 'default' ? `web-tabs-${variant}` : '';
  const orientationClass = orientation === 'vertical' ? 'web-tabs-vertical' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    orientationClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={classes}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList component
export const TabsList: React.FC<TabsListProps> = ({
  className = '',
  children,
}) => {
  const { variant } = useTabsContext();
  
  const baseClasses = 'web-tabs-list';
  const variantClass = variant !== 'default' ? `web-tabs-${variant}` : '';
  
  const classes = [
    baseClasses,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tablist">
      {children}
    </div>
  );
};

// TabsTrigger component
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled = false,
  className = '',
  children,
  icon,
}) => {
  const { value: currentValue, onValueChange, size } = useTabsContext();
  const isActive = currentValue === value;
  
  const handleClick = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const baseClasses = 'web-tabs-trigger';
  const sizeClass = `web-tabs-${size}`;
  const activeClass = isActive ? 'web-tabs-trigger-active' : '';
  const disabledClass = disabled ? 'web-tabs-trigger-disabled' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    activeClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {icon && <span className="web-tabs-trigger-icon">{icon}</span>}
      {children}
    </button>
  );
};

// TabsContent component
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className = '',
  children,
  forceMount = false,
}) => {
  const { value: currentValue } = useTabsContext();
  const isActive = currentValue === value;
  
  if (!isActive && !forceMount) {
    return null;
  }

  const baseClasses = 'web-tabs-content';
  const classes = [
    baseClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={!isActive}
    >
      {children}
    </div>
  );
};

// TabsPanel component (alias for TabsContent)
export const TabsPanel: React.FC<TabsPanelProps> = (props) => {
  return <TabsContent {...props} />;
};
