// Import CSS - will work after build
import './index.css';

class LSButton extends HTMLElement {
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

customElements.define('web-button', LSButton);
console.log('🚀 LSButton component registered');

export { LSButton };