import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MusicWidget extends LitElement {
    render() {
      return html`
        <style>
          :host {
            background-color: azure;
            display: block;
            border: 1px solid black;
            margin: 10px 0;
            border-radius: 10px;
          }
          embed {
            border-radius: 80px;
          }

        </style>
        <h3>♫ Chill Music ♫</h3>
        <iframe width="250" height="250" src="https://www.youtube.com/embed/jfKfPfyJRdk" frameborder="0" allow="autoplay"></iframe>
      `;
    }
  }
  
  customElements.define('music-widget', MusicWidget);
  