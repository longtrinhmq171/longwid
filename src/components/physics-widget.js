import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './matter-wrapper.js';

class PhysicsWidget extends LitElement {
    static styles = css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 400px;
        border: 1px solid black;
        overflow: hidden;
      }
    `;
  
    constructor() {
      super();
      this._engine = null;
      this._world = null;
      this._render = null;
    }
  
    firstUpdated() {
      this.initPhysics();
    }
  
    initPhysics() {
        const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;
      
        this._engine = Engine.create();
        this._world = this._engine.world;
      
        this._render = Render.create({
          element: this.shadowRoot,
          engine: this._engine,
          options: {
            width: this.clientWidth,
            height: this.clientHeight,
            wireframes: false,
            background: '#fafafa',
          },
        });
      
        // Add the canvas to the shadow DOM
        this.shadowRoot.appendChild(this._render.canvas);
      
        const ground = Bodies.rectangle(this.clientWidth / 2, this.clientHeight - 10, this.clientWidth, 20, {
          isStatic: true,
        });
      
        const leftWall = Bodies.rectangle(0, this.clientHeight / 2, 20, this.clientHeight, {
          isStatic: true,
        });
      
        const rightWall = Bodies.rectangle(this.clientWidth, this.clientHeight / 2, 20, this.clientHeight, {
          isStatic: true,
        });
      
        const topWall = Bodies.rectangle(this.clientWidth / 2, 0, this.clientWidth, 20, {
          isStatic: true,
        });
      
        World.add(this._world, [ground, leftWall, rightWall, topWall]);
      
        // Add random shapes
        for (let i = 0; i < 30; i++) {
          const randomShape = Math.random() > 0.5 ? 'circle' : 'rectangle';
          const posX = Math.random() * this.clientWidth;
          const posY = Math.random() * this.clientHeight;
          const size = Math.random() * 40 + 10;
      
          let body;
          if (randomShape === 'circle') {
            body = Bodies.circle(posX, posY, size / 2);
          } else {
            body = Bodies.rectangle(posX, posY, size, size);
          }
          World.add(this._world, body);
        }
      
        const mouse = Mouse.create(this._render.canvas);
        const mouseConstraint = MouseConstraint.create(this._engine, { mouse });
      
        World.add(this._world, mouseConstraint);
        this._render.mouse = mouse;
      
        Runner.run(this._engine);
        Render.run(this._render);
      }
      
  
    disconnectedCallback() {
      super.disconnectedCallback();
      Matter.Render.stop(this._render);
      Matter.Runner.stop(this._engine);
    }
  
    render() {
      return html``;
    }
  }

customElements.define('physics-widget', PhysicsWidget);
