import React from 'react';
import type { BreadcrumbsProps } from './breadcrumbs.types';
import { BreadcrumbItem } from './BreadcrumbItem';

interface BreadcrumbsComponent extends React.FC<BreadcrumbsProps> {
  Item: typeof BreadcrumbItem;
}

export const Breadcrumbs: BreadcrumbsComponent = ({
  separator = '/',
  size = 'md',
  maxItems,
  className = '',
  children,
  ...props
}) => {
  // Generate size classes
  const getSizeClasses = () => {
    const sizeMap = {
      sm: 'web-breadcrumbs-sm',
      md: 'web-breadcrumbs-md',
      lg: 'web-breadcrumbs-lg',
    };
    return sizeMap[size];
  };

  // Process children to handle maxItems logic
  const processChildren = () => {
    const childrenArray = React.Children.toArray(children);
    
    if (!maxItems || childrenArray.length <= maxItems) {
      return childrenArray;
    }
    
    // Show first item, ellipsis, and last items
    const firstItem = childrenArray[0];
    const lastItems = childrenArray.slice(-(maxItems - 2));
    const ellipsis = (
      <span key="ellipsis" className="web-breadcrumbs-ellipsis">
        …
      </span>
    );
    
    return [firstItem, ellipsis, ...lastItems];
  };

  const baseClasses = 'web-breadcrumbs';
  const sizeClasses = getSizeClasses();
  const classes = [baseClasses, sizeClasses, className].filter(Boolean).join(' ');

  const processedChildren = processChildren();

  return (
    <nav className={classes} aria-label="Breadcrumb" {...props}>
      {processedChildren.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < processedChildren.length - 1 && (
            <span className="web-breadcrumbs-separator" aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Attach Item as a static property for compound component pattern
Breadcrumbs.Item = BreadcrumbItem;
