class WorldClock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            margin: auto;
            margin-top: 10px; 
            display: block;
            background-color: #f0f0f0;
            border-radius: 10px;
            padding: 15px;
            max-width: 300px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          }
          p {
            margin: 0;
            font-size: 1.1em;
            padding: 4px 0;
            background-color: azure;
            margin-top: 5px;
            border: 1px solid
            border-radius: 10px;
          }
          h3 {
            margin: 0;
            font-size: 1.3em;
            margin-bottom: 10px;
            text-align: center;
            color: #333;
          }
        </style>
        <h3>World Clock</h3>
        <p id="new-york-time">New York: </p>
        <p id="paris-time">Paris: </p>
        <p id="hcmc-time">Ho Chi Minh City: </p>
      `;
      this.updateTimes();
      setInterval(() => this.updateTimes(), 1000);
    }
  
    updateTimes() {
      const newYorkTime = this.getTimeForCity(-4);
      const parisTime = this.getTimeForCity(2);
      const hcmcTime = this.getTimeForCity(7);
  
      this.shadowRoot.getElementById('new-york-time').textContent = `New York: ${newYorkTime}`;
      this.shadowRoot.getElementById('paris-time').textContent = `Paris: ${parisTime}`;
      this.shadowRoot.getElementById('hcmc-time').textContent = `Ho Chi Minh City: ${hcmcTime}`;
    }
  
    getTimeForCity(offset) {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityTime = new Date(utc + 3600000 * offset);
      return cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  
  customElements.define('world-clocks', WorldClock);
  