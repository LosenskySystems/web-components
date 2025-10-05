import React from 'react';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
  type?: 'spinner' | 'text' | 'both';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'primary',
  type = 'spinner',
  text = 'Loading...',
  className,
  ...props
}) => {
  const baseClasses = 'web-loader';
  const sizeClasses = `web-loader-${size}`;
  const variantClasses = `web-loader-${variant}`;
  const typeClasses = `web-loader-${type}`;
  
  const allClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${typeClasses} ${className || ''}`.trim();

  return (
    <div 
      className={allClasses}
      role="status"
      aria-label={text}
      {...props}
    >
      {(type === 'spinner' || type === 'both') && (
        <div className="web-loader-spinner" />
      )}
      {(type === 'text' || type === 'both') && (
        <span className="web-loader-text">{text}</span>
      )}
      <span className="web-loader-sr-only">{text}</span>
    </div>
  );
};
