import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MusicWidget extends LitElement {
    render() {
      return html`
        <style>
          :host {
            background-color: azure;
            display: block;
            border: 1px solid black;
            width: 90%;
            margin: auto;
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
  