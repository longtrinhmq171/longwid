import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CryptoWidget extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 5px;
        font-family: Arial, sans-serif;
        margin: auto;
        background-color: #f0f0f0;
        border: 1px solid black;
        border-radius: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }
      h3 {
        margin-top: 0;
        font-size: 25px;
        margin: auto;
        padding: 5px;
      }
      .loading {
        color: gray;
        font-style: italic;
      }
      .crypto-container {
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 5px;
        size: 100px;
      }
      .crypto-item {
        margin: auto;
        background-color: azure;
        border-radius: 5px;
        padding: 5px;
        width: 90%;
      }
      .crypto-item h4 {
        margin-top: 0;
        font-size: 16px;
      }
      .crypto-item p {
        margin: 5px 0;
      }
      select {
        margin: auto;
        width: 150px;
        border-radius: 5px;
      }
      option {
        margin: auto;
      }
      .converter {
        background-color: azure;
        margin: auto;
        padding: 5px;
      }
      input {
        width: 100px;
        height: 20px;
        margin: auto 5px;
        border-radius: 5px;
      }
      .converter p {
        margin: auto;
      }
    `;
  }

  static get properties() {
    return {
      cryptoData: { type: Array },
      isLoading: { type: Boolean },
      selectedCrypto: { type: Object },
      cryptoAmount: { type: Number },
    };
  }

  constructor() {
    super();
    this.cryptoData = [];
    this.isLoading = false;
    this.selectedCrypto = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchCryptoData().then(() => {
      this.setSelectedCryptoDefault();
    });
  }
  
  setSelectedCryptoDefault() {
    if (this.cryptoData.length > 0) {
      this.selectedCrypto = this.cryptoData.find((crypto) => crypto.name === 'Bitcoin');
    }
  }

  render() {
    return html`
      <h3>Cryptocurrency Data</h3>
      ${this.isLoading
        ? html`<p class="loading">Loading...</p>`
        : html`
            <div class="crypto-container">
              <select @change=${this.handleSelectionChange}>
                ${this.cryptoData.map(
                  (crypto) => html`
                    <option value="${crypto.name}" ?selected=${this.selectedCrypto && this.selectedCrypto.name === crypto.name}>${crypto.name}</option>
                  `
                )}
              </select>
              ${this.selectedCrypto
                ? html`
                    <div class="crypto-item">
                      <h4>${this.selectedCrypto.name}</h4>
                      <p>Symbol: ${this.selectedCrypto.symbol}</p>
                      <p>Price: $${parseFloat(this.selectedCrypto.priceUsd).toFixed(2)}</p>
                      <p>Market Cap: $${parseFloat(this.selectedCrypto.marketCapUsd).toFixed(2)}</p>
                    </div>
                    <div class="converter">
                      <h4>Crypto Converter: </h4>
                      <input type="number" id="cryptoAmount" @input=${this.handleAmountInput} .value=${this.cryptoAmount || ''}> ${this.selectedCrypto.symbol}
                      <p> = ${this.calculateUsdEquivalent()} USD</p>
                    </div>
                  `
                : html``}
            </div>
          `}
    `;
  }
  
  handleAmountInput(e) {
    const amount = parseFloat(e.target.value);
    this.cryptoAmount = isNaN(amount) ? null : amount;
    this.requestUpdate();
  }
  
  calculateUsdEquivalent() {
    if (this.selectedCrypto && this.cryptoAmount) {
      const price = parseFloat(this.selectedCrypto.priceUsd);
      const usdEquivalent = price * this.cryptoAmount;
      return isNaN(usdEquivalent) ? '' : usdEquivalent.toFixed(2);
    }
    return '';
  }  

  async fetchCryptoData() {
    this.isLoading = true;

    const apiKey = '3c4a47a8-521a-40ab-998b-f9340f169e5d';
    const apiUrl = 'https://api.coincap.io/v2/assets';

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      this.cryptoData = data.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  handleSelectionChange(e) {
    const selectedCryptoName = e.target.value;
    this.selectedCrypto = this.cryptoData.find((crypto) => crypto.name === selectedCryptoName);
  }  
}

customElements.define('crypto-widget', CryptoWidget);
