import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './modal.types';

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  size = 'md',
  width,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  backdropClassName = '',
  disabled = false,
  className = '',
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const isAnimating = useRef(false);

  // Store the element that was focused before modal opened
  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  // ESC key handler
  useEffect(() => {
    if (!open || !closeOnEsc || disabled) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [open, closeOnEsc, disabled, onOpenChange]);

  // Focus trap
  useEffect(() => {
    if (!open || disabled) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element
    firstElement?.focus();

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      // Return focus to last focused element
      lastFocusedElement.current?.focus();
    };
  }, [open, disabled]);

  // Animation handling
  useEffect(() => {
    if (open) {
      isAnimating.current = true;
      const timer = setTimeout(() => {
        isAnimating.current = false;
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (!closeOnOverlayClick || disabled || isAnimating.current) return;
    
    // Only close if clicking the overlay itself, not modal content
    if (event.target === event.currentTarget) {
      onOpenChange(false);
    }
  }, [closeOnOverlayClick, disabled, onOpenChange]);

  // Handle modal content click (prevent closing)
  const handleModalClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  if (!open) return null;

  // Get size classes
  const getSizeClasses = () => {
    if (width) return '';
    
    switch (size) {
      case 'sm': return 'web-modal-sm';
      case 'lg': return 'web-modal-lg';
      case 'xl': return 'web-modal-xl';
      case 'full': return 'web-modal-full';
      default: return 'web-modal-md';
    }
  };

  const baseClasses = 'web-modal';
  const sizeClasses = getSizeClasses();
  const disabledClass = disabled ? 'web-modal-disabled' : '';
  
  const modalClasses = [
    baseClasses,
    sizeClasses,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const backdropClasses = [
    'web-modal-backdrop',
    backdropClassName
  ].filter(Boolean).join(' ');

  const modalStyle = width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined;

  return createPortal(
    <div className={backdropClasses} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={modalClasses}
        style={modalStyle}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
