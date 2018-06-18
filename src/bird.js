// import { ellipse, fill, height } from 'p5';

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 25;
    this.size = 16;

    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -12;
    if (brain) {
      this.brain = brain.copy();
    } 
    else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.score = 0;
    this.fitness = 0;

    this.arrayToMatrix = array => math.matrix(array.map(x => [x]));
  }

  show() {
    stroke(255);
    fill(255, 10);
    ellipse(this.x, this.y, this.size, this.size);
  }

  up() {
    this.velocity += this.lift;
  }

  think(pipes) {
    const birdx = this.x;
    const closestPipe = pipes.filter(pipe => pipe.x + pipe.w- birdx > 0 )
      .reduce((acc, current) => {
        const cx = current.x - birdx;
        const ax = acc.x - birdx;

        if (cx < ax) {
          return current;
        }
        return acc;
      });

    const input = [];
    input.push(this.y / height);
    input.push(this.velocity/10);
    input.push(closestPipe.top / height);
    input.push(closestPipe.bottom / height);
    input.push(closestPipe.x / width);
    const output = this.brain.predict(this.arrayToMatrix(input))._data;
    if (output[0] > output[1]) {
      this.up();
    }
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.9;
    this.score++;
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
