let particleSize = 20;

let width = 400;
let height = 800;
let resolution = 10;

let gravity;
let friction;
let elasticity;

let fr = 30;
let cnv;

let particles = [];
let quadTree;
let heatMap;

function setup() {
  frameRate(fr);

  gravity = createVector(0, 0.9);
  friction = 0.3;
  elasticity = 0.8;

  cnv = createCanvas(width, height);
  quadTree = new QuadTree(0, 0, width, height);

  for (let y = height - particleSize; y > (3 * height) / 4; y -= particleSize) {
    let xRandom = random(0, particleSize);
    for (let x = xRandom; x < width; x += particleSize) {
      particles.push(
        new Particle(
          x,
          y - height / 2,
          particleSize,
          gravity,
          friction,
          elasticity
        )
      );
    }
  }

  // particles.push(
  //   new Particle(width / 2, height / 2, particleSize, gravity, friction)
  // );

  heatMap = new HeatMap(width, height, resolution);
}

function draw() {
  background(50);

  noStroke();
  for (let p of particles) {
    quadTree.insert(p);
    heatMap.heatUp(p);
    p.move();
    p.show();
  }
  quadTree.checkCollision();

  quadTree.empty();
  // heatMap.show();
}
