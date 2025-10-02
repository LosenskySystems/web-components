// Import CSS - will work after build
import './index.css';

class Button extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'primary';
    const content = this.textContent || this.innerHTML;
    
    this.innerHTML = `
      <button class="web-btn web-btn-${variant}">
        ${content}
      </button>
    `;
  }
}

customElements.define('web-button', Button);

export { Button };