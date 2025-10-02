// Import CSS - will work after build
import './index.css';

class LSInput extends HTMLElement {
  connectedCallback() {
    const placeholder = this.getAttribute('placeholder') || '';
    const type = this.getAttribute('type') || 'text';
    const disabled = this.hasAttribute('disabled');
    const disabledClass = disabled ? 'web-input-disabled' : '';
    
    const content = this.textContent || this.innerHTML;
    
    this.innerHTML = `
      <input 
        class="web-input ${disabledClass}"
        type="${type}"
        placeholder="${placeholder}"
        ${disabled ? 'disabled' : ''}
        value="${content}"
      />
    `;
  }
}

customElements.define('web-input', LSInput);
console.log('🚀 LSInput component registered');

export { LSInput };
