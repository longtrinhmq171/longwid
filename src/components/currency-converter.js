import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyConvertWidget extends LitElement {
  static get properties() {
    return {
      fromCurrency: { type: String },
      toCurrency: { type: String },
      amount: { type: Number },
      rates: { type: Object },
      convertedAmount: { type: Number },
    };
  }
  static styles = css`
  :host {
    display: block;
    background-color: #f5f5f5;
    background-image: url(https://www.gifcen.com/wp-content/uploads/2021/05/money-gif-1.gif);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 250px;
    margin: auto;
  }
`;

  constructor() {
    super();
    this.rates = {};
    this.fromCurrency = 'USD';
    this.toCurrency = 'EUR';
    this.amount = 1;
    this.convertedAmount = 0;
    this.getCurrencyConvert();
  }

  getCurrencyConvert() {
    const requestURL = 'https://api.exchangerate.host/latest';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = () => {
      this.rates = request.response.rates;
      this.convertAmount();
    };
  }

  convertAmount() {
    const rate = this.rates[this.toCurrency] / this.rates[this.fromCurrency];
    this.convertedAmount = this.amount * rate;
  }

  handleFromCurrencyChange(event) {
    this.fromCurrency = event.target.value;
    this.convertAmount();
  }

  handleToCurrencyChange(event) {
    this.toCurrency = event.target.value;
    this.convertAmount();
  }

  handleAmountChange(event) {
    this.amount = Number(event.target.value);
    this.convertAmount();
  }

  render() {
    return html`
      <h2>Currency Convert</h2>
      <div>
        <label for="from-currency">From:</label>
        <select id="from-currency" @change=${this.handleFromCurrencyChange}>
          ${Object.keys(this.rates).map(
            currency => html`
              <option value=${currency} ?selected=${currency === this.fromCurrency}>${currency}</option>
            `
          )}
        </select>
        <label for="to-currency">To:</label>
        <select id="to-currency" @change=${this.handleToCurrencyChange}>
          ${Object.keys(this.rates).map(
            currency => html`
              <option value=${currency} ?selected=${currency === this.toCurrency}>${currency}</option>
            `
          )}
        </select>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input id="amount" type="number" .value=${this.amount} @input=${this.handleAmountChange}>
      </div>
      <div>
        <p>${this.amount} ${this.fromCurrency} = ${this.convertedAmount.toFixed(2)} ${this.toCurrency}</p>
      </div>
    `;
  }
}

customElements.define('currency-convert-widget', CurrencyConvertWidget);