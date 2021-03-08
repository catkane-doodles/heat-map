class Heat {
  constructor(x, y, width, magnitude) {
    this.x = x;
    this.y = y;
    this.beginX = x - width;
    this.beginY = y - magnitude;
    this.width = width;
    this.magnitude = magnitude;
  }

  contains(p) {
    // console.log(this.beginX, p.x, this.x);
    // console.log(this.beginY, p.y, this.y);
    let x = p.pos.x;
    let y = p.pos.y;
    return x <= this.x && x >= this.beginX && y <= this.y && y >= this.beginY;
  }

  show() {
    stroke(255);
    noFill();
    rect(this.beginX, this.beginY, this.width, this.magnitude);
  }
}

class HeatMap {
  constructor(width, height, resolution) {
    this.width = width;
    this.height = height;

    this.resolution = resolution;
    this.heats = [];
    this.fill();
  }

  fill() {
    let wRes = int(this.width / this.resolution);
    let h = this.height;
    for (let w = 0; w <= wRes; w++) {
      let a = 0.1;
      let x = w - wRes / 2;
      let x2 = x * x;
      let y = a * x2;
      // console.log(y);
      let mag = (30 - y) * 5;
      this.heats.push(new Heat(w * this.resolution, h, this.resolution, mag));
    }
  }

  heatUp(p) {
    for (let heat of this.heats) {
      if (heat.contains(p)) {
        p.acc.y -= (this.height - p.pos.y) / heat.magnitude;
      }
    }
  }

  show() {
    for (let heat of this.heats) {
      heat.show();
    }
  }
}
