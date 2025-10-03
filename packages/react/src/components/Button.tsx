import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import '@losensky-systems/web-components-core';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'web-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        variant?: 'primary' | 'secondary';
        disabled?: boolean;
      };
    }
  }
}

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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onClick) return;

    const handleClick = (event: Event) => {
      onClick(event as unknown as React.MouseEvent<HTMLElement>);
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [onClick]);

  return (
    <web-button
      ref={ref}
      variant={variant}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </web-button>
  );
};
