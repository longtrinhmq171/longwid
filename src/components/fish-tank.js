import './crypto-widget.js'
class FishTankWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      const template = document.createElement("template");
      template.innerHTML = `
        <style>
        .fish-tank {
          margin: auto;
          position: relative;
          width: 90%;
          height: 300px; /* Increase the height by 10px */
          border: 5px solid black;
          border-top: none;
          margin-top: 10px;
          overflow: visible;
          background-image: url("../med/background.gif");
          background-size: cover;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        :host {
          width: 100%;
          display: block;
          margin-top: 30px; /* Adjust the margin-top value to position the entire widget */
        }
        @media (min-width: 768px) {
          :host {
            width: 560px;
          }
        }
        
        .corgi {
          background-image: url("../med/corgi.gif");
          background-size: 50%;
          background-repeat: no-repeat;
          width: 120px;
          height: 120px;
          margin-top: -40px; /* Adjust the margin-top value to position the corgi */
        }
        
          .fish {
            position: absolute;
            width: 50px;
            height: 50px;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .fish-1 {
            background-image: url("../med/6.gif");
          }
          .fish-2 {
            background-image: url("../med/2.gif");
          }
          .fish-3 {
            background-image: url("../med/3.gif");
            width: 120px;
            height: 120px;
          }
          .fish-4 {
            background-image: url("../med/4.gif");
            width: 70px;
            height: 70px;
          }
          .fish-5 {
            background-image: url("../med/5.gif");
            width: 170px;
            height: 170px;
          }
          .fish-6 {
            background-image: url("../med/6.gif");
            width: 20px;
            height: 20px;
          }
          .fish-7 {
            background-image: url("../med/6.gif");
            width: 40px;
            height: 40px;
          }
          .fish-8 {
            background-image: url("../med/4.gif");
            width: 100px;
            height: 100px;
          }
          .fish-9 {
            background-image: url("../med/9.gif");
            width: 30px;
            height: 30px;
          }
          .fish-10 {
            background-image: url("../med/10.gif");
            width: 60px;
            height: 60px;
          }
          .fish-11 {
            background-image: url("../med/11.gif");
            width: 40px;
            height: 40px;
          }
          .fish.flip-horizontal {
            transform: scaleX(-1);
          }
          .seaweed {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
            background-repeat: no-repeat;
            background-image: url(../med/sw.gif);
          }
          .crab {
            background-image: url("../med/crab.gif");
            background-size: 50%;
            background-repeat: no-repeat;
            width: 100px;
            height: 50px;
            bottom: -26px;
            left: 20px;
            position: absolute;
          }

          .hermit {
            background-image: url("../med/hermit.webp");
            background-size: 30%;
            background-repeat: no-repeat;
            width: 100px;
            height: 50px;
            bottom: -20px;
            left: 300px;
            position: absolute;
          }
             
          crypto-widget {
            margin: 10px;
          }
          
        </style>
        <div class="fish-tank">
        <div class="corgi"></div>
          <div class="seaweed"></div>
          <div class="fish fish-1"></div>
          <div class="fish fish-2"></div>
          <div class="fish fish-3"></div>
          <div class="fish fish-4"></div>
          <div class="fish fish-5"></div>
          <div class="fish fish-6"></div>
          <div class="fish fish-7"></div>
          <div class="fish fish-8"></div>
          <div class="fish fish-9"></div>
          <div class="fish fish-10"></div>
          <div class="fish fish-11"></div>
          <div class="crab"></div>
          <div class="hermit"></div>
        </div>
        <crypto-widget></crypto-widget>
      `;
  
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
      const fishes = this.shadowRoot.querySelectorAll(".fish");
      const fishTank = this.shadowRoot.querySelector(".fish-tank");
    
      fishes.forEach((fish) => {
        let targetX = Math.random() * (fishTank.offsetWidth - fish.offsetWidth);
        let targetY = Math.random() * (fishTank.offsetHeight - fish.offsetHeight);
    
        const initialX = targetX; // Use targetX as initialX
        const initialY = targetY; // Use targetY as initialY
        const maxDist = 50; // Maximum distance from initial position
    
        let idleCounter = 0; // Counter for idle time
        const idleTime = 100; // Number of intervals before fish starts moving again
        let isIdle = false; // Flag for idle mode
    
        const moveFish = () => {
          if (isIdle) {
            idleCounter++;
            if (idleCounter >= idleTime) {
              // Reset targets and exit idle mode
              targetX = Math.random() * (fishTank.offsetWidth - fish.offsetWidth);
              targetY = Math.random() * (fishTank.offsetHeight - fish.offsetHeight);
              isIdle = false;
              idleCounter = 0;
            }
            return; // Don't move fish during idle mode
          }
    
          const dx = targetX - fish.offsetLeft;
          const dy = targetY - fish.offsetTop;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const initialDist = Math.sqrt((targetX - initialX) ** 2 + (targetY - initialY) ** 2);
    
          // Update CSS class based on direction of movement
          if (dx < 0) {
            fish.classList.remove("flip-horizontal");
          } else {
            fish.classList.add("flip-horizontal");
          }
    
          if (dist > 1) {
            const interpX = fish.offsetLeft + (dx / dist);
            const interpY = fish.offsetTop + (dy / dist);
            fish.style.left = `${interpX}px`;
            fish.style.top = `${interpY}px`;
          } else {
            targetX = Math.random() * (fishTank.offsetWidth - fish.offsetWidth);
            targetY = Math.random() * (fishTank.offsetHeight - fish.offsetHeight);
            isIdle = true; // Enter idle mode
          }
    
          if (initialDist < maxDist && dist > initialDist) {
            targetX = initialX;
            targetY = initialY;
          }
    
          // Reduce idleCounter by 1 after each iteration of moveFish()
          idleCounter = Math.max(0, idleCounter - 1);
        };
    
        setInterval(moveFish, 50);
      });
    }
    
    
                
    disconnectedCallback() {
        clearInterval(this.intervalId);
    }
}
                
customElements.define("fish-tank-widget", FishTankWidget);  