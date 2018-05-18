// import { random, width, rect, fill, height } from 'p5';

class Pipe {
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 20;
    this.velocity = 2;
    this.isHiglighted = true;
  }

  show() {
    fill(255);
    if (this.isHiglighted) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.velocity;
  }

  isOffScreen() { return this.x < -this.w; }

  hits(bird) {
    this.isHiglighted = (bird.y < this.top ||
      bird.y > height - this.bottom) &&
      (bird.x > this.x &&
       bird.x < this.x + this.w);
    return this.isHiglighted;
  }
}

// export default Pipe;
