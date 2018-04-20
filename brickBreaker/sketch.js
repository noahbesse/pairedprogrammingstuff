// Brickbreaker
// Tony and Noah
// April 19th, 2018

let gear;
let state;
let intro;
let finalLevel;


function preload(){
  // intro = loadImage("assets/t1.png");
  finalLevel = loadImage("assets/final.jpg");
}


function setup() {
  createCanvas(800, 800);
  state = 1;
}

function draw() {
  if (state === 1){
    background(finalLevel);
    screenText();

  }
}

function screenText(){
  if (state === 1){
    textAlign(CENTER);
    fill(150, 241, 247);
    textSize(100);
    textStyle(BOLD);
    textFont("Cambria");
    text("Brick Breaker", width / 2, height / 2 - 100);
  }


}



class Ball{
  constructor(){
    this.x;
    this.y;
    this.speed;
  }
}

class Platform{
  constructor(){
    this.x = mouseX;
    this.y = 700;
    this.length;
  }
}
