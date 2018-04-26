// Brickbreaker
// Tony and Noah
// April 19th, 2018
let gear;
let state;
let introScreen, finalLevel;
let platform, redBrick, blueBrick, yellowBrick, greenBrick, greyBrick;
let finalLevelMusic;
let levelOfDifficulty;


function preload(){
  redBrick = loadImage("assets/redBrick.png");
  blueBrick = loadImage("assets/blueBrick.png");
  yellowBrick = loadImage("assets/yelowBrick.png");
  greenBrick = loadImage("assets/greenBrick.png");
  greyBrick = loadImage("assets/greyBrick.png");
  introScreen = loadImage("assets/introScreen.jpg");
  finalLevel = loadImage("assets/final.jpg");
  finalLevelMusic = loadSound("assets/FINALBOSSPOWERUP.wav");
  platform = loadImage("assets/platform.png");

}


function setup() {
  noCursor();
  let canvas =  createCanvas(800, 800);
  canvas.position(400,0);
  state = 1;
}
function placement() {
  image(platform, mouseX, 700);
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
    text("B R E A K E R", 400,250);

    textSize(32);
    text("P r e s s   S P A C E   t o   p l a y", 400, 550);

    if (keyIsPressed){
      if (keyCode === 32){
        state = 2;
      }
    }
  }
}
function brickSpawn(){

}

function gameScreens() {
  if (state === 2) {
    background(introScreen);
    placement();
    brickSpawn();
  }
}
