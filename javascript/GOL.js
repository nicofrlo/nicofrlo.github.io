let w;
let h;
let scl ;

let cols;
let rows;


let matrix = new Array(cols);
let next = new Array(cols);

let start = 0;

function starto() {
  start = !start;
}

function generateRandom() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      matrix[i][j] = floor(random(2));
    }
  }
}

function pauseGame() {
  start = false;
}

function reset() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      matrix[i][j] = 0;
    }
  }
  start = false;
}

function setup() {
  w = windowWidth / 1.8;
  h = windowHeight / 1.8;
  scl = 20;
  cols = floor(w / scl);
  rows = floor(h / scl);
  createCanvas(w, h);
  for (let i = 0; i < cols; i++) {
    matrix[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    next[i] = new Array(rows);
  }

  generateRandom();
}

function rescale(el) {
  return floor(el / scl);
}
let prevX;
let prevY;
function mousePressed() {
  const x = rescale(mouseX);
  const y = rescale(mouseY);
  prevX = x;
  prevY = y;
  const state = matrix[x][y];
  matrix[x][y] = !state;
}

function mouseDragged() {
  if (!(rescale(mouseX) === prevX && rescale(mouseY) === prevY)){
    mousePressed();
  }
}

function showMatrix() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      matrix[i][j] ? fill(0) : fill(255);
      rect(i * scl, j * scl, scl, scl);
    }
  }
}

function draw() {
  showMatrix();
  if (start) {
    nextGen();
  }
}
function countNeighbors(x, y) {
  let neighbors = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x + i > 0 && y + j> 0 && x + i < cols && y + j < rows) {
        neighbors += matrix[x+i][y+j];
      }
    }
  }
  return neighbors;
}

function nextGen() {

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const alive = matrix[i][j];
      const count = countNeighbors(i, j) - alive;
     
      if (alive && count < 2) next[i][j] = 0;
      else if (alive && count > 3) next[i][j] = 0;
      else if (!alive && count === 3) next[i][j] = 1;
      else next[i][j] = alive;
    }
  }
  let temp = matrix;
  matrix = next;
  next = temp;
}