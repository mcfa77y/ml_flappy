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

    this.weights_bias_h = math.zeros(this.hidden_nodes_count, 1).map(randomize);
    this.weights_bias_o = math.zeros(this.output_node_count, 1).map(randomize);

    this.learning_rate = 0.1;
  }

  predict(input_nodes) {
    
    const hidden_nodes = math.add(math.multiply(this.weights_ih, input_nodes), this.weights_bias_h)
      .map(sigmoid);

    const output_nodes = math.add(math.multiply(this.weights_ho, hidden_nodes), this.weights_bias_o)
      .map(sigmoid);

    return output_nodes;
  }

  train(input_nodes, target_nodes) {
    const hidden_nodes = math.add(math.multiply(this.weights_ih, input_nodes), this.weights_bias_h)
      .map(sigmoid);

    const output_nodes = math.add(math.multiply(this.weights_ho, hidden_nodes), this.weights_bias_o)
      .map(sigmoid);

    // let outputs = this.feedForward(input_nodes);
    // calculate the error
    // error = targets - outputs
    // console.table(output_nodes._data);
    // console.table(target_nodes._data);
    // let error = math.subtract(outputs, targets);
    const output_errors = math.subtract(target_nodes, output_nodes);

    const faux_sigmoid = x => x * (1 - x);
    const p = math.dotMultiply(output_errors, output_nodes.map(faux_sigmoid));
    const gradient_o = math.multiply(p, this.learning_rate);


    const hidden_nodes_t = math.transpose(hidden_nodes);
    const weight_ho_deltas = math.multiply(gradient_o, hidden_nodes_t);
    // adjust weights by deltas
    this.weights_ho = math.add(this.weights_ho, weight_ho_deltas);
    // adjust the bias by deltas (which is just gradient_o)
    this.weights_bias_o = math.add(this.weights_bias_o, gradient_o);

    // calculate hidden layer errors
    const hidden_errors = math.multiply(math.transpose(this.weights_ho), output_errors);

    // clculate hidden gradient
    const q = math.dotMultiply(hidden_nodes.map(faux_sigmoid), hidden_errors);
    const gradient_h = math.multiply(q, this.learning_rate);

    // calculate input->hidden deltas
    const input_nodes_t = math.transpose(input_nodes);
    const weight_ih_deltas = math.multiply(gradient_h, input_nodes_t);

    // adjust weights by deltas
    this.weights_ih = math.add(this.weights_ih, weight_ih_deltas);
    // adjust the bias by deltas (which is just gradients)
    this.weights_bias_h = math.add(this.weights_bias_h, gradient_h);
    return output_errors;
  }
}
