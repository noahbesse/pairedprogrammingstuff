// Brickbreaker
// Tony and Noah
// April 19th, 2018

let gear;
let state;
let introScreen;
let finalLevel;


function preload(){
  introScreen = loadImage("assets/introScreen.jpg");
  finalLevel = loadImage("assets/final.jpg");
}


function setup() {
  createCanvas(800, 800);
  state = 1;
}

function draw() {
  if (state === 1){
    background(introScreen);
    screenText();

  }
}

function screenText(){
  if (state === 1){
    textAlign(CENTER);
    fill(150, 241, 247);
    textSize(150);
    textStyle(BOLD);
    textFont("Agency FB");
    text("B R E A K E R", width / 2, height / 2 - 150);

    textSize(32);
    text("P r e s s   S P A C E   t o   p l a y", width / 2, height / 2 + 150);
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
