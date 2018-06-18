// import { ellipse, fill, height } from 'p5';

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 25;
    this.size = 16;

    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -16;

    this.brain = new NeuralNetwork(4, 4, 1);

    this.arrayToMatrix = array => math.matrix(array.map(x => [x]));
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  up() {
    this.velocity += this.lift;
  }

  think(pipes) {
    const birdx = 5;
    const closestPipe = pipes.filter(pipe => pipe.x - birdx > 0)
      .reduce((acc, current) => {
        const cx = current.x;
        const ax = acc.x;

        if (cx - birdx < ax - birdx) {
          return current;
        }
        return acc;
      });

    const input = [];
    input.push(this.y);
    input.push(closestPipe.top / height);
    input.push(closestPipe.bottom / height);
    input.push(closestPipe.x / width);
    const output = this.brain.predict(this.arrayToMatrix(input));
    if (output._data[0] > 0.5) {
      this.up();
    }
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
