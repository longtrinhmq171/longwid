class DogWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .dog {
          position: fixed;
          bottom: -20px;
          width: 60px;
          height: 60px;
          background-size: contain;
          background-repeat: no-repeat;
          transition: transform 1s linear;
        }

        .dog-moving {
          background-image: url("../med/dog-running.webp");
        }
      
        .dog-idle {
          background-image: url("../med/dog-idle.gif");
          width: 35px;
          height: 35px;
          bottom: -2px;
        }
      </style>
      <div class="dog"></div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const dog = this.shadowRoot.querySelector(".dog");
    let isMoving = false;
    let isFirstIdle = true; // Track if it's the first idle mode
  
    const moveDog = () => {
      if (isMoving) return; // Don't move if the dog is already in motion
      if (document.hidden) return; // Don't move if the page is hidden
  
      isMoving = true;
  
      const clientWidth = document.documentElement.clientWidth;
      const dogWidth = dog.offsetWidth;
  
      const targetX = Math.random() * (clientWidth - dogWidth);
      const currentX = dog.getBoundingClientRect().left;
      const dx = targetX - currentX;
  
      dog.style.transform = dx < 0 ? "scaleX(1)" : "scaleX(-1)";
      dog.classList.add("dog-moving"); // Add the class for moving state
      dog.classList.remove("dog-idle"); // Remove the class for idle state
  
      const distance = Math.abs(dx);
      const speed = 40; // Adjust the speed as desired (lower value = slower)
      const duration = distance / speed;
  
      dog.style.transition = `left ${duration}s linear`;
      dog.style.left = `${targetX}px`;
  
      setTimeout(() => {
        dog.style.transition = ""; // Reset transition after reaching the target position
        dog.classList.remove("dog-moving"); // Remove the class for moving state
        dog.classList.add("dog-idle"); // Add the class for idle state
        isMoving = false; // Allow the dog to move again
  
        if (isFirstIdle) {
          isFirstIdle = false;
          dog.style.opacity = 1; // Make the dog visible after the first idle mode
        }
      }, duration * 1000);
    };
  
    setTimeout(() => {
      moveDog(); // Execute the moveDog function after a short delay
      setInterval(moveDog, 5000); // Adjust the interval as desired
    }, 10000); // Add a delay of 10 seconds (10000 milliseconds) before starting the movement
  
    // Set the initial state to idle and make the dog invisible
    dog.classList.add("dog-idle");
    dog.style.opacity = 0;
  }
  

  disconnectedCallback() {
    // Clean up code here if needed
  }
}

customElements.define("dog-widget", DogWidget);
