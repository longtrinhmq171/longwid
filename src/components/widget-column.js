import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetColumn extends LitElement {
  static styles = css`
    :host {
      margin: auto;
    }
    :host {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  :host {
    flex-direction: row;
    align-items: flex-start;
  }
}

.widget-column {
  flex: 1;
  margin: 10px;
}

@media (max-width: 767px) {
  .widget-column {
    width: 90%;
    max-width: 90%;
  }
}`;

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn);