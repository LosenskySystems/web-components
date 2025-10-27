import React from 'react';

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  dividers?: boolean;
}

export interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  disabled?: boolean;
  interactive?: boolean;
}

