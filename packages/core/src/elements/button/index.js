// Import CSS - will work after build
import './index.css';

class LSButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'primary';
    const content = this.textContent || this.innerHTML;
    
    this.innerHTML = `
      <button class="ls-btn ls-btn-${variant}">
        ${content}
      </button>
    `;
  }
}

customElements.define('ls-button', LSButton);
console.log('🚀 LSButton component registered');

export { LSButton };