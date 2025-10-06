import { useState, createContext, useContext, useMemo, useCallback } from 'react';
import type { AccordionProps, AccordionItemProps } from './accordion.types';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
};

export const Accordion = ({
  children,
  className,
  defaultOpen = [],
  onOpenChange,
  allowMultiple = false,
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = useCallback((value: string) => {
    setOpenItems((prevOpenItems) => {
      const isOpen = prevOpenItems.includes(value);
      let newOpenItems: string[];

      if (allowMultiple) {
        newOpenItems = isOpen
          ? prevOpenItems.filter((item) => item !== value)
          : [...prevOpenItems, value];
      } else {
        newOpenItems = isOpen ? [] : [value];
      }

      onOpenChange?.(newOpenItems);
      return newOpenItems;
    });
  }, [allowMultiple, onOpenChange]);

  const contextValue = useMemo(() => ({ openItems, toggleItem, allowMultiple }), [openItems, toggleItem, allowMultiple]);

  return (
    <div className={`accordion-root ${className || ''}`}>
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

export const AccordionItem = ({
  children,
  value,
  title,
  className,
  disabled = false,
}: AccordionItemProps) => {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.includes(value);

  const handleToggle = () => {
    if (!disabled) {
      toggleItem(value);
    }
  };

  return (
    <div className={`accordion-item ${disabled ? 'accordion-item--disabled' : ''} ${className || ''}`}>
      <button
        className="accordion-header"
        onClick={handleToggle}
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="accordion-title">{title}</span>
        <span className={`accordion-icon ${isOpen ? 'accordion-icon--open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export type { AccordionProps, AccordionItemProps };