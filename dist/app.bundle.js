(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./src/sketch.js":
/*!***********************!*\
  !*** ./src/sketch.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { Bird } from './bird';
// import { Pipe } from './pipe';
// import { Perceptron } from './nn';

var bird = void 0;
var pipes = [];
var perceptron = void 0;
var points = [];
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());

  perceptron = new Perceptron();

  for (var i = 0; i < 100; i++) {
    points.push(new Point());
  }
}

function drawLine(min, max, f) {
  stroke(128);
  var p1 = new Point(min, f(min));
  var p2 = new Point(max, f(max));
  line(p1.px(), p1.py(), p2.px(), p2.py());
}

function draw() {
  background(21);
  bird.show();
  bird.update();
  drawLine(-1, 1, function (x) {
    return 0.3 * x + 0.2;
  });
  drawLine(-1, 1, perceptron.guessYFn);
  pipes.forEach(function (pipe) {
    pipe.show();
    pipe.update();
    pipe.hits(bird);
  });

  pipes = pipes.filter(function (pipe) {
    return !pipe.isOffScreen();
  });

  points.forEach(function (point) {
    point.show();
    var inputList = [point.x, point.y, point.bias];
    var target = point.label;
    perceptron.train(inputList, target);
    var guess = perceptron.guess(inputList);
    if (guess === target) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(point.px(), point.py(), 8, 8);
  });

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

/***/ })

},[["./src/sketch.js","runtime~app"]]]);
//# sourceMappingURL=app.bundle.js.map