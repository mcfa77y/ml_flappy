// import { Bird } from './bird';
// import { Pipe } from './pipe';
// import { Perceptron } from './nn';

let bird;
let pipes = [];
let perceptron;
const points = [];
let trainPointIndex = 0;
const nn = new NeuralNetwork(2, 16, 1);

// const training_data = [
//   { inputs: math.matrix([[0], [1]]), targets: math.matrix([[1]]) },
//   { inputs: math.matrix([[1], [0]]), targets: math.matrix([[1]]) },
//   { inputs: math.matrix([[1], [1]]), targets: math.matrix([[0]]) },
//   { inputs: math.matrix([[0], [0]]), targets: math.matrix([[0]]) },
// ];

const arrayToMatrix = array => math.matrix(array.map(x => [x]));

function setup() {
  createCanvas(600, 600);
  bird = new Bird();
  pipes.push(new Pipe());

  // const nn = new NeuralNetwork(2, 2, 1);
  // // const input = math.matrix([[1], [0]]);
  // // const target = math.matrix([[1], [0]]);

  // // const output = nn.feedForward(input);
  // for (let i = 0; i<50000; i++) {
  //   const data = random(training_data);
  //   nn.train(data.inputs, data.targets);
  // }
  // // console.table(nn.train(input, target)._data);
  // for (data of training_data) {
  //   console.table(nn.predict(data.inputs)._data);
  // }
}

function drawLine(min, max, ptron) {
  stroke(128);
  const p1 = new Point(min, ptron.guessY(min));
  const p2 = new Point(max, ptron.guessY(max));
  line(p1.px(), p1.py(), p2.px(), p2.py());
}

function draw() {
  background(21);
  bird.show();
  bird.update();
  bird.think(pipes);

  pipes.forEach((pipe) => {
    pipe.show();
    pipe.update();
    pipe.hits(bird);
  });

  pipes = pipes.filter(pipe => !pipe.isOffScreen());
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }


  // background(0);
  // for (let i = 0; i<1000; i++) {
  //   const data = random(training_data);
  //   nn.train(data.inputs, data.targets);
  // }
  // const res = 10;
  // const cols = width/ res;
  // const rows = height / res;

  // for (let i = 0; i< cols; i++) {
  //   for (let j = 0; j< rows; j++) {
  //     const x1 = i/cols;
  //     const x2 = j/rows;
  //     const inputs = math.matrix([[x1], [x2]]);
  //     const y = nn.predict(inputs)._data[0][0];
  //     fill(y*255);
  //     noStroke();
  //     rect(i*res, j* res, res, res);
  //   }
  // }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    const point = points[trainPointIndex];
    const inputList = [point.x, point.y, point.bias];
    const target = point.label;
    // perceptron.train(inputList, target);
    drawLine(-1, 1, perceptron);
    trainPointIndex = (trainPointIndex + 1) % points.length;
  }
}
