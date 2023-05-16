import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/widget-column.js';
import './components/currency-converter.js';
import './components/music-widget.js';
import './components/calculator-web-component.js';
import './components/anonfiles.js';
import './components/persistent-textarea.js';
import './components/world-clock.js';
import './components/weather-forecast.js';
import './components/random-number-generator.js';
import './components/random-word-widget-datamuse.js';
import './components/matter-wrapper.js';
import './components/basketball-game.js';
import './components/dog-widget.js'
import './components/fish-tank.js'

class LongWid extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      overflow-y: scroll;
      scroll-behavior: smooth;
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
      width: 100%;
      background-image: url(https://i.ibb.co/rvL6zQK/website-development.jpg);
      background-size: cover;
      padding: 10px;
      filter: drop-shadow(2px 2px 2px #A4BBFF);
      margin-bottom: 10px;
    }
    
    h1 {
      margin: auto;
      padding: 10px;
      font-size: 40px;
      color: black;
      background-color: rgba(240, 248, 255, 0.8);
      width: 300px;
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
      width: 90%;
    }
    #fileUp {
      border: 1px solid black;
      padding: 10px;
      margin: auto;
    }

    main {
    flex-direction: column;
  }

  @media (min-width: 768px) {
    main {
      flex-direction: row;
    }
    widget-block {
      margin: auto;
    }
    world-clocks {
      margin-bottom: 10px;
    }
  }

  widget-column {
    margin: 5px;
    background-color: #6eff995f;
    border-radius: 20px;
    padding: 10px;
    border: 1px black solid;
    width: 100%;
  }

  @media (min-width: 768px) {
    widget-column {
      width: auto;
    }
  }

  
  `;

  constructor() {
    super();
    this.header = 'Long Widgets';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
      </header>

      <main>
        <widget-column>
          <currency-convert-widget></currency-convert-widget>
          <weather-forecast></weather-forecast>
          <widget-block header="Public Holiday"></widget-block>
          <random-number-generator></random-number-generator>
          <basket-ball></basket-ball>
        </widget-column>
        <calculator-web-component></calculator-web-component>
        <fish-tank-widget></fish-tank-widget>
        <widget-column>
          <music-widget></music-widget>
          <anon-files></anon-files>
          <persistent-textarea></persistent-textarea>
          <world-clocks></world-clocks>
          <random-word-widget-datamuse></random-word-widget-datamuse>
          <dog-widget></dog-widget>
        </widget-column>
      </main>

      <p class="app-footer">
        Long Trinh &copy; 2023
      </p>
    `;
  }
}

customElements.define('long-wid', LongWid);