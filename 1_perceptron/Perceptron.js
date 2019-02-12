class Perceptron {
  constructor(n, c_) {
    this.weights = [];
    this.c = c_;
    for (let i = 0; i < n; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  // function to train the perceptron
  // weights are adjusted based on desired answer
  train(inputs, desired) {
    // guess the result
    const guess = this.feedforward(inputs);
    const error = desired - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.c * error * inputs[i];
    }
  }

  // Guess -1/1 based on input values
  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return this.activate(sum);
  }

  activate(sum) {
    return sum > 0 ? 1 : -1;
  }
}
