// button.js
import './index.css';

class WebButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'variant' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';

    this.shadowRoot.innerHTML = `
      <style>
        @import "./index.css";
      </style>
      <button class="web-btn web-btn-${variant}">
        <slot></slot>
      </button>
    `;

    const btn = this.shadowRoot.querySelector('button');

    // Forward clicks to <web-button>
    btn.addEventListener('click', (e) => {
      this.dispatchEvent(
        new Event('click', { bubbles: true, composed: true })
      );
    });
  }
}

customElements.define('web-button', WebButton);

export { WebButton };
