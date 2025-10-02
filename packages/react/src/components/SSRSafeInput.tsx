import React from 'react';
import { ClientOnly } from './ClientOnly';
import { Input as InternalInput } from './Input';
import type { InputProps } from './Input';

export const Input: React.FC<InputProps> = (props) => {
  return (
    <ClientOnly fallback={
      <input 
        className="web-input"
        type={props.type || 'text'}
        placeholder={props.placeholder}
        disabled={props.disabled}
        style={{
          backgroundColor: props.disabled ? '#f9fafb' : '#fff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          display: 'block',
          fontFamily: 'inherit',
          fontSize: '14px',
          outline: 'none',
          padding: '0.75rem 1rem',
          width: '100%',
          color: props.disabled ? '#6b7280' : 'inherit',
          cursor: props.disabled ? 'not-allowed' : 'text'
        }}
      />
    }>
      <InternalInput {...props} />
    </ClientOnly>
  );
};
