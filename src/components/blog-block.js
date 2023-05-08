/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true }
  }

  static styles = css`
  :host {
    margin: 1em;
    width: 70%;
  }
  .blogpost {
    margin: 5px;
    padding: 10px;
    text-align: left;
    border: 2px solid black;
    border-radius: 10px;
  }
  .blogpost h2 {
    text-align: left;
    margin: auto;
    text-transform: capitalize;
  }

  .blogpost h2 span {
    background-color: #6eff995f;
    border-radius: 10px;
    padding: 5px;
  }

  .blogpost p {
    background-color: #ffffffc8;
    padding: 5px;
    border-radius: 10px;
    filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.5));
  }

  group-name {
    font-size: 25px;
    background-color: #ffffffc8;
    border-radius: 10px;
    padding: 5px;
  }
  `;

  constructor() {
    super();

    const url = `${BASE_URL}blog`;
    fetch(url)
        .then(response => response.json())
        .then(posts => {
            this._posts = posts.posts; 
        });
  }

  // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    if(text == null) {
      return " "
    }
    const paragraphs = text.split('\r\n')
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  }
  
  render() {
    if (!this._posts)
      return html`Loading...`
    
    return html`
      ${this._posts.map(post => html`<div class="blogpost">
        <h2><span>${post.title}</span></h2>
        <h3>By <group-name>${post.name}</group-name></h3>
        ${BlockBlock.formatBody(post.content)}
      </div>`)}
      `;
  }
}

customElements.define('blog-block', BlockBlock);


