// Brickbreaker
// Tony and Noah
// April 19th, 2018

// Variables
let state;
let introScreen, finalLevel;
let platform, redBrick, blueBrick, yellowBrick, greenBrick, greyBrick;
let finalLevelMusic;
let ballEllipse;
let ballSpawned;
let y = 700;
let dx = 2;
let dy = -2;
let brickRowCount, brickColumnCount;
let brickX, brickY;
let brickTopOffset = 20;
let brickSideOffset = 18.5;
let brickSpacing = 5;
let brickWidth = 72;
let brickHeight = 32;

// Preloading the required asset
function preload(){
  redBrick = loadImage("assets/redBrick.png");
  blueBrick = loadImage("assets/blueBrick.png");
  yellowBrick = loadImage("assets/yellowBrick.png");
  greenBrick = loadImage("assets/greenBrick.png");
  greyBrick = loadImage("assets/greyBrick.png");
  introScreen = loadImage("assets/introScreen.jpg");
  finalLevel = loadImage("assets/final.jpg");
  platform = loadImage("assets/platform.png");
  finalLevelMusic = loadSound("assets/Music/FINALBOSSPOWERUP.wav");
}

// This sets up the canvas, the state of the screen
function setup() {
  let canvas = createCanvas(800, 800);
  canvas.position(400, 0);
  noCursor();
  state = 1;
}

let x = mouseX;

// Displays all the aspects of the game.
function draw() {
  clear();
  gameScreens();
  moveTheBall();
}

// This function controls the platform
function placement() {
  let limits = constrain(mouseX - 46, 0, 708);
  image(platform, limits, 700);
}

// This function moves the ball around the screen
function moveTheBall(){
  if (state === 2){
    let limits = constrain(mouseX, 46, 754);
    ellipse(limits,700,25);
  }
}

// This function displays all the different game screens like the intro screen the levels and the end screen
function gameScreens() {
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
      if (keyCode === 32) {
        state = 2;
      }
    }
  }

  if (state === 2) {
    background(introScreen);
    placement();
    brickSpawn();
  }

  if (state === 3) {
    background(255);

  }
}

// This function places all the bricks on the canvas
function brickSpawn() {
  if (state === 2) {
    let brickRowCount = 8;
    let brickColumnCount = 10;
    for (let c=0; c < brickColumnCount; c++){
      for(let r=0; r < brickRowCount; r++){
        let brickX = c*(brickWidth + brickSpacing) + brickSideOffset;
        let brickY = r*(brickHeight + brickSpacing) + brickTopOffset;
        image(greyBrick, brickX, brickY);
      }
    }
  }
  if (state === 3) {
    let brickRowCount = 8;
    let brickColumnCount = 9;
    for (let c=0; c < brickColumnCount; c++){
      for(let r=0; r < brickRowCount; r++){
        let brickX = c*(brickWidth + brickSpacing) + brickSideOffset;
        let brickY = r*(brickHeight + brickSpacing) + brickTopOffset;
        image(redBrick, brickX, brickY);
      }
    }
  }
  if (state === 4) {
    let brickRowCount = 8;
    let brickColumnCount = 9;
    for (let c=0; c < brickColumnCount; c++){
      for(let r=0; r < brickRowCount; r++){
        let brickX = c*(brickWidth + brickSpacing) + brickSideOffset;
        let brickY = r*(brickHeight + brickSpacing) + brickTopOffset;
        image(greenBrick, brickX, brickY);
      }
    }
  }
  if (state === 5) {
    let brickRowCount = 8;
    let brickColumnCount = 9;
    for (let c=0; c < brickColumnCount; c++){
      for(let r=0; r < brickRowCount; r++){
        let brickX = c*(brickWidth + brickSpacing) + brickSideOffset;
        let brickY = r*(brickHeight + brickSpacing) + brickTopOffset;
        image(yellowBrick, brickX, brickY);
      }
    }
  }
  if (state === 6) {
    let brickRowCount = 8;
    let brickColumnCount = 9;
    for (let c=0; c < brickColumnCount; c++){
      for(let r=0; r < brickRowCount; r++){
        let brickX = c*(brickWidth + brickSpacing) + brickSideOffset;
        let brickY = r*(brickHeight + brickSpacing) + brickTopOffset;
        image(blueBrick, brickX, brickY);
      }
    }
  }
}
