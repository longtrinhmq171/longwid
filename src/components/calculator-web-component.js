class CalculatorWebComponent extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow root
      this.attachShadow({ mode: 'open' });
  
      // Create the template
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
            *{
                margin: 0px;
                padding: 0;
                font-family: 'Poppins', sans-serif;
                box-sizing: border-box;
            }
            
            .container{
                width: 450px;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .calculator{
                background: #3a4452;
                padding: 20px;
                border-radius: 10px;
            }
            .calculator form input{
                border: 0;
                outline: 0;
                width: 60px;
                height: 60px;
                border-radius: 10px;
                box-shadow: -8px -8px 15px rgba(255, 255, 255, 0.1),5px 5px 15px rgba(0, 0, 0, 0.2);
                background: transparent;
                font-size: 20px;
                color: #fff;
                cursor: pointer;
                margin: 10px;
            }
            
            form .display{
                display: flex;
                justify-content: flex-end;
                margin: 20px 0;
            }
            form .display input{
                text-align: right;
                flex: 1;
                font-size: 45px;
                box-shadow: none;
            }
            form input.equal{
                width: 145px;
            }
            
            form input.operator{
                color: #33ffd8;
            }
        </style>
        
        <div class="container">
            <div class="calculator">
            <h3 style = "color: white">Calculator</h3>
            <form>
                <div class="display">
                <input type="text" name="display">
                </div>
                <div>
                <input type="button" value="AC" class="operator">
                <input type="button" value="DE" class="operator">
                <input type="button" value="." class="operator">
                <input type="button" value="/" class="operator">
                </div>
                <div>
                <input type="button" value="7">
                <input type="button" value="8">
                <input type="button" value="9">
                <input type="button" value="*" class="operator">
                </div>
                <div>
                <input type="button" value="4">
                <input type="button" value="5">
                <input type="button" value="6">
                <input type="button" value="-" class="operator">
                </div>
                <div>
                <input type="button" value="1">
                <input type="button" value="2">
                <input type="button" value="3">
                <input type="button" value="+" class="operator">
                </div>
                <div>
                <input type="button" value="00">
                <input type="button" value="0">
                <input type="button" value="=" class="equal operator">
                </div>
            </form>
            </div>
        </div>
      `;
  
      // Attach the template to the shadow root
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  
      // Bind event listeners
      this.shadowRoot.querySelectorAll('input[type="button"]').forEach((button) => {
        button.addEventListener('click', this.handleButtonClick.bind(this));
      });
    }
  
    handleButtonClick(event) {
        const display = this.shadowRoot.querySelector('input[name="display"]');
        const buttonValue = event.target.value;
      
        switch (buttonValue) {
          case '=':
            display.value = eval(display.value);
            break;
          case 'AC':
            display.value = '';
            break;
          case 'DE':
            display.value = display.value.slice(0, -1);
            break;
          case '.':
            display.value += '.';
            break;
          case '/':
            display.value += '/';
            break;
          case '*':
            display.value += '*';
            break;
          case '-':
            display.value += '-';
            break;
          case '+':
            display.value += '+';
            break;
          case '00':
            display.value += '00';
            break;
          case '0':
            display.value += '0';
            break;
          case '1':
            display.value += '1';
            break;
          case '2':
            display.value += '2';
            break;
          case '3':
            display.value += '3';
            break;
          case '4':
            display.value += '4';
            break;
          case '5':
            display.value += '5';
            break;
          case '6':
            display.value += '6';
            break;
          case '7':
            display.value += '7';
            break;
          case '8':
            display.value += '8';
            break;
          case '9':
            display.value += '9';
            break;
        }
      }
      
  }
  
  customElements.define('calculator-web-component', CalculatorWebComponent);
  