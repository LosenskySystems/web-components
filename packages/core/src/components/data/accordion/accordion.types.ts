import React from 'react';

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: string[];
  onOpenChange?: (openItems: string[]) => void;
  allowMultiple?: boolean;
}

export interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  title: React.ReactNode;
  className?: string;
  disabled?: boolean;
}