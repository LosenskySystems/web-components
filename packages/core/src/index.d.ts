import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'web-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        variant?: 'primary' | 'secondary';
        disabled?: boolean;
      };
    }
  }
}