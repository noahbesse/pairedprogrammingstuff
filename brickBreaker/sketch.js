// Brickbreaker
// Tony and Noah
// April 19th, 2018

//Tony's Code: Brick spawn and brick placement, collision detection, along with some of the ball moving scripts, level design and art assets.
//Noah's Code: Level switching, some of the ball moving script, platform movement and interaction.

// Variables
let state = 1;
let introScreen, finalLevel;
let platform, redBrick, blueBrick, yellowBrick, greenBrick, greyBrick, greekBrick;
let winScreenMusic, finalLevelMusic, gameMusic;
let ballEllipse;
let ballSpawned;
let x = 250;
let y = 400;
let limits;
let ballSize;
let dx = 5;
let dy = -5;
let brickRowCount = 10;
let brickColumnCount = 7;
let brickX, brickY;
let brickTopOffset = 20;
let brickSideOffset = 18.5;
let brickSpacing = 5;
let brickWidth = 72;
let brickHeight = 32;
let bricks = [];
let brickStatusState = true;
let level;
let bounce;
let score, visualScore;

// Disables right-click on the mouse
document.addEventListener("contextmenu", event => event.preventDefault());

// Preloading the required assets
function preload(){
  greekBrick = loadImage("assets/greekBrick.jpg");
  redBrick = loadImage("assets/redBrick.png");
  blueBrick = loadImage("assets/blueBrick.png");
  yellowBrick = loadImage("assets/yellowBrick.png");
  greenBrick = loadImage("assets/greenBrick.png");
  greyBrick = loadImage("assets/greyBrick.png");
  introScreen = loadImage("assets/introScreen.jpg");
  finalLevel = loadImage("assets/final.jpg");
  platform = loadImage("assets/platform.png");
  finalLevelMusic = loadSound("assets/Music/FINALBOSSPOWERUP.wav");
  gameMusic  = loadSound("assets/Music/gameMusic.mp3");
  bounce = loadSound("assets/Music/bounceSoundEffect.wav");
  winScreenMusic = loadSound("assets/Music/congratulations.mp3");
}

// This sets up the canvas, the state of the screen and some other small things
function setup() {
  gameMusic.amp(1);
  gameMusic.loop();
  finalLevelMusic.amp(0.0);
  finalLevelMusic.loop();
  winScreenMusic.amp(0,0);
  winScreenMusic.loop();
  let canvas = createCanvas(800, 800);
  canvas.position(windowWidth/4, 0);
  noCursor();
  score = 0;
  visualScore = 0;
}

// Displays all the aspects of the game
function draw() {
  gameScreens();
}

// This function controls the platform
function platformPlacement() {
  limits = constrain(mouseX - 46, 0, 708);
  image(platform, limits, 700);
}

// This function makes the ball
function displayBall(){
  ballSize = 20;
  fill(255);
  ellipse(x, y, ballSize, ballSize);
}

// This function moves the ball around the screen
function moveTheBall(){
  x += dx;
  y += -dy;

  if (x + 10 >= width || x -10 <= 0) {
    dx = -dx;
    bounce.play();
  }

  if (y + 10 >= height || y -10 <= 0){
    dy = -dy;
    bounce.play();
  }
  if (y === 700 && x < limits + platform.width && x > limits+ 88 - platform.width/2) {
    dy = -dy;
    dx = Math.abs(dx);
    bounce.play();
  }
  if (y === 700 && x < limits + platform.width/2 && x > limits+ 88 - platform.width) {
    dy = -dy;
    dx = -Math.abs(dx);
    bounce.play();
  }
  if (y === 700 && x === platform.width/2) {
    dy = -dy;
    dx = random(dx,-dx);
    bounce.play();
  }
  if (y >= 775){
    state = 6;
  }
}

// This gives all the values in the array a status
function brickStatus() {
  if (brickStatusState === true && state === 2){
    for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 2,};
      }
      brickStatusState = false;
    }
  }
  if (brickStatusState === true && state === 3){
    for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 3,};
      }
      brickStatusState = false;
    }
  }
  if (brickStatusState === true && state === 4){
    for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 4,};
      }
      brickStatusState = false;
    }
  }
}

// This function check whether or not the ball hits a brick
function colissionDectection() {
  for (let c=0; c<brickColumnCount; c++) {
    for (let r=0; r<brickRowCount; r++) {
      let b = bricks[c][r];
      if(b.status !== 0) {
        if (x >= b.x && x <= b.x + 72 && y >= b.y && y <= b.y + 32){
          score++;
          visualScore = visualScore + 10;
          dy = -dy;
          b.status = b.status - 1;
          bounce.play();
        }
        if( state !== 3 && score === brickRowCount*brickColumnCount*state) {
          restart();
          state++;
        }
        if (state === 3 && score === brickRowCount*brickColumnCount*state){
          restart();
          finalLevelMusic.amp(0.3);
          state++;
        }
      }
    }
  }
}

// This function displays the "fake" score on the screen
function displayScore() {
  textAlign(LEFT);
  fill(150, 241, 247);
  textSize(40);
  textStyle(BOLD);
  textFont("Agency FB");
  text("SCORE: " + visualScore, 13, 785);
}

//This function places all the bricks on the canvas
function brickSpawn() {
  if (state === 2) {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 2) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(greyBrick, brickX, brickY);
        }
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

  if (state === 3) {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 3) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(blueBrick, brickX, brickY);
        }
        if (bricks[c][r].status === 2) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(greyBrick, brickX, brickY);
        }
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
        if (bricks[c][r].status === 4) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(greekBrick, brickX, brickY);
        }
      }
    }
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 3) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(blueBrick, brickX, brickY);
        }
      }
    }
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status === 2) {
          let brickX = r * (brickWidth + brickSpacing) + brickSideOffset;
          let brickY = c * (brickHeight + brickSpacing) + brickTopOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          image(greyBrick, brickX, brickY);
        }
      }
    }
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
    level = 1;
    background(introScreen);
    brickStatus();
    platformPlacement();
    displayBall();
    moveTheBall();
    brickSpawn();
    colissionDectection();
    displayScore();
  }
  if (state === 3) {
    level = 3;
    background(introScreen);
    brickStatus();
    platformPlacement();
    displayBall();
    moveTheBall();
    brickSpawn();
    colissionDectection();
    displayScore();
  }
  if (state === 4){
    level = 5;
    gameMusic.stop();
    finalLevelMusic.amp(1);
    background(finalLevel);
    brickStatus();
    platformPlacement();
    displayBall();
    moveTheBall();
    brickSpawn();
    colissionDectection();
    displayScore();
  }
  // This is the end screen
  if (state === 5) {
    gameMusic.stop();
    finalLevelMusic.stop();
    winScreenMusic.amp(1);
    background(introScreen);
    textAlign(CENTER);
    fill(150, 241, 247);
    textSize(80);
    textStyle(BOLD);
    textFont("Agency FB");
    text("C O N G R A D U L A T I O N S", 400,height/2-50);
    text("Y O U   W I N", 400,height/2+100);
  }
  // This is the game over screen
  if (state === 6){
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
      displayScore();
      restart();
    }
  }
}

// This function restarts the game
function restart(){
  gameMusic.stop();
  finalLevelMusic.stop();
  gameMusic.loop();
  gameMusic.amp(1);
  x = 250;
  y = 400;
  score = 0;
  visualScore = 0;
  brickStatusState = true;
}
