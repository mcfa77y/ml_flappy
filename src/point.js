class Point {
  constructor(x = random(-1, 1), y = random(-1, 1)) {
    this.x = x;
    this.y = y;
    this.bias = 1;
    this.fn = xx => 0.89 * xx + 0.1;
    this.label = this.getLabel();
    this.size = 32;
  }
  px() {
    return map(this.x, -1, 1, 0, width);
  }
  py() {
    return map(this.y, -1, 1, height, 0);
  }
  getLabel() {
    return (this.y > this.fn(this.x)) ? 1 : -1;
    // if (this.y > this.fn(this.x)) {
    //   return 1;
    // }

    // return -1;
  }

  getInputs() {
    return [this.x, this.y, this.bias];
  }
  show() {
    stroke(0);
    if (this.label === 1) {
      fill(255);
    } else {
      fill(128);
    }

    ellipse(this.px(), this.py(), this.size, this.size);
  }
}
