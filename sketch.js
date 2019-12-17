let w = 600;
let h = 400;
let scl = 20;

let food;
let score = 0;
let tail = [];
let eating = false;
function randomFoodLocation() {
  food = createVector(Math.floor(random(w) / scl) * scl, Math.floor(random(h) / scl) * scl);
}

class Snake{
  constructor() {
    this.x = 0;
    this.y = 0;
    this.moveX = 1;
    this.moveY = 0;
  }
  lose = function () {
    for (let i = 0; i < score; i++){
      let pos = tail[i];
      if (pos.x === this.x && pos.y === this.y){
        console.log('You lose');
        noLoop();
        return;
      }
    }
  }
  show = function () {
    fill(255);
    for (let i = 0; i < score; i++) {
      rect(tail[i].x, tail[i].y, scl, scl);
    }
    rect(this.x, this.y, 20, 20);
  }
  eat = function(){
    // Add el to list our snake got bigger
    tail.push(createVector(this.x, this.y));
    score++;
    eating = true;
    randomFoodLocation();
  }
  update = function() {
    if (this.x === food.x && this.y === food.y) {
      this.eat();
    }
    if (!eating) {
    for (let i = 0; i < score - 1; i++){
        tail[i] = tail[i + 1];
      }
    }
    tail[score - 1] = createVector(this.x, this.y);
    eating = false;

    this.x += this.moveX * scl;
    this.y += this.moveY * scl;
    
    if (this.x > w){
      this.x = 0;
    }
    if (this.y > h) {
      this.y = 0;
    }
    if (this.x < 0){
      this.x = w;
    }
    if (this.y < 0) {
      this.y = h;
    }
    this.lose();
    
  }
  move = function(x, y){
    this.moveX = x;
    this.moveY = y;
  }
  
}

function keyPressed() {
  if (keyCode === UP_ARROW){
    snake.move(0, -1);
  } else if (keyCode === DOWN_ARROW){
    snake.move(0, 1);
  } else if (keyCode === LEFT_ARROW){
    snake.move(-1, 0);
  }else if (keyCode === RIGHT_ARROW){
    snake.move(1, 0);
  }
}
let snake = new Snake();

function setup() {
  createCanvas(w, h);
  frameRate(10);
  randomFoodLocation();
}

function draw() {
  background(40);

  snake.show();

  snake.update();


  fill(255, 0, 200);
  rect(food.x, food.y, scl, scl);
}