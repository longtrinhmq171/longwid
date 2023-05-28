class RandomWordWidgetDatamuse extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.API_URL = 'https://api.datamuse.com/words?ml=example&max=1000';
  
      this.updateWord = this.updateWord.bind(this);
  
      this.render();
    }
  
    async getRandomWord() {
      const response = await fetch(this.API_URL);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex].word;
    }
  
    async getDefinition(word) {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
      const data = await response.json();
      if (data[0]?.meanings[0]?.definitions[0]?.definition) {
        return data[0].meanings[0].definitions[0].definition;
      } else {
        return 'Definition not found.';
      }
    }
  
    async updateWord() {
      const word = await this.getRandomWord();
      const definition = await this.getDefinition(word);
      this.shadowRoot.querySelector('#word').textContent = word;
      this.shadowRoot.querySelector('#definition').textContent = definition;
    }
  
    async render() {
      const word = await this.getRandomWord();
      const definition = await this.getDefinition(word);
      this.shadowRoot.innerHTML = `
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px;
            max-width: 250px;
            margin: 5px auto;
            background-color: #f0f0f0;
            border-radius: 10px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          }
  
          #word {
            font-size: 24px;
            text-align: center;
            margin-bottom: 5px;
            font-weight: bold;
            background-color: #fff;
            border-radius: 5px;
            padding: 10px;
          }
  
          #definition {
            font-size: 16px;
            text-align: center;
            margin-bottom: 5px;
            background-color: #fff;
            border-radius: 5px;
            padding: 10px;
            max-width: 100%;
          }
  
          button {
            background-color: #4caf50;
            border: none;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            padding: 5px 10px;
            cursor: pointer;
          }

          h3 {
            margin: 0px auto;
          }
  
          button:hover {
            background-color: #45a049;
          }
        </style>
        <div class="container">
          <h3>Random word</h3>
          <p id="word">${word}</p>
          <p id="definition">${definition}</p>
          <button>Change Word</button>
        </div>
      `;
      this.shadowRoot.querySelector('button').addEventListener('click', this.updateWord);
    }
  }
  
  customElements.define('random-word-widget-datamuse', RandomWordWidgetDatamuse);
  