import React from 'react';

export interface ContainerProps {
  // Size variants
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'fluid';
  
  // Padding options
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | 'xl'; // Horizontal only
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'; // Vertical only
  
  // Centering
  centered?: boolean;
  
  // Additional features
  as?: React.ElementType; // Polymorphic component (div, section, article, etc.)
  className?: string;
  children: React.ReactNode;
}
