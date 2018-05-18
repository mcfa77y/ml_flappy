// import { Bird } from './bird';
// import { Pipe } from './pipe';
// import { Perceptron } from './nn';

let bird;
const pipes = [];
let perceptron;
const points = [];
let trainPointIndex = 0;

const training_data = [
  {
    inputs: [0,0],
    targets: [0]
  },
  {
    inputs: [1,0],
    targets: [1]
  },
  {
    inputs: [0,1],
    targets: [1]
  },
  {
    inputs: [1,1],
    targets: [0]
  }
]
function setup() {
  createCanvas(600, 600);
  bird = new Bird();
  pipes.push(new Pipe());

  perceptron = new Perceptron();


  for (let i = 0; i < 100; i++) {
    points.push(new Point());
  }


  const nn = new NeuralNetwork(2, 2, 1);
  const input = math.matrix([[1], [0]]);
  const target = math.matrix([[1], [0]]);

  //for (let i = 0; i < 1000; i ++){
    const data = random(training_data);
    nn.train(data.inputs, data.targets);
  //}

  for (data in training_data){
    console.log(nn.feedForward(data.inputs));
  }
}

function drawLine(min, max, ptron) {
  stroke(128);
  const p1 = new Point(min, ptron.guessY(min));
  const p2 = new Point(max, ptron.guessY(max));
  line(p1.px(), p1.py(), p2.px(), p2.py());
}

function draw() {

  
  background(21);
  // bird.show();
  // bird.update();
  // drawLine(-1, 1, x => 0.3 * x + 0.2);
  // drawLine(-1, 1, perceptron.guessYFn);
  // pipes.forEach((pipe) => {
  //   pipe.show();
  //   pipe.update();
  //   pipe.hits(bird);
  // });

  // pipes = pipes.filter(pipe => !pipe.isOffScreen());
  // if (frameCount % 100 == 0) {
  //   pipes.push(new Pipe());
  // }

  
  // perceptron
  
  // drawLine(-1, 1, perceptron);
  // points.forEach((point) => {
  //   point.show();

  //   const inputList = point.getInputs();
  //   const target = point.label;
  //   perceptron.train(inputList, target);
  //   const guess = perceptron.guess(inputList);
  //   if (guess === target) {
  //     // green
  //     fill(0, 255, 0);
  //   } else {
  //     // red
  //     fill(255, 0, 0);
  //   }
  //   noStroke();
  //   ellipse(point.px(), point.py(), 8, 8);
  // });

  
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
