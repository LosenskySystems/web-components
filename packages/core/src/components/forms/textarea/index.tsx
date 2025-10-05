import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  disabled = false,
  resize = 'vertical',
  className,
  ...props
}) => {
  const baseClasses = 'web-textarea';
  const disabledClasses = disabled ? 'web-textarea-disabled' : '';
  const resizeClasses = `web-textarea-resize-${resize}`;
  
  const allClasses = `${baseClasses} ${disabledClasses} ${resizeClasses} ${className || ''}`.trim();

  return (
    <textarea
      className={allClasses}
      disabled={disabled}
      {...props}
    />
  );
};
