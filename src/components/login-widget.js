import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';
import './blog-post.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
  }

  static styles = css`
    :host {
        display: block;
        filter: drop-shadow(3px 3px 3px #A4BBFF);
    }
    form {
      padding: 15px;
      margin: auto;
      display: flex;
      width: 200px;
      flex-direction: column;
      background-color: rgba(240, 248, 255, 0.7);
      border: 1 solid black;
      border-radius: 10px;
      font-weight: bold;
    }
    #user {
      border: 1 solid black;
      margin: 10px auto;
      width: 150px;
      border-radius: 10px;
    }
    #pass {
      border: 1 solid black;
      margin: 10px auto;
      width: 150px;
      border-radius: 10px;
    }
    #loginButton {
      border: 2 solid black;
      border-radius: 10px;
      margin: auto;
      width: 100px;
    }
    #loginButton:hover {
      font-weight: bold;
      width: 110px;
      background-color: #ffffffc8;
    }
    p {
      padding: 5px;
      color: white;
      background-color: rgba(0, 0, 0, 0.8);
      width: 300px;
      margin: 10px auto;
      border-radius: 10px;
    }
    button {
      margin: 5px;
      width: 80px;
      border-radius: 10px;
      background-color: azure;
    }
    button:hover {
      width: 90px;
      font-weight: bold;
    }
    `;
    

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(result => result.json()).then(response => {
        this.user = response;
        storeUser(response);
    })
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
        return html`<p>Logged in as ${this.user.name} <button @click=${this.logout}>Logout</button></p>
        <blog-post token=${this.user.token} name=${this.user.name}><blog-post>`
    } 
    return html`
      <form @submit=${this.submitForm}>
          Username: <input name="username" id="user">
          Password: <input type="password" name="password" id="pass">
          <input type='submit' value='Login' id="loginButton">
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);