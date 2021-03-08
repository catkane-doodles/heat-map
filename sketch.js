let particleSize = 20;

let width = 400;
let height = 800;
let resolution = 10;

let gravity;
let friction;
let elasticity;

let fr = 30;
let cnv;

let totalParticles = 300;

let particles = [];
let quadTree;
let heatMap;

function setup() {
  frameRate(fr);

  gravity = createVector(0, 0.1);
  friction = 0.3;
  elasticity = 0.8;

  cnv = createCanvas(width, height);
  quadTree = new QuadTree(0, 0, width, height);

  for (let i = 0; i < totalParticles; i++) {
    particles.push(
      new Particle(
        random(particleSize, width - particleSize),
        random(particleSize, height - particleSize),
        particleSize,
        gravity,
        friction,
        elasticity
      )
    );
  }

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
