import React, { createContext, useContext } from 'react';
import type { 
  CardProps, 
  CardHeaderProps, 
  CardBodyProps, 
  CardFooterProps, 
  CardActionsProps 
} from './card.types';

export { type CardProps, type CardHeaderProps, type CardBodyProps, type CardFooterProps, type CardActionsProps } from './card.types';

// Card Context for sharing props between compound components
interface CardContextType {
  variant?: CardProps['variant'];
  size?: CardProps['size'];
  padding?: CardProps['padding'];
  rounded?: CardProps['rounded'];
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card compound components must be used within a Card');
  }
  return context;
};

// Main Card component
export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Actions: typeof CardActions;
} = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  padding = 'md',
  rounded = 'md',
  hover = false,
  clickable = false,
  onClick,
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-card';
  const variantClass = `web-card-${variant}`;
  const sizeClass = `web-card-${size}`;
  const paddingClass = `web-card-padding-${padding}`;
  const roundedClass = `web-card-rounded-${rounded}`;
  const hoverClass = hover ? 'web-card-hover' : '';
  const clickableClass = clickable ? 'web-card-clickable' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    paddingClass,
    roundedClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  const contextValue: CardContextType = {
    variant,
    size,
    padding,
    rounded,
  };

  return (
    <CardContext.Provider value={contextValue}>
      <div 
        className={classes}
        onClick={onClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={clickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
          }
        } : undefined}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

// Card Header component
const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  title,
  subtitle,
  avatar,
  action,
  ...props
}) => {
  const { padding } = useCardContext();
  
  const baseClasses = 'web-card-header';
  const paddingClass = `web-card-header-padding-${padding}`;
  
  const classes = [
    baseClasses,
    paddingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="web-card-header-content">
        {avatar && (
          <div className="web-card-header-avatar">
            {avatar}
          </div>
        )}
        <div className="web-card-header-text">
          {title && (
            <h3 className="web-card-header-title">{title}</h3>
          )}
          {subtitle && (
            <p className="web-card-header-subtitle">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
      {action && (
        <div className="web-card-header-action">
          {action}
        </div>
      )}
    </div>
  );
};

// Card Body component
const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  ...props
}) => {
  const { padding } = useCardContext();
  
  const baseClasses = 'web-card-body';
  const paddingClass = `web-card-body-padding-${padding}`;
  
  const classes = [
    baseClasses,
    paddingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Footer component
const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  const { padding } = useCardContext();
  
  const baseClasses = 'web-card-footer';
  const paddingClass = `web-card-footer-padding-${padding}`;
  
  const classes = [
    baseClasses,
    paddingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Actions component
const CardActions: React.FC<CardActionsProps> = ({
  children,
  className = '',
  align = 'right',
  spacing = 'md',
  ...props
}) => {
  const { padding } = useCardContext();
  
  const baseClasses = 'web-card-actions';
  const paddingClass = `web-card-actions-padding-${padding}`;
  const alignClass = `web-card-actions-align-${align}`;
  const spacingClass = `web-card-actions-spacing-${spacing}`;
  
  const classes = [
    baseClasses,
    paddingClass,
    alignClass,
    spacingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Attach compound components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Actions = CardActions;
