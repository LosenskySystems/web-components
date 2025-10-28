export interface ThemeSwitcherProps {
  /** Size variant of the theme switcher */
  size?: 'sm' | 'md' | 'lg';
  /** Show a label next to the switcher */
  showLabel?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when theme changes */
  onChange?: (theme: 'light' | 'dark') => void;
  /** Display mode: 'preview' shows a button that doesn't actually toggle, 'live' toggles global theme */
  mode?: 'preview' | 'live';
}

