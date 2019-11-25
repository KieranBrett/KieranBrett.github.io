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

let loaded;

// LOADING OBJECTS

function setup() {
  loaded = false;
  canvas = createCanvas(WIDTH, HEIGHT);

  player = new Player(STARTX, STARTY, 200);

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
  if (loaded){
    if (player.playerHealth > 0){
      clear();
  
    drawBackground();
    
    drawObjects();
    drops.updateDrops();
    player.updatePlayer();
    drawForeground();
  
    }
    else{
      endGameFade();
    }
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