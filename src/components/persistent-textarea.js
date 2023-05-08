import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PersistentTextarea extends LitElement {
  static get properties() {
    return {
      content: { type: String },
    };
  }

  static get styles() {
    return css`
      .container {
        background-color: azure;
        border-radius: 5px;
        padding: 5px;
      }
      textarea {
        margin: auto;
        width: 250px;
        height: 200px;
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.content = "";
  }

  connectedCallback() {
    super.connectedCallback();
    const savedContent = localStorage.getItem("persistent-textarea");
    if (savedContent) {
      this.content = savedContent;
    }
  }

  handleInput(event) {
    const newValue = event.target.value;
    this.content = newValue;
    localStorage.setItem("persistent-textarea", newValue);
  }

  render() {
    return html`
      <div class="container">
        <h3>Notes</h3>
        <textarea @input=${this.handleInput}>${this.content}</textarea>
      </div>
    `;
  }
}

customElements.define("persistent-textarea", PersistentTextarea);
