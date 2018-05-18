// import { math } from 'mathjs';

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function randomize(x) {
  return Math.random() * 2 - 1;
}

class NeuralNetwork {
  constructor(input_node_count, hidden_node_count, output_node_count) {
    this.input_node_count = input_node_count;
    this.hidden_nodes_count = hidden_node_count;
    this.output_node_count = output_node_count;

    this.weights_ih = math.zeros(this.hidden_nodes_count, this.input_node_count).map(randomize);
    this.weights_ho = math.zeros(this.output_node_count, this.hidden_nodes_count).map(randomize);
    
    this.bias_h = math.zeros(this.hidden_nodes_count, 1).map(randomize);
    this.bias_o = math.zeros(this.output_node_count, 1).map(randomize);

    this.learning_rate = 0.1;
  }

  feedForward(inputs) {
    const hidden = math.add(math.multiply(this.weights_ih, inputs), this.bias_h)
      .map(sigmoid);

    const output = math.add(math.multiply(this.weights_ho, hidden), this.bias_o)
      .map(sigmoid);

    return output;
  }

  foo(p, q, r){
    const x0 = math.multiply(p, q);
    const x1 = math.add(x0, r);
    const x2 = x1.map(sigmoid);
    return x2;
  }
  train(inputs, targets) {
    const hidden = this.foo(this.weights_ih, inputs, this.bias_h)
    // math.add(math.multiply(this.weights_ih, inputs), this.bias_h)
    //   .map(sigmoid);

    const outputs = math.add(math.multiply(this.weights_ho, hidden), this.bias_o)
      .map(sigmoid);

    //let outputs = this.feedForward(inputs);
    // calculate the error
    // error = targets - outputs
    console.table(outputs._data);
    console.table(targets._data);
    // let error = math.subtract(outputs, targets);
    let output_errors = math.subtract(targets, outputs);

    // calculate gradient
    const faux_sigmoid = (x) => x * (1 - x);
    let gradients = math.multiply(this.learning_rate, math.dotMultiply(output_errors, outputs.map(faux_sigmoid)));

        // adjust bias
    this.bias_o = math.add(this.bias_o, gradients);

    // calculate hidden layer errors
    let hidden_errors = math.multiply(math.transpose(this.weights_ho), output_errors);

    // calculate deltas
    let hidden_t = math.transpose(hidden);
    let weight_ho_deltas = math.multiply(gradients, hidden_t);
    
    this.weights_ho = math.add(this.weights_ho, weight_ho_deltas);


    // calculate hidden gradient
    let hidden_gradient = math.multiply(this.learning_rate, math.dotMultiply(hidden_errors, hidden.map(faux_sigmoid)));

    // adjust hidden bias
    this.bias_h = math.add(this.bias_h, hidden_gradients);

    // calculate input -> hidden deltas;
    let inputs_t = math.transpose(inputs);
    let weight_ih_deltas = math.multiply(hidden_gradient, inputs_t);

    this.weights_ih = math.add(this.weights_ih, weight_ih_deltas);

    return output_errors;
  }
}
