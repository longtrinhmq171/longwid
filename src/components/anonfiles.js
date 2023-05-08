import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class AnonFiles extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 5px;
      }
      .container {
        background-color: azure;
        border-radius: 5px;
        padding: 10px;
      }
      h3 {
        margin-top: 0;
      }
      input {
        display: block;
        margin: auto;
      }
      p {
        margin-bottom: 0;
      }
    `;
  }

  static get properties() {
    return {
      fileUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.fileUrl = 'N/A';
  }

  render() {
    return html`
      <div class="container">
        <h3>Upload File To Get Link (FILE.IO)</h3>
        <input type="file" id="fileInput" @change=${this.handleFileChange}>
        <p>File URL: <a href="${this.fileUrl}">${this.fileUrl}</a></p>
      </div>
    `;
  }

  handleFileChange(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://file.io/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.fileUrl = result.link;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

customElements.define('anon-files', AnonFiles);
