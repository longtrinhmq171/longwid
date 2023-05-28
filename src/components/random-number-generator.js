import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class RandomNumberGenerator extends LitElement {
  static get properties() {
    return {
      min: { type: Number },
      max: { type: Number },
      randomNumber: { state: true },
    };
  }

  static styles = css`
    :host {
      display: block;
      width: 80%;
      padding: 20px;
      margin: 20px auto;
      background-color: #f0f0f0;
      border-radius: 10px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      text-align: center;
    }

    button {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 10px 2px;
      cursor: pointer;
      border-radius: 4px;
    }

    h3 {
      margin: 0;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    input {
      margin: 5px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 90%;
      box-sizing: border-box;
    }
  `;

  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.randomNumber = null;
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }

  updateMin(e) {
    this.min = parseInt(e.target.value);
  }

  updateMax(e) {
    this.max = parseInt(e.target.value);
  }

  render() {
    return html`
      <h3>Random Number Generator</h3>
      <form>
        <label for="min">Min:</label>
        <input type="number" id="min" name="min" .value="${this.min}" @input=${this.updateMin} />
        <label for="max">Max:</label>
        <input type="number" id="max" name="max" .value="${this.max}" @input=${this.updateMax} />
      </form>
      <p>Generated Number: ${this.randomNumber === null ? 'N/A' : this.randomNumber}</p>
      <button @click=${this.generateRandomNumber}>Generate</button>
    `;
  }
}

customElements.define('random-number-generator', RandomNumberGenerator);
