import React, { useState } from 'react';
import type { AvatarProps } from './avatar.types';

export { type AvatarProps } from './avatar.types';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  color = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  // Generate CSS classes
  const baseClasses = 'web-avatar';
  const sizeClass = `web-avatar-${size}`;
  const shapeClass = `web-avatar-${shape}`;
  const colorClass = `web-avatar-${color}`;
  
  const classes = [
    baseClasses,
    sizeClass,
    shapeClass,
    colorClass,
    className
  ].filter(Boolean).join(' ');

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Generate fallback text from alt or fallback prop
  const getFallbackText = () => {
    if (fallback) return fallback;
    if (alt) {
      // Extract initials from alt text
      return alt
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return '?';
  };

  // Determine what to render
  const shouldShowImage = src && !imageError;
  const fallbackText = getFallbackText();

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={alt || 'Avatar'}
      {...props}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="web-avatar img"
        />
      ) : (
        <span className="web-avatar-fallback">
          {fallbackText}
        </span>
      )}
    </div>
  );
};
