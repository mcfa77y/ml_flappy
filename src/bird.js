// import { ellipse, fill, height } from 'p5';

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 25;
    this.size = 16;

    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -16;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.9;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

// export default Bird;
