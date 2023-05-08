import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class blogPost extends LitElement {
    static properties = {
        token : {type : String},
        name : {type : String},
        _title : {type : String},
        _content : {type : String},
        _postSuccess: {type: Boolean}
    }

    static styles = css`
        :host {
            display: grid;
            grid: column;
            margin: 10px auto;
            padding: 5px;
            color: white;
            background-color: rgba(0, 0, 0, 0.8);
            width: 530px;
            border-radius: 20px;
        }
        #title {
            width: 200px;
            border-radius: 10px;
        }
        #content {
            width: 500px;
            height: 75px;
            border-radius: 10px;
        }
        #postButton {
            width: 80px;
            border-radius: 10px;
            background-color: azure;
        }
        #postButton:hover {
            width: 90px;
            font-weight: bold;
        }
        textarea {
            padding: 3px;
        }
    `;

createBlogPost(event) {
    event.preventDefault();
    this._title = event.target.title.value;
    this._content = event.target.content.value;
    this._postSuccess = false;
    const url = "https://comp2110-portal-server.fly.dev/blog";
    const data = { "title": this._title, "content": this._content };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${this.token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(result => {
        console.log("Blog post created:", result);
        this._postSuccess = true;
        this.requestUpdate();
        setTimeout(() => location.reload(), 2000);
    })
    .catch(error => {
        console.error("Error creating blog post:", error.message);
    });
}

  
  render() {
    return html`
    <form @submit=${this.createBlogPost}>
        <h3>Post blog as ${this.name}</h3>
        <p>Title: <input name="title" id="title"></p>
        <p>Content: <textarea name="content" id="content"></textarea></p>
        <p><input type='submit' value='Post' id="postButton"></p>
        ${this._postSuccess ? html`<p>Post successful!</p>` : ''}
    </form>
  `;
  }
  
}

customElements.define('blog-post', blogPost);