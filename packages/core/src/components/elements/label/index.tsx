import React from 'react';

export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  required = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'web-label';
  const requiredClasses = required ? 'web-label-required' : '';
  const disabledClasses = disabled ? 'web-label-disabled' : '';
  const allClasses = `${baseClasses} ${requiredClasses} ${disabledClasses} ${className || ''}`.trim();

  return (
    <label
      htmlFor={htmlFor}
      className={allClasses}
      {...props}
    >
      {children}
      {required && <span className="web-label-asterisk" aria-label="required">*</span>}
    </label>
  );
};
