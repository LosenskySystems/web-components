import React, { createContext, useContext } from 'react';
import type { ListProps, ListItemProps } from './list.types';

export { type ListProps, type ListItemProps } from './list.types';

// List Context for sharing props between compound components
interface ListContextType {
  orientation?: ListProps['orientation'];
  spacing?: ListProps['spacing'];
}

const ListContext = createContext<ListContextType | undefined>(undefined);

const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('List.Item must be used within a List');
  }
  return context;
};

// Main List component
export const List: React.FC<ListProps> & {
  Item: typeof ListItem;
} = ({
  children,
  className = '',
  orientation = 'vertical',
  spacing = 'md',
  dividers = false,
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-list';
  const orientationClass = `web-list-${orientation}`;
  const spacingClass = `web-list-spacing-${spacing}`;
  const dividersClass = dividers ? 'web-list-dividers' : '';
  
  const classes = [
    baseClasses,
    orientationClass,
    spacingClass,
    dividersClass,
    className
  ].filter(Boolean).join(' ');

  const contextValue: ListContextType = {
    orientation,
    spacing,
  };

  return (
    <ListContext.Provider value={contextValue}>
      <ul className={classes} {...props}>
        {children}
      </ul>
    </ListContext.Provider>
  );
};

// List Item component
const ListItem: React.FC<ListItemProps> = ({
  children,
  className = '',
  avatar,
  icon,
  title,
  description,
  actions,
  onClick,
  disabled = false,
  interactive = false,
  ...props
}) => {
  useListContext();
  
  // Generate CSS classes
  const baseClasses = 'web-list-item';
  const interactiveClass = (interactive || onClick) && !disabled ? 'web-list-item-interactive' : '';
  const disabledClass = disabled ? 'web-list-item-disabled' : '';
  
  const itemClasses = [
    baseClasses,
    interactiveClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const hasMedia = avatar || icon;
  const hasTitleOrDescription = title || description;
  const hasActions = actions;
  const hasChildren = children;

  // Determine if we should render the standard structure
  const renderStandardStructure = hasMedia || hasTitleOrDescription || hasActions;

  const itemContent = renderStandardStructure ? (
    <>
      {hasMedia && (
        <div className="web-list-item-media">
          {avatar && <div className="web-list-item-avatar">{avatar}</div>}
          {icon && !avatar && <div className="web-list-item-icon">{icon}</div>}
        </div>
      )}
      
      {(hasTitleOrDescription || hasChildren) && (
        <div className="web-list-item-content">
          {title && <div className="web-list-item-title">{title}</div>}
          {description && <div className="web-list-item-description">{description}</div>}
          {hasChildren && <div className="web-list-item-text">{children}</div>}
        </div>
      )}
      
      {hasActions && (
        <div className="web-list-item-actions">
          {actions}
        </div>
      )}
    </>
  ) : (
    children
  );

  return (
    <li
      className={itemClasses}
      onClick={disabled ? undefined : onClick}
      role={(interactive || onClick) && !disabled ? 'button' : undefined}
      tabIndex={(interactive || onClick) && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      onKeyDown={(interactive || onClick) && !disabled ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as any);
        }
      } : undefined}
      {...props}
    >
      {itemContent}
    </li>
  );
};

// Attach compound component to List
List.Item = ListItem;

