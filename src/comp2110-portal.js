import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/currency-converter.js'
import './components/music-widget.js'

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      overflow-y: scroll;
      scroll-behavior: smooth;
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: lightgoldenrodyellow;
    }

    main {
      display: flex;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    header {
      background-image: url(https://i.ibb.co/rvL6zQK/website-development.jpg);
      background-size: cover;
      padding: 10px;
      filter: drop-shadow(2px 2px 2px #A4BBFF);
    }

    login-widget {
      padding: 10px;
    }
    
    h1 {
      margin: auto;
      padding: 10px;
      font-size: 50px;
      color: black;
      background-color: rgba(240, 248, 255, 0.8);
      width: 450px;
      border-radius: 50px;
    }

    widget-column {
      margin: 5px;
      background-color: #6eff995f;
      border-radius: 20px;
      padding: 10px;
      border: 1px black solid;
    }

    .app-footer {
      margin: auto auto 5px auto;
      padding: auto;
      font-size: 20px;
      font-weight: bold;
      background-color: aliceblue;
      border: 2px solid black;
      border-radius: 10px;
      width: 700px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>
        <widget-column>
          <currency-convert-widget></currency-convert-widget>
          <widget-block header="Weather Forecast"></widget-block>
          <widget-block header="Public Holiday"></widget-block>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column>
          <ad-widget></ad-widget>
          <music-widget></music-widget>
          <widget-block header="Fifth Widget"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal);