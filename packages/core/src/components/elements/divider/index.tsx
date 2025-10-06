import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  children?: React.ReactNode; // For labeled dividers
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  color = 'default',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'web-divider';  
  const orientationClasses = `web-divider-${orientation}`;
  const variantClasses = `web-divider-${variant}`;
  const spacingClasses = `web-divider-spacing-${spacing}`;
  const colorClasses = color !== 'default' ? `web-divider-${color}` : '';
  const labeledClasses = children ? 'web-divider-with-children' : '';
  
  const allClasses = `${baseClasses} ${orientationClasses} ${variantClasses} ${spacingClasses} ${colorClasses} ${labeledClasses} ${className || ''}`.trim();

  if (children) {
    // Labeled divider (only for horizontal)
    return (
      <div className={allClasses} role="separator" {...props}>
        {children}
      </div>
    );
  }

  // Simple divider
  const Component = orientation === 'horizontal' ? 'hr' : 'div';
  
  return (
    <Component 
      className={allClasses} 
      role="separator"
      aria-orientation={orientation}
      {...props} 
    />
  );
};
