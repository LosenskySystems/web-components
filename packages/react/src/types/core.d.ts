declare module '@losensky-systems/web-components-core' {
  export class Button extends HTMLElement {
    connectedCallback(): void;
  }
  
  export class Input extends HTMLElement {
    connectedCallback(): void;
  }
  
  export const colors: any;
  export const spacing: any;
  export const typography: any;
  export const borderRadius: any;
  
  export const debounce: any;
  export const throttle: any;
  export const formatClassNames: any;
  export const generateUniqueId: any;
  
  export const core: {
    button: typeof Button;
    input: typeof Input;
    constants: {
      colors: any;
      spacing: any;
      typography: any;
      borderRadius: any;
    };
    utils: {
      debounce: any;
      throttle: any;
      formatClassNames: any;
      generateUniqueId: any;
    };
  };
}

declare module '@losensky-systems/web-components-core/css' {
  const content: any;
  export default content;
}
