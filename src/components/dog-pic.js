import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DogPic extends LitElement {
  static get properties() {
    return {
      url: { state: true },
    };
  }

  static styles = css`
  :host {
  display: block;
  width: 100%;
  max-height: 1000px;
  margin: 5px;
  overflow: hidden;
}

.image-container {
  max-height: 90%;
  overflow: hidden;
}

img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  margin: auto;
}

@media (min-width: 768px) {
  :host {
    width: 560px;
  }

  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    margin: auto;
  }
}

button {
  background-color: azure;
  border-radius: 10px;
  padding: 5px;
}

button:hover {
  font-weight: bold;
}

  `;

  firstUpdated() {
    this.getPic();
  }

  getPic() {
    fetch("https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
        .then(response => response.json())
        .then(shibes => {
            console.log('callback', shibes);
            this.url = shibes[0];
        });
}


  changePic() {
    this.getPic();
  }

  render() {
    if(!this.url) {
      return html`<h2>Loading...</h2>`
    } else {
      return html`
        <h3>Cute dogs picture</h3>
        <h4>Click the picture to change picture</h4>
        <div class="image-container">
        <img src="${this.url}" @click=${this.changePic}></img>
      </div>
      `;
    }
  }
}

customElements.define('dog-pic', DogPic);
