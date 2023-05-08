import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MemePic extends LitElement {
    static get properties() {
        return {
            url: { state: true }
        };
    }

    firstUpdated() {
        this.getMeme();
    }

    getMeme() {
        fetch("https://meme-api.com/gimme")
            .then(response => response.json())
            .then(meme => {
                console.log('callback', meme);
                this.url = meme.url;
            });
    }

    render() {
        return html`
            <style>
                :host {
                    width: 460px;
                    height: 460px;
                    margin: 5px;
                }
            </style>
            <h3>Random meme from reddit</h3>
            <img src="${this.url}" width = 460px height = 460px></img>
        `;
    }
}

customElements.define('meme-pic', MemePic);
