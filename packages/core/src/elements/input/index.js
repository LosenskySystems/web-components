// Import CSS - will work after build
import './index.css';

class LSInput extends HTMLElement {
  connectedCallback() {
    const placeholder = this.getAttribute('placeholder') || '';
    const type = this.getAttribute('type') || 'text';
    const disabled = this.hasAttribute('disabled');
    const disabledClass = disabled ? 'ls-input-disabled' : '';
    
    const content = this.textContent || this.innerHTML;
    
    this.innerHTML = `
      <input 
        class="ls-input ${disabledClass}"
        type="${type}"
        placeholder="${placeholder}"
        ${disabled ? 'disabled' : ''}
        value="${content}"
      />
    `;
  }
}

customElements.define('ls-input', LSInput);
console.log('🚀 LSInput component registered');

export { LSInput };
