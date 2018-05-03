// Brickbreaker
// Tony and Noah
// April 19th, 2018

// Variables
let levelOfDifficulty;
let state;
let introScreen, finalLevel;
let platform, redBrick, blueBrick, yellowBrick, greenBrick, greyBrick, greekBrick;
let finalLevelMusic;
let ballEllipse;
let ballSpawned;
let x = 250;
let y = 400;
let limits;
let ballSize;
let dx = 10*levelOfDifficulty;
let dy = -10*levelOfDifficulty;
let brickRowCount = 10;
let brickColumnCount = 6;
let brickX, brickY;
let brickTopOffset = 20;
let brickSideOffset = 18.5;
let brickSpacing = 5;
let brickWidth = 72;
let brickHeight = 32;
let bricks = [];

for(let c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(let r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1,};
  }
}
document.addEventListener('contextmenu', event => event.preventDefault());
// Preloading the required assets
function preload(){
  greekBrick = loadImage("assets/greekBrick.jpg")
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
  canvas.position(windowWidth/4, 0);
  noCursor();
  state = 1;
}


// Displays all the aspects of the game.
function draw() {
  clear();
  gameScreens();
}
// This function controls the platform
function placement() {
  limits = constrain(mouseX - 46, 0, 708);
  image(platform, limits, 700);
}

// This function moves the ball around the screen
function moveTheBall(){
  if (!ballSpawned){

  }
  if (ballSpawned){
    x += dx;
    y += -dy;

    if (x + 10 >= width || x -10 <= 0) {
      dx = -dx;
    }

    if (y + 10 >= height || y -10 <= 0){
      dy = -dy;
    }

    if (y === 700 && x <= limits + platform.width && x >= limits+ 88 - platform.width) {
      dy = -dy;
    }
    if (y >= 750){
      state = 5;
    }
    // if (bricks.status.contains(1)){
    //   state++;
    // }
  }
}
//shows the ellipse that makes up the ball
function displayBall(){
  ballSize = 20;
  fill(255);
  ellipse(x, y, ballSize, ballSize);
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
    text("P r e s s   S P A C E   o r  C L I C K  t o   p l a y", 400, 550);


    if (mouseIsPressed){
      state = 2;

    }
    if (keyIsPressed){
      if (keyCode === 32) {
        state = 2;
    
      }
    }
  }

  if (state === 2) {
    levelOfDifficulty = 1;
    background(introScreen);
    placement();
    displayBall();
    moveTheBall();
    brickSpawn();
    colissionDectection();

  }

  if (state === 3) {
    levelOfDifficulty = 2;
    background(introScreen);
    placement();
    displayBall();
    moveTheBall();
    brickSpawn();
    colissionDectection();
  }
  if (state === 4){
    levelOfDifficulty = 5;
    background(finalLevel);
    placement();
    displayBall();
    moveTheBall();
    brickSpawn();
    colissionDectection();
  }
  if (state === 5){
    background(introScreen);
    textAlign(CENTER);
    fill(150, 241, 247);
    textSize(130);
    textStyle(BOLD);
    textFont("Agency FB");
    text("G A M E  O V E R", 400,250);

    textSize(32);
    text("C L I C K  t o  R E S T A R T", 400, 550);
    if (mouseIsPressed){
      state = 1;
    }
  }
}

function colissionDectection() {
  for (let c=0; c<brickColumnCount; c++) {
    for (let r=0; r<brickRowCount; r++) {
      let b = bricks[c][r];
      if(b.status > 0) {
        if (x >= b.x && x <= b.x+72 && y >= b.y && y <= b.y+32){
          dy = -dy;
          b.status = b.status - 1;
        }
      }
    }
  }
}

//This function places all the bricks on the canvas
function brickSpawn() {
  if (state === 2) {

    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(greyBrick, brickX, brickY);
        }
      }
    }
  }
  if (state === 3) {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(redBrick, brickX, brickY);
        }
      }
    }
  }
  if (state === 4) {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(greekBrick, brickX, brickY);
        }
      }
    }
  }
}
