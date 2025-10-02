import React, { useRef, useEffect } from 'react';
// Dynamic import will be used in useEffect
// Import styles - commented out for now
// import '@losensky-systems/web-components-core/dist/index.css';

export interface InputProps {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder = '',
  type = 'text',
  disabled = false,
  value = '',
  onChange,
  onBlur,
  onFocus,
  className,
  name,
  required = false,
  autoComplete,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let cleanup: (() => void) | undefined;

    const initWebComponent = async () => {
      try {
        // Import the core package dynamically to avoid SSR issues
        await import('@losensky-systems/web-components-core');
        
        if (!elementRef.current) return;
        
        const webInput = document.createElement('web-input');
        webInput.setAttribute('type', type);
        webInput.setAttribute('placeholder', placeholder);
        webInput.setAttribute('value', value);
        
        if (name) webInput.setAttribute('name', name);
        if (required) webInput.setAttribute('required', '');
        if (disabled) {
          webInput.setAttribute('disabled', '');
        }
        if (autoComplete) webInput.setAttribute('autocomplete', autoComplete);
        
        // Declare handlers
        let handleChange: ((event: Event) => void) | undefined;
        let handleBlur: ((event: Event) => void) | undefined;
        let handleFocus: ((event: Event) => void) | undefined;
        
        // Add event listeners
        if (onChange) {
          handleChange = (event: Event) => {
            const reactEvent = {
              ...event,
              target: event.target as HTMLInputElement,
              currentTarget: event.currentTarget as HTMLInputElement,
            } as unknown;
            onChange(reactEvent as React.ChangeEvent<HTMLInputElement>);
          };
          webInput.addEventListener('input', handleChange);
        }
        
        if (onBlur) {
          handleBlur = (event: Event) => {
            const reactEvent = {
              ...event,
              target: event.target as HTMLInputElement,
              currentTarget: event.currentTarget as HTMLInputElement,
            } as unknown;
            onBlur(reactEvent as React.FocusEvent<HTMLInputElement>);
          };
          webInput.addEventListener('blur', handleBlur);
        }
        
        if (onFocus) {
          handleFocus = (event: Event) => {
            const reactEvent = {
              ...event,
              target: event.target as HTMLInputElement,
              currentTarget: event.currentTarget as HTMLInputElement,
            } as unknown;
            onFocus(reactEvent as React.FocusEvent<HTMLInputElement>);
          };
          webInput.addEventListener('focus', handleFocus);
        }

        // Clear existing content and append the web component
        elementRef.current.innerHTML = '';
        elementRef.current.appendChild(webInput);
        inputRef.current = webInput;

        // Return cleanup function
        cleanup = () => {
          if (inputRef.current) {
            if (handleChange) inputRef.current.removeEventListener('input', handleChange);
            if (handleBlur) inputRef.current.removeEventListener('blur', handleBlur);
            if (handleFocus) inputRef.current.removeEventListener('focus', handleFocus);
          }
          if (elementRef.current && webInput && elementRef.current.contains(webInput)) {
            elementRef.current.removeChild(webInput);
          }
        };
      } catch (error) {
        console.error('Failed to load web components:', error);
      }
    };

    initWebComponent();

    return () => {
      if (cleanup) cleanup();
    };
  }, [placeholder, type, disabled, value, onChange, onBlur, onFocus, name, required, autoComplete]);

  return (
    <div 
      ref={elementRef}
      className={className}
      {...props}
    />
  );
};