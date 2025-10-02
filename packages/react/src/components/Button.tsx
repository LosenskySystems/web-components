import React, { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
// Import core package
import { LSButton as WebButtonClass } from '@losensky-systems/web-components-core';
// Import styles - commented out for now
// import '@losensky-systems/web-components-core/dist/index.css';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className,
  disabled = false,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Create the web component
    const webButton = new WebButtonClass();
    webButton.setAttribute('variant', variant);
    webButton.textContent = children as string;
    
    if (disabled) {
      webButton.setAttribute('disabled', '');
      webButton.style.pointerEvents = 'none';
    }
    
    let handleClick: ((event: Event) => void) | undefined;
    
    if (onClick) {
      handleClick = (event: Event) => {
        // Create a synthetic React event-like object
        const reactEvent = {
          ...event,
          target: event.target as HTMLButtonElement,
          currentTarget: event.currentTarget as HTMLButtonElement,
          stopPropagation: () => event.stopPropagation(),
          preventDefault: () => event.preventDefault(),
        } as unknown;
        onClick(reactEvent as React.MouseEvent<HTMLElement>);
      };
      webButton.addEventListener('click', handleClick);
      
      // Store ref for cleanup
      buttonRef.current = webButton;
    }

    // Clear existing content and append the web component
    elementRef.current.innerHTML = '';
    elementRef.current.appendChild(webButton);

    return () => {
      // Cleanup
      if (buttonRef.current && handleClick) {
        buttonRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [children, variant, onClick, disabled]);

  return (
    <div 
      ref={elementRef}
      className={className}
      {...props}
    />
  );
};