let training = Array(2000);
let ptron;
let count = 0;
const learningRate = 0.1;

const xmin = -400;
const ymin = -100;
const xmax = 400;
const ymax = 100;

// function to describe a line
function lineDef(x) {
  return 0.4 * x + 1;
}

function setup() {
  createCanvas(640, 360);

  // Perceptron has 3 inputs x,y and bias and learning rate is 2nd argument
  ptron = new Perceptron(3, learningRate);

  // create random set of training points and calculate the known answer
  for (let i = 0; i < training.length; i++) {
    const x = random(xmin, xmax);
    const y = random(ymin, ymax);
    let answer = 1;
    if (y < lineDef(x)) answer = -1;
    training[i] = new Trainer(x, y, answer);
  }
  // smooth();
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // draw the line
  strokeWeight(4);
  stroke(127);
  let x1 = xmin;
  let y1 = lineDef(x1);
  let x2 = xmax;
  let y2 = lineDef(x2);
  line(x1, y1, x2, y2);

  // Draw the line based on current weights
  // weights[0] * x + weights[1] * y + weights[2] = 0;
  stroke(0);
  strokeWeight(1);
  const weights = ptron.weights;
  x1 = xmin;
  y1 = (-weights[2] - weights[0] * x1) / weights[1];
  x2 = xmax;
  y2 = (-weights[2] - weights[0] * x2) / weights[1];
  line(x1, y1, x2, y2);

  // Train the perceptron with one training point at a time
  ptron.train(training[count].inputs, training[count].answer);
  count = (count + 1) % training.length;

  // draw all the points based on what the perceptron would guess
  // does not use the known correct answer
  for (let i = 0; i < count; i++) {
    stroke(0);
    strokeWeight(1);
    fill(0);
    const guess = ptron.feedforward(training[i].inputs);
    if (guess > 0) noFill();

    ellipse(training[i].inputs[0], training[i].inputs[1], 8, 8);
  }
  console.log(count);
}
