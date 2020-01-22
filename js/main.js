console.clear();
const p = noise;
let branches = [];

class Branch {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.prevx = x;
    this.prevy = y;
    this.visible = true;
    this.color = color(random(110, 110 + 100), 70, 100, 100);
    this.speed = {
      x: random(-7, 7),
      y: random(-7, 7)
    };
  }
  walls () {
    this.prevx = this.x;
    this.prevy = this.y;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.visible = false;
    }
  }
  draw () {
    line(this.prevx, this.prevy, this.x, this.y);
  }
  moveStraight () {
    this.x += this.speed.x * 5;
    this.y += this.speed.y * 5;
  }
  moveRandom () {
    this.speed.x += random(-10, 10);
    this.speed.y += random(-10, 10);
    this.x += this.speed.x * .5;
    this.y += this.speed.y * .5;
  }
  moveNoise () {
    this.speed.x += p.simplex3(this.x * 0.005, this.y * 0.005, millis() * 0.0001) * 2;
    this.speed.y += p.simplex3(this.y * 0.005, this.x * 0.005, millis() * 0.0001) * 2;
    this.x += this.speed.x * .5;
    this.y += this.speed.y * .5;
  }
}

function createBranches (amount) {
  // Refresh color & blend mode
  blendMode(BLEND);
  colorMode(RGB);

  branches = [];
  for (let i=0; i<amount; i++) {
    const x = width / 2;
    const y = height / 2;
    branches.push(new Branch(x, y));
  }
}

/* ====== STEP 7 ====== */
function goToStep7 () {
  clear();
  createBranches(1000);
  colorMode(HSB);
  blendMode(SCREEN);
  strokeWeight(2);
}
function step7 () {
  stroke((millis() * 0.3) % 360, 100, 50);
  branches.forEach(branch => {
    if (branch.visible) {
      branch.moveNoise();
      branch.draw();
      branch.walls();
    }
  });
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  strokeCap(SQUARE);
  document.querySelector('canvas').addEventListener('click', windowResized);
  if (window['goToStep' + '7']) {
    window['goToStep' + '7']();
  }
}

function windowResized () {
  p.seed(random(100));
  resizeCanvas(windowWidth, windowHeight);
  if (window['goToStep' + step.value]) {
    window['goToStep' + step.value]();
  }
}

const texts = document.querySelectorAll('section p');
step.oninput = () => {
    window['goToStep' + step.value]();
};

function draw () {
  if (window) {
    window['step7']();
  }

  texts.forEach(text => text.style.display = 'none');
  texts[step.value - 1].style.display = 'block';
}
