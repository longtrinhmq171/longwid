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
            height: 300px;
            border: 5px solid black;
            border-top: none;
            margin-top: 10px;
            overflow: hidden;
            //background-color: #3db8ff;
            background-image: url(https://i.redd.it/7vs0e5boklny.gif);
            background-size: cover;
          }
          .fish {
            position: absolute;
            width: 50px;
            height: 50px;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .fish-1 {
            background-image: url("https://bestanimations.com/media/fish/308173182clownfishanimation-28.gif");
          }
          .fish-2 {
            background-image: url("https://i.gifer.com/origin/48/48b104295655cf0908ea58ba723232ac_w200.gif");
          }
          .fish-3 {
            background-image: url("https://thumbs.gfycat.com/HonorableHighlevelAnt-size_restricted.gif");
            width: 120px;
            height: 120px;
          }
          .fish-4 {
            background-image: url("https://pa1.narvii.com/6419/c2c784cb345428ef49f4daad6ae60088d4dac42c_hq.gif");
            width: 70px;
            height: 70px;
          }
          .fish-5 {
            background-image: url("https://i.redd.it/6aw132fqmsw71.gif");
            width: 170px;
            height: 170px;
          }
          .fish-6 {
            background-image: url("https://bestanimations.com/media/fish/308173182clownfishanimation-28.gif");
            width: 20px;
            height: 20px;
          }
          .fish-7 {
            background-image: url("https://bestanimations.com/media/fish/308173182clownfishanimation-28.gif");
            width: 40px;
            height: 40px;
          }
          .fish-8 {
            background-image: url("https://pa1.narvii.com/6419/c2c784cb345428ef49f4daad6ae60088d4dac42c_hq.gif");
            width: 100px;
            height: 100px;
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
            background-repeat: cover;
            background-image: url("https://img1.picmix.com/output/stamp/normal/3/2/3/5/775323_2a4de.gif");
          }
          .crab {
            background-image: url("https://i.gifer.com/4NOV.gif");
            background-size: 50%;
            background-repeat: no-repeat;
            width: 100px;
            height: 50px;
            bottom: -30px;
            left: 20px;
            position: absolute;
          }
          
        </style>
        <div class="fish-tank">
            <div class="seaweed"></div>
          <div class="fish fish-1"></div>
          <div class="fish fish-2"></div>
          <div class="fish fish-3"></div>
          <div class="fish fish-4"></div>
          <div class="fish fish-5"></div>
          <div class="fish fish-6"></div>
          <div class="fish fish-7"></div>
          <div class="fish fish-8"></div>
          <div class="crab"></div>
        </div>
      `;
  
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
        const fishes = this.shadowRoot.querySelectorAll(".fish");
        const fishTank = this.shadowRoot.querySelector(".fish-tank");
      
        fishes.forEach((fish) => {
          let targetX = Math.random() * (fishTank.offsetWidth - fish.offsetWidth);
          let targetY = Math.random() * (fishTank.offsetHeight - fish.offsetHeight);
      
          // Randomly adjust targetX and targetY to spawn fish in different locations
          targetX += Math.random() * 50 - 25;
          targetY += Math.random() * 50 - 25;
      
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
                    // Randomly adjust targetX and targetY to spawn fish in different locations
                    targetX += Math.random() * 50 - 25;
                    targetY += Math.random() * 50 - 25;
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
                // Randomly adjust targetX and targetY to spawn fish in different locations
                targetX += Math.random() * 50 - 25;
                targetY += Math.random() * 50 - 25;
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