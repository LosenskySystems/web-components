import React, { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
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

    let cleanup: (() => void) | undefined;

    const initWebComponent = async () => {
      try {
        // Import the core package dynamically to avoid SSR issues
        await import('@losensky-systems/web-components-core');
        
        if (!elementRef.current) return;
        
        const webButton = document.createElement('web-button');
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
        }

        // Store ref for cleanup
        buttonRef.current = webButton;

        // Clear existing content and append the web component
        elementRef.current.innerHTML = '';
        elementRef.current.appendChild(webButton);

        // Return cleanup function
        cleanup = () => {
          if (buttonRef.current && handleClick) {
            buttonRef.current.removeEventListener('click', handleClick);
          }
          if (elementRef.current && webButton && elementRef.current.contains(webButton)) {
            elementRef.current.removeChild(webButton);
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
  }, [children, variant, onClick, disabled]);

  return (
    <div 
      ref={elementRef}
      className={className}
      {...props}
    />
  );
};