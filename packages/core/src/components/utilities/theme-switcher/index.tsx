import React, { useState, useEffect, useCallback } from 'react';
import type { ThemeSwitcherProps } from './theme-switcher.types';
import { Icon } from '../../elements';

export { type ThemeSwitcherProps } from './theme-switcher.types';

const THEME_KEY = 'theme-preference';
const STORAGE_THEME_LIGHT = 'light';
const STORAGE_THEME_DARK = 'dark';

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  size = 'md',
  showLabel = false,
  className = '',
  onChange,
  mode = 'live',
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // In preview mode, use a local state that doesn't affect the document
    if (mode === 'preview') {
      return 'light';
    }
    
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === STORAGE_THEME_DARK || savedTheme === STORAGE_THEME_LIGHT) {
      return savedTheme;
    }
    
    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  // Apply theme to document (only in live mode)
  useEffect(() => {
    if (mode === 'preview') return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Persist to localStorage
    localStorage.setItem(THEME_KEY, theme);
    
    // Call onChange callback
    onChange?.(theme);
  }, [theme, onChange, mode]);

  // Listen for system preference changes when no manual preference is set (only in live mode)
  useEffect(() => {
    if (mode === 'preview') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (!savedTheme || savedTheme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    if (mode === 'preview') {
      // In preview mode, just toggle local state for visual demonstration
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
      onChange?.(theme === 'light' ? 'dark' : 'light');
    } else {
      // In live mode, actually toggle the global theme
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
  }, [mode, onChange, theme]);

  // Generate CSS classes
  const baseClasses = 'web-theme-switcher';
  const sizeClass = `web-theme-switcher-${size}`;
  const classes = [
    baseClasses,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Current theme: ${theme}. Click to switch.`}
    >
      <div className="web-theme-switcher-icon">
        {theme === 'light' ? (
          <Icon name="sun" size={size} />
        ) : (
          <Icon name="moon" size={size} />
        )}
      </div>
      {showLabel && (
        <span className="web-theme-switcher-label">
          {theme === 'light' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

