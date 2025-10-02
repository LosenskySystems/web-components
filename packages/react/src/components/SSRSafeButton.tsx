import React from 'react';
import { ClientOnly } from './ClientOnly';
import { Button as InternalButton } from './Button';
import type { ButtonProps } from './Button';

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ClientOnly fallback={
      <button 
        className="web-btn web-btn-primary" 
        disabled={props.disabled}
        style={{ 
          border: 'none',
          borderRadius: '6px',
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          display: 'inline-block',
          fontSize: '14px',
          fontWeight: '600',
          padding: '0.5rem 1rem',
          background: props.variant === 'secondary' ? '#e5e7eb' : '#2563eb',
          color: props.variant === 'secondary' ? '#111827' : '#fff'
        }}
      >
        {props.children}
      </button>
    }>
      <InternalButton {...props} />
    </ClientOnly>
  );
};
