const DOUBLEJUMP = true;
//FrameSize
const WIDTH = 1600;
const HEIGHT = 800;
// Player Start
const STARTX = 300;
const STARTY = 500;
// HealthBars
const HEALTHBARHEIGHT = 10;
const HEALTHBARTIME = 200;

// Images Multipliers
const BACKMULTI = 0.75; 
let backgroundPic; // Stars
let backgroundx;
let backgroundy;
const MIDMULTI = 0.85;
let backGrass; // Black Shadow
let backGrassx;
let backGrassy;
const FOREMULTI = 0.4;
let foregroundGrass; // Grass infront
let foregroundGrassx;
let foregroundGrassy;

let foregroundHud;
const foreGroundHudY = 800;

// Player fields
let playerHud;
let player;

// Level Objects
let squares = [];
let scenery = [];
let enemies = [];

let drops = new DropController();

// let
let worldX;
let worldY;



let frameRateTotal;
let frameRateCount;

let gameOver;
let overScreen;
let overCount;
let imageOpacity;

let paused;
let pauseScreen;
let started;
let startScreen;
let level = 1;

// LOADING OBJECTS

function setup() {
  loaded = false;
  canvas = createCanvas(WIDTH, HEIGHT);

  player = new Player(STARTX, STARTY, 200);

  paused = false;
  pauseScreen = loadImage("assets/images/pauseScreen.png")
  started = false;
  startScreen = loadImage("assets/images/startScreen.png")
  gameOver = false;

  squares = [];
  scenery = [];
  enemies = [];

  overScreen = loadImage("assets/images/gameOver.png");
  overDisplayed = false;
  imageOpacity = 0;
  overCount = 0;

  loadLevel(level);

  playerPic = loadImage("assets/images/player-image.png");
  playerHud = loadImage("assets/images/hud.png");
  backgroundPic = loadImage("assets/images/background-stars.png");
  backgroundx = 0;
  backGrass = loadImage("assets/images/background-grass.png");
  backGrassx = 0;
  foregroundGrass = loadImage("assets/images/foreground-grass-blurred.png");
  foregroundGrassx = 0;
  foregroundHud = loadImage("assets/images/hud.png");

  // drawBackground();

  gunTickCount = 0;
  worldX = 0;
  worldY = 0;
  frameRateTotal = 0;
  frameRateCount = 0;

  frameRate(75);
  textSize(30);
  noStroke();
}

// Main method
function draw() {
  if (started){
    if (!paused){
      if (player.playerHealth > 0){
        clear();
    
      drawBackground();
      
      drawObjects();
      drops.updateDrops();
      player.updatePlayer();
      drawForeground();
    
      }
      else{ // If game is over
        endGameFade();
      }
    }
    else{ // if game is paused
      image(pauseScreen, 0, 0);
    }
  }
  else{ // if game hasnt started
    mainMenu();
  }
}

function mainMenu(){
  image(startScreen, 0, 0)
}

function endGameFade(){
  overCount++;
  if (overCount > 20){
    overCount = 0;
    imageOpacity += 20;
  }

  tint(255, imageOpacity);
  image(overScreen, 0, 0);
}

// Event Methods
function keyPressed() {

  if (started){
      if (keyCode == LEFT_ARROW) {
        player.moving = true;
        player.direction = 0;
        player.gun.direction = 0;
      }
      if (keyCode == RIGHT_ARROW) {
        player.moving = true;
        player.direction = 1;
        player.gun.direction = 1;
      }
      if (keyCode == UP_ARROW) {
        if (!player.jumping) {
          player.yVelocity = JUMPFORCE;
          player.jumping = true;
        } else {
          if (DOUBLEJUMP && !player.doubleJumped) {
            player.yVelocity = JUMPFORCE;
            player.doubleJumped = true;
          }
        }
        jumping = true;
      }
      if (keyCode == 32) {
        player.shooting = true;
        gunTickCount = FIRERATE;
      }
      if (keyCode == 16){
        player.sprinting = true;
      }

    if (keyCode == 27){
      paused = !paused;
    }
  }
  else{
    if (keyCode == 13){
      started = true;
    }
  }

  
}

function keyReleased() {

  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) player.moving = false;
  else if (keyCode == 32) {
    // Space bar
    player.shooting = false;
  }
  else if (keyCode == 16){
    player.sprinting = false;
  }
}



// Object Methods
function drawObjects() {
  fill(color(30, 90, 200));

  backGrassy = parseInt(GRASSPOS) - SHADOWOFFSET - worldY;
  backgroundy = -1800 - worldY;
  foregroundGrassy = parseInt(GRASSPOS) - GRASSOFFSET - worldY;

  for (var i = 0; i < scenery.length; i++){
    // if (
    //   parseInt(scenery[i].x) + scenery[i].picture.width >= worldX &&
    //   squares[i].x <= worldX + WIDTH
    // ) {
    //   // FIX THIS!!!
      
    // }
    
    scenery[i].relX = parseInt(scenery[i].x) - worldX;
    scenery[i].relY = parseInt(scenery[i].y) - worldY;
      scenery[i].DrawScenery();
  }

  for (var i = 0; i < squares.length; i++){
    if (
      parseInt(squares[i].x) + squares[i].picture.width >= worldX &&
      squares[i].x <= worldX + WIDTH
    ) {
      squares[i].relX = parseInt(squares[i].x) - worldX;
      squares[i].relY = parseInt(squares[i].y) - worldY;
      squares[i].Update();
    }
  }

  for (var i = 0; i < enemies.length; i++){
      enemies[i].relX = parseInt(enemies[i].x) - worldX;
      enemies[i].relY = parseInt(enemies[i].y) - worldY;
      enemies[i].UpdateEnemy();
  }
}


window.addEventListener('load', function() {
  loaded = true;
})