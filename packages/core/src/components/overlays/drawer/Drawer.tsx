import React, { useState, useRef, useEffect, useCallback, createContext } from 'react';
import { createPortal } from 'react-dom';
import type { DrawerProps, DrawerContextValue } from './drawer.types';

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export const Drawer: React.FC<DrawerProps> = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  side = 'right',
  size = 'md',
  width,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  backdropClassName = '',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (disabled) return;
    
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
      onOpenChange?.(false);
    }
  }, [disabled, isControlled, onOpenChange]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, handleClose]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const drawerElement = drawerRef.current;
    const focusableElements = drawerElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    drawerElement.addEventListener('keydown', handleTab);
    firstFocusable?.focus();

    return () => {
      drawerElement.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const sizeClass = width ? '' : `web-drawer-${size}`;
  const sideClass = `web-drawer-${side}`;
  const disabledClass = disabled ? 'web-drawer-disabled' : '';

  const drawerStyle: React.CSSProperties = {};
  if (width) {
    drawerStyle.width = typeof width === 'number' ? `${width}px` : width;
  }

  const contextValue: DrawerContextValue = {
    onClose: handleClose,
    disabled,
  };

  const drawerContent = (
    <div className={`web-drawer-backdrop ${backdropClassName}`} onClick={handleBackdropClick}>
      <div
        ref={drawerRef}
        className={`web-drawer ${sideClass} ${sizeClass} ${disabledClass} ${className}`}
        style={drawerStyle}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <DrawerContext.Provider value={contextValue}>
          {children}
        </DrawerContext.Provider>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

