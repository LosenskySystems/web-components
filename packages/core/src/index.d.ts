declare namespace JSX {
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