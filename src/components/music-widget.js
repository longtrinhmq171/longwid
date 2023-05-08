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
        <h4>Source: <a href="http://de-hz-fal-stream07.rautemusik.fm/study">rautemusik.fm</a></h4>
        <embed width="200" height="50" src="http://de-hz-fal-stream07.rautemusik.fm/study"></embed>
      `;
    }
  }
  
  customElements.define('music-widget', MusicWidget);
  