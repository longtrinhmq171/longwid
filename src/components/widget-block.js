import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './weather-forecast.js'
import './public-holiday-widget.js'

class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
  :host {
    display: block;
    width: 100%;
    height: auto;
    background-color: azure;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    :host {
      width: 250px;
      height: 250px;
      margin-bottom: 0;
    }
  }
`;


  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    if(this.header == 'Public Holiday'){
      return html`
        <next-public-holiday></next-public-holiday>
      `;
    }
  }
}

customElements.define('widget-block', WidgetBlock);