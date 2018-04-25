// Brickbreaker
// Tony and Noah
// April 19th, 2018
let gear;
let state;
let introScreen, finalLevel;
let platform, redBrick, blueBrick, yellowBrick, greenBrick, greyBrick;
let finalLevelMusic;


function preload(){
  introScreen = loadImage("assets/introScreen.jpg");
  finalLevel = loadImage("assets/final.jpg");
  finalLevelMusic = loadSound("assets/FINALBOSSPOWERUP.wav");
  platform = loadImage("assets/platform.png");

}


function setup() {
  createCanvas(800, 800);
  state = 1;
}

function draw() {
  startScreen();
  gameScreens();


}

function startScreen(){
  if (state === 1){
    background(introScreen);
    textAlign(CENTER);
    fill(150, 241, 247);
    textSize(150);
    textStyle(BOLD);
    textFont("Agency FB");
    text("B R E A K E R", width / 2, height / 2 - 150);

    textSize(32);
    text("P r e s s   S P A C E   t o   p l a y", width / 2, height / 2 + 150);

    if (keyIsPressed){
      if (keyCode === 32){
        state = 2;
      }
    }
  }
}

function gameScreens() {
  if (state === 2) {
    background(255);
    placement();
  }
}

function placement() {
  image(platform, mouseX, 700);

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
