import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MusicWidget extends LitElement {
    render() {
      return html`
        <style>
          :host {
            display: block;
            width: 90%;
            margin: auto;
            background-color: #f0f0f0;
            border-radius: 10px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            padding: 5px;
          }
          iframe {
            width: 250px;
            height: 250px;
          }

        </style>
        <h3>♫ Chill Music ♫</h3>
        <iframe width="200" height="200" src="https://www.youtube.com/embed/jfKfPfyJRdk" frameborder="0" allow="autoplay"></iframe>
      `;
    }
  }
  
  customElements.define('music-widget', MusicWidget);
  