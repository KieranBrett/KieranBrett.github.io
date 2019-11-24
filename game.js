const DOUBLEJUMP = true;
const WIDTH = 1600;
const HEIGHT = 800;
const RAYSTEP = 20;

// SCENERY CONSTANT
const GRASSPOS = 720;
const GRASSOFFSET = 80;
const SHADOWOFFSET = 190;

// PLAYER CONSTANTS
const STEPSIZE = 10;
const SPRINTMULTIPLIER = 1.5;


const JUMPFORCE = 40;
const GRAVITYFORCE = -4;
const PLAYERHEIGHT = 200;
const PLAYERWIDTH = 100;
const FRAMEMOVESIZE = 550;

// Images
const BACKMULTI = 0.75;
let backgroundPic;
let backgroundx;

const MIDMULTI = 0.85;
let backGrass;
let backGrassx;

const FOREMULTI = 0.4;
let foregroundGrass;
let foregroundGrassx;

let foregroundHud;
const foreGroundHudY = 800;

const GUNPOS = 110;

// BULLET CONSTS
const BULLETWIDTH = 10;
const BULLETHEIGHT = 5;
const BULLETVELOCITY = 15;
const FIRERATE = 7;
const BULLETSPREAD = 10;
const BULLETDMG = 20;
let gunTickCount;

// Player fields
let playerHealth;
let playerX;
let playerY;
let moving;
let jumping;
let doubleJumped;
let shooting;
let yVelocity;
let direction; // 0 = left, 1 = right;
let gun;
let playerPic;
let playerHud;
let effectiveStep;
let sprinting;

// Level Objects
let squares = [];
let scenery = [];
let enemies = [];

// let
let worldX;

const HEALTHBARHEIGHT = 10;
const HEALTHBARTIME = 200;

let frameRateTotal;
let frameRateCount;

let gameOver;
let overScreen;
let overCount;
let imageOpacity;

// LOADING OBJECTS

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);

  gameOver = false;
  squares = [];
  scenery = [];
  enemies = [];

  overScreen = loadImage("assets/images/gameOver.png");
  overDisplayed = false;
  imageOpacity = 0;
  overCount = 0;

  fetch("levels/level1/level1-objects.json")
  .then(response => response.json())
  .then(data => {
    let objects = data;

    for (var i = 0; i < objects.boxes.length; i++) {
      squares.push(
        new Barriers(
          objects.boxes[i].positionX,
          objects.boxes[i].positionY,
          objects.boxes[i].imageurl,
          objects.boxes[i].breakable,
          objects.boxes[i].health
        )
      );
    }

    console.log(squares);
  });

fetch("levels/level1/level1-scenery.json")
  .then(response => response.json())
  .then(data => {
    let objects = data;
    console.log(objects.scenery.length);

    for (var i = 0; i < objects.scenery.length; i++) {
      scenery.push(
        new Scenery(
          objects.scenery[i].positionX,
          objects.scenery[i].positionY,
          objects.scenery[i].imageurl,
        )
      );
    }

    console.log(scenery);
  });

fetch("levels/level1/level1-enemies.json")
  .then(response => response.json())
  .then(data => {
    let objects = data;
    console.log(objects.enemies.length);

    for (var i = 0; i < objects.enemies.length; i++) {
      enemies .push(
        new Enemy(
          objects.enemies[i].positionX,
          objects.enemies[i].positionY,
          objects.enemies[i].imageurl,
          objects.enemies[i].health,
          objects.enemies[i].speed,
          objects.enemies[i].fireRate
        )
      );
    }

    console.log(enemies);
  });

  playerPic = loadImage("assets/images/player-image.png");
  playerHud = loadImage("assets/images/hud.png");
  backgroundPic = loadImage("assets/images/background-stars.png");
  backgroundx = 0;
  backGrass = loadImage("assets/images/background-grass.png");
  backGrassx = 0;
  foregroundGrass = loadImage("assets/images/foreground-grass-blurred.png");
  foregroundGrassx = 0;
  foregroundHud = loadImage("assets/images/hud.png");

  playerHealth = 200;
  playerX = 300;
  playerY = 700;
  moving = false;
  jumping = true;
  shooting = false;
  doubleJumped = false;
  yVelocity = 0;
  direction = 1;
  gun = new Gun(false, playerX, playerY);
  sprinting = false;

  gunTickCount = 0;
  worldX = 0;
  frameRateTotal = 0;
  frameRateCount = 0;

  frameRate(75);
  textSize(30);
  noStroke();
}

// Main method
function draw() {
  if (playerHealth > 0){
    clear();

  drawBackground();
  
  drawObjects();
  updatePlayer();
  drawForeground();

  gun.update(playerX, playerY);
  }
  else{
    endGameFade();
  }
  
}

function endGameFade(){
  overCount++;
  if (overCount > 20){
    overCount = 0;
    imageOpacity++;
  }

  tint(255, imageOpacity);
  image(overScreen, 0, 0);
}

// Event Methods
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    moving = true;
    direction = 0;
    gun.direction = 0;
  }
  if (keyCode == RIGHT_ARROW) {
    moving = true;
    direction = 1;
    gun.direction = 1;
  }
  if (keyCode == UP_ARROW) {
    if (!jumping) {
      yVelocity = JUMPFORCE;
    } else {
      if (DOUBLEJUMP && !doubleJumped) {
        yVelocity = JUMPFORCE;
        doubleJumped = true;
      }
    }
    jumping = true;
  }
  if (keyCode == 32) {
    shooting = true;
    gunTickCount = FIRERATE;
  }
  if (keyCode == 16){
    sprinting = true;
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) moving = false;
  else if (keyCode == 32) {
    // Space bar
    shooting = false;
  }
  else if (keyCode == 16){
    sprinting = false;
  }
}

// Player Methods


// Object Methods
function drawObjects() {
  fill(color(30, 90, 200));

  for (var i = 0; i < scenery.length; i++){
    // if (
    //   parseInt(scenery[i].x) + scenery[i].picture.width >= worldX &&
    //   squares[i].x <= worldX + WIDTH
    // ) {
    //   // FIX THIS!!!
      
    // }
    
    scenery[i].relX = parseInt(scenery[i].x) - worldX;
      scenery[i].DrawScenery();
  }

  for (var i = 0; i < squares.length; i++){
    if (
      parseInt(squares[i].x) + squares[i].picture.width >= worldX &&
      squares[i].x <= worldX + WIDTH
    ) {
      squares[i].relX = parseInt(squares[i].x) - worldX;
      squares[i].Update();
    }
  }

  for (var i = 0; i < enemies.length; i++){
      enemies[i].relX = parseInt(enemies[i].x) - worldX;
      enemies[i].UpdateEnemy();
  }
}



