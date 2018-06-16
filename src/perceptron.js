// import { random } from 'p5';

class Perceptron {
  constructor() {
    this.weights = [0.0, 0.0, 0.0];
    // init weights weights randomly
    this.weights = this.weights.map(() => random(-1, 1));
    this.learningRate = 0.001;
  }
  activationFn(x) {
    return (x >= 0) ? 1 : -1;
  }

  guess(inputList) {
    const sumValues = (accumulator, currentValue) => accumulator + currentValue;
    const inputWeightList = inputList.map((input, index) => [input, this.weights[index]]);
    const sum = inputWeightList.map((inputWeight) => {
      const input = inputWeight[0];
      const weight = inputWeight[1];
      return input * weight;
    })
      .reduce(sumValues);
    return this.activationFn(sum);
  }

  train(inputList, target) {
    const guess = this.guess(inputList);
    const error = target - guess;
    this.weights = this.weights.map((weight, index) => {
      const deltaWeight = error * inputList[index] * this.learningRate;
      return weight + deltaWeight;
    });
  }

  guessY(x) {
    if (this.weights != null || this.weights != undefined) {
      return -this.weights[2] / this.weights[1] - this.weights[0] / this.weights[1] * x;
    }
    return -1;
  }
}

// export default Perceptron;
