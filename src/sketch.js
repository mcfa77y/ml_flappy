// import { Bird } from './bird';
// import { Pipe } from './pipe';
// import { Perceptron } from './nn';
// import { GA } from './ga';

const TOTAL = 100;
const PIPE_SPACING = 175;

let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
const points = [];
let trainPointIndex = 0;
const ga = new GA();
let generation_count = 0;
let slider;
// const nn = new NeuralNetwork(2, 16, 1);

// const training_data = [
//   { inputs: math.matrix([[0], [1]]), targets: math.matrix([[1]]) },
//   { inputs: math.matrix([[1], [0]]), targets: math.matrix([[1]]) },
//   { inputs: math.matrix([[1], [1]]), targets: math.matrix([[0]]) },
//   { inputs: math.matrix([[0], [0]]), targets: math.matrix([[0]]) },
// ];

const arrayToMatrix = array => math.matrix(array.map(x => [x]));

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i<TOTAL; i++) {
    birds.push(new Bird());
  }
  slider = createSlider(1, 100, 1);
}

function drawLine(min, max, ptron) {
  stroke(128);
  const p1 = new Point(min, ptron.guessY(min));
  const p2 = new Point(max, ptron.guessY(max));
  line(p1.px(), p1.py(), p2.px(), p2.py());
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 100 == 0 ) {
      pipes.push(new Pipe());
      counter = 1;
    }
    counter++;

    birds.forEach((bird) => {
      bird.update();
      if (pipes.length  > 0){
        bird.think(pipes);
      }
    });

    savedBirds = savedBirds.concat(birds.filter(bird => (bird.y === height || bird.y === 0)));
    birds = birds.filter(bird => !(bird.y === height || bird.y === 0));

    if (birds.length === 0) {
      generation_count ++;
      console.log('generation: ' + generation_count);
      birds = ga.nextGeneration(savedBirds, TOTAL);
      savedBirds = [];
      pipes = [];
    }

    pipes.forEach((pipe) => {
      pipe.update();
      savedBirds = savedBirds.concat(birds.filter(bird => pipe.hits(bird)));
      birds = birds.filter(bird => !pipe.hits(bird));
    });

   
    pipes = pipes.filter(pipe => !pipe.isOffScreen());

  }


  // all the drawing stuff
  background(21);
  birds.forEach((bird) => {
    bird.show();
  });
  pipes.forEach((pipe) => {
    pipe.show();
  });
}

function keyPressed() {
  if (key == ' ') {
    // bird.up();
    const point = points[trainPointIndex];
    const inputList = [point.x, point.y, point.bias];
    const target = point.label;
    // perceptron.train(inputList, target);
    drawLine(-1, 1, perceptron);
    trainPointIndex = (trainPointIndex + 1) % points.length;
  }
}
