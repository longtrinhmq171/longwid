import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './matter-wrapper.js';

let ballPickupTime = null;
class BasketballGame extends LitElement {
    static styles = css`
      :host {
        margin: auto;
        display: block;
        width: 250px;
        height: 400px;
        position: relative;
        background-color: #eee;
        overflow: hidden;
        user-select: none;
        touch-action: none;
      }
  
      canvas {
        position: absolute;
        top: 0;
        left: 0;
      }
  
      .score {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 18px;
        font-weight: bold;
      }
    `;

  render() {
    return html`
      <canvas></canvas>
      <div class="score">${this.score} points</div>
    `;
  }

  static get properties() {
    return {
      score: { type: Number },
    };
  }

  constructor() {
    super();
    this.score = 0;
  }

  firstUpdated() {
    const canvas = this.shadowRoot.querySelector('canvas');
    createGame(canvas, this.updateScore.bind(this)); // Pass updateScore function
  }

  updateScore(newScore) {
    this.score = newScore;
    this.requestUpdate();
  }
}

customElements.define('basket-ball', BasketballGame);

function createGame(canvas, updateScore) {
  const canvasWidth = 250;
  const canvasHeight = 400;

  const engine = Matter.Engine.create();
  const world = engine.world;
  const render = createRenderer(canvas, engine, canvasWidth, canvasHeight);
  createBoundaries(world, canvasWidth, canvasHeight);
  const hoop = createHoop(world, canvasWidth, canvasHeight);
  const basketball = createBasketball(world, canvas, engine, updateScore);
  let score = 0;
    function checkIfScored() {
      const hoopBounds = hoop.bounds;
      const ballPosition = basketball.position;
      const ballVelocity = basketball.velocity;
      if (
        ballPosition.x >= hoopBounds.min.x &&
        ballPosition.x <= hoopBounds.max.x &&
        ballPosition.y >= hoopBounds.min.y &&
        ballPosition.y <= hoopBounds.max.y &&
        ballVelocity.y > 0
      ) {
        return true;
      }
      return false;
    }
  
      
      let scored = false;
      
      // Call checkIfScored every update tick
      Matter.Events.on(engine, 'afterUpdate', () => {
        if (checkIfScored()) {
          if (!scored) {
            scored = true;
            score++;
            console.log("Score:", score);
            updateScore(score); // Call updateScore with the new score
          }
        } else {
          scored = false;
        }
      });
      
      // run the engine
      Matter.Engine.run(engine);
      Matter.Render.run(render);
  }  

function createRenderer(canvas, engine, width, height) {
  const render = Matter.Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false,
      background: 'transparent',
    },
  });
  return render;
}

function createBoundaries(world, width, height) {
    const thickness = 20;
    const ground = Matter.Bodies.rectangle(width / 2, height - thickness / 2, width, thickness, { isStatic: true, restitution: 0.8 });
    const leftWall = Matter.Bodies.rectangle(thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 0.8 });
    const rightWall = Matter.Bodies.rectangle(width - thickness / 2, height / 2, thickness, height, { isStatic: true, restitution: 0.8 });
    const ceiling = Matter.Bodies.rectangle(width / 2, thickness / 2, width, thickness, { isStatic: true, restitution: 0.8 });
  
    Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);
  }
  

  function createHoop(world, width, height) {
    const hoopWidth = 40;
    const hoopHeight = 10;
    const hoopX = width - hoopWidth - 50;
    const hoopY = 150;
  
    const hoopBottom = Matter.Bodies.rectangle(hoopX + hoopWidth / 2, hoopY + hoopHeight / 2, hoopWidth, hoopHeight, {
      isStatic: true,
      render: {
        fillStyle: 'brown',
      },
      collisionFilter: {
        category: 0x0002,
      },
    });
  
    const hoopEdge1 = Matter.Bodies.rectangle(hoopX, hoopY + hoopHeight / 2, hoopHeight, hoopHeight, {
      isStatic: true,
      render: {
        fillStyle: 'brown',
      },
      collisionFilter: {
        category: 0x0002,
      },
    });
  
    const hoopEdge2 = Matter.Bodies.rectangle(hoopX + hoopWidth, hoopY + hoopHeight / 2, hoopHeight, hoopHeight, {
      isStatic: true,
      render: {
        fillStyle: 'brown',
      },
      collisionFilter: {
        category: 0x0002,
      },
    });
  
    Matter.World.add(world, [hoopBottom, hoopEdge1, hoopEdge2]);
    return hoopBottom;
  }  
  
  function createBasketball(world, canvas, engine, updateScore) {
    const basketballRadius = 15;
    const startPos = { x: 100, y: 100 };
  
    const basketball = Matter.Bodies.circle(startPos.x, startPos.y, basketballRadius, {
      restitution: 0.7,
      frictionAir: 0.01,
      render: {
        fillStyle: 'orange',
      },
      collisionFilter: {
        mask: 0x0001 | 0x0004, // Updated mask to include hoop's category
      },
    });
  
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
  
    applyForceLimit(mouseConstraint.constraint);
  
    Matter.World.add(world, basketball);
    Matter.World.add(world, mouseConstraint);
  
    // Add mouse events to interact with the basketball
    // Set the ballPickupTime when the basketball is picked up
canvas.addEventListener('mousedown', (e) => {
  Matter.MouseConstraint.update(mouseConstraint, e);
  ballPickupTime = Date.now();
});

  
    canvas.addEventListener('mousemove', (e) => {
      Matter.MouseConstraint.update(mouseConstraint, e);
    });
  
    canvas.addEventListener('mouseup', (e) => {
      Matter.MouseConstraint.update(mouseConstraint, e);
    });
  
    // For touch screens
    canvas.addEventListener('touchstart', (e) => {
      Matter.MouseConstraint.update(mouseConstraint, e.changedTouches[0]);
      e.preventDefault();
      ballPickupTime = Date.now();
    });
  
    canvas.addEventListener('touchmove', (e) => {
      Matter.MouseConstraint.update(mouseConstraint, e.changedTouches[0]);
      e.preventDefault();
    });
  
    canvas.addEventListener('touchend', (e) => {
      Matter.MouseConstraint.update(mouseConstraint, e.changedTouches[0]);
      e.preventDefault();
    });
  
    // Function to reset basketball position
    function resetBasketball() {
      Matter.Body.setPosition(basketball, startPos);
      Matter.Body.setVelocity(basketball, { x: 0, y: 0 });
    }
  
    // Check if basketball is out of bounds
    function checkOutOfBounds() {
      const pos = basketball.position;
      if (pos.x < 0 || pos.x > canvas.width || pos.y < 0 || pos.y > canvas.height) {
        // Check if ball has been held for more than 2 seconds
        if (ballPickupTime !== null && Date.now() - ballPickupTime > 500) {
          resetBasketball();
          ballPickupTime = null;
        }
      }
    }    
  
    // Call checkOutOfBounds every update tick
    Matter.Events.on(engine, 'afterUpdate', () => {
      checkOutOfBounds();
    });
  
    return basketball;
  }
  
  function applyForceLimit(constraint) {
    const maxForce = 0.02; // Maximum force that can be applied
    Matter.Events.on(constraint, 'mousemove', (event) => {
      const mousePosition = event.mouse.position;
      const body = constraint.body;
      const force = {
        x: Math.min((mousePosition.x - body.position.x) * 0.001, maxForce),
        y: Math.min((mousePosition.y - body.position.y) * 0.001, maxForce),
      };
      Matter.Body.applyForce(body, body.position, force);
    });
  }
  
  