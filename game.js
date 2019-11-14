const DOUBLEJUMP = true;
const WIDTH = 1600;
const HEIGHT = 800;

// SCENERY CONSTANT
const GRASSPOS = 720;
const GRASSOFFSET = 80;
const SHADOWOFFSET = 190;

// PLAYER CONSTANTS
const STEPSIZE = 10;
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

const GUNPOS = 100;

// BULLET CONSTS
const BULLETWIDTH = 10;
const BULLETHEIGHT = 5;
const BULLETVELOCITY = 15;
const FIRERATE = 4;
const BULLETSPREAD = 10;
const BULLETDMG = 30;
let gunTickCount;

// Player fields
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

// Level Objects
let squares = [];
let worldX;

const HEALTHBARHEIGHT = 10;
const HEALTHBARTIME = 200;

let frameRateTotal;
let frameRateCount;

// LOADING OBJECTS

fetch("assets/level1.json")
  .then(response => response.json())
  .then(data => {
    let objects = data;

    for (var i = 0; i < objects.boxes.length; i++) {
      squares.push(
        new Square(
          objects.boxes[i].positionX,
          objects.boxes[i].positionY,
          objects.boxes[i].imageurl,
          objects.boxes[i].drawn,
          objects.boxes[i].traversable,
          objects.boxes[i].breakable,
          objects.boxes[i].health
        )
      );
    }

    console.log(squares);
  });

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);

  playerPic = loadImage("assets/images/player-image.png");
  backgroundPic = loadImage("assets/images/background-stars.png");
  backgroundx = 0;
  backGrass = loadImage("assets/images/background-grass.png");
  backGrassx = 0;
  foregroundGrass = loadImage("assets/images/foreground-grass-blurred.png");
  foregroundGrassx = 0;
  foregroundHud = loadImage("assets/images/hud.png");

  playerX = 700;
  playerY = 700;
  moving = false;
  jumping = true;
  shooting = false;
  doubleJumped = false;
  yVelocity = 0;
  direction = 1;
  gun = new Gun();

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
  clear();

  drawBackground();
  updatePlayer();
  drawObjects();
  drawForeground();

  gun.update();

  if (gunTickCount >= FIRERATE) {
    gunTickCount = 0;
  } else {
    gunTickCount++;
  }
}

// Scenery Methods
function drawBackground() {
  // Background that will scroll foreverrrrrrrrr

  // BACKGROUND
  image(backgroundPic, backgroundx, 0);

  if (backgroundx <= 0) {
    image(backgroundPic, backgroundx + backgroundPic.width, 0); // Image width is 1200
  } else {
    image(backgroundPic, backgroundx - backgroundPic.width, 0);
  }

  if (backgroundx >= backgroundPic.width) {
    backgroundx = 0;
  } else if (backgroundx <= -backgroundPic.width) {
    backgroundx = 0;
  }

  // MIDGROUND
  image(backGrass, backGrassx, GRASSPOS - SHADOWOFFSET);

  if (backGrassx <= 0) {
    image(backGrass, backGrassx + backGrass.width, GRASSPOS - SHADOWOFFSET);
  } else {
    image(backGrass, backGrassx - backGrass.width, GRASSPOS - SHADOWOFFSET);
  }

  if (backGrassx >= backGrass.width) {
    backGrassx = 0;
  } else if (backGrassx <= -backGrass.width) {
    backGrassx = 0;
  }
}
function drawForeground() {
  fill(30, 129, 30);
  rect(0, GRASSPOS, 1200, 100);

  image(foregroundGrass, foregroundGrassx, GRASSPOS - GRASSOFFSET);

  if (foregroundGrassx <= 0) {
    image(
      foregroundGrass,
      foregroundGrassx + foregroundGrass.width,
      GRASSPOS - GRASSOFFSET
    );
  } else {
    image(
      foregroundGrass,
      foregroundGrassx - foregroundGrass.width,
      GRASSPOS - GRASSOFFSET
    );
  }

  if (foregroundGrassx >= foregroundGrass.width) {
    foregroundGrassx = 0;
  } else if (foregroundGrassx <= -foregroundGrass.width) {
    foregroundGrassx = 0;
  }

  frameRateTotal += frameRate();
  frameRateCount++;

  if (frameRateCount > 2000) {
    frameRateCount = 0;
    frameRateTotal = 0;
  }

  fill(color("white"));
  text(`World X : ${worldX}`, 50, 50);
  text(
    `Average FPS : ${(frameRateTotal / frameRateCount).toFixed(2)}`,
    50,
    100
  );
}

// Event Methods
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    moving = true;
    direction = 0;
  }

  if (keyCode == RIGHT_ARROW) {
    moving = true;
    direction = 1;
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
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) moving = false;
  else if (keyCode == 32) {
    // Space bar
    shooting = false;
  }
}

// Player Methods
function updatePlayer() {
  movementUpdate(); // Includes jumping and checking boundaries

  if (shooting) {
    if (gunTickCount >= FIRERATE) {
      gun.shoot();
    }
  }
  // Draw Player
  fill(200, 20, 20);
  image(playerPic, playerX, playerY);
}

function movePlayer() {
  let tempX;
  let canMove = true;

  if (direction === 0) {
    tempX = playerX - STEPSIZE;
  } else {
    tempX = playerX + STEPSIZE;
  }

  squares.forEach(s => {
    if (
      tempX + PLAYERWIDTH >= s.relX &&
      tempX <= parseInt(s.relX) + s.picture.width &&
      playerY + PLAYERHEIGHT > s.y &&
      playerY <= parseInt(s.y) + s.picture.height &&
      s.traversable == false &&
      s.drawn == true
    ) {
      canMove = false;
    }
  });

  if (canMove) {
    if (direction === 0) {
      // If left

      if (playerX <= FRAMEMOVESIZE) {
        // moves background if player is too far to left or right
        backgroundx += STEPSIZE * BACKMULTI;
        backGrassx += STEPSIZE * MIDMULTI;
        foregroundGrassx += STEPSIZE * FOREMULTI;
        worldX -= STEPSIZE;
      } else {
        playerX -= STEPSIZE;
      }
    } else {
      // if right

      if (playerX >= WIDTH - FRAMEMOVESIZE - PLAYERHEIGHT) {
        backgroundx -= STEPSIZE * BACKMULTI;
        backGrassx -= STEPSIZE * MIDMULTI;
        foregroundGrassx -= STEPSIZE * FOREMULTI;
        worldX += STEPSIZE;
      } else {
        playerX += STEPSIZE;
      }
    }
  }
}

function movementUpdate() {
  if (moving) {
    movePlayer();
  }

  playerY -= yVelocity;
  yVelocity += GRAVITYFORCE;

  for (var i = 0; i < squares.length; i++) {
    if (
      playerY + PLAYERHEIGHT >= squares[i].y &&
      playerX + PLAYERWIDTH >= squares[i].relX &&
      playerX <= squares[i].relX + squares[i].picture.width &&
      squares[i].traversable == false &&
      playerY <= parseInt(squares[i].y) + squares[i].picture.height &&
      squares[i].drawn == true
    ) {
      if (
        playerY + PLAYERHEIGHT >=
          parseInt(squares[i].y) + squares[i].picture.height &&
        jumping == true
      ) {
        console.log("under");
        yVelocity = 0;
        playerY = squares[i].y + squares[i].picture.height;
      } else {
        playerY = squares[i].y - PLAYERHEIGHT;
        jumping = false;
        doubleJumped = false;
        yVelocity = 0;
      }
    }
  }

  if (playerY + PLAYERHEIGHT >= GRASSPOS) {
    // 500 is position of grass
    playerY = GRASSPOS - PLAYERHEIGHT;
    jumping = false;
    doubleJumped = false;
  }
}

// Object Methods
function drawObjects() {
  fill(color(30, 90, 200));

  squares.forEach(s => {
    if (
      parseInt(s.x) + s.picture.width >= worldX &&
      s.x <= worldX + WIDTH &&
      s.drawn == true
    ) {
      s.relX = parseInt(s.x) - worldX;
      s.Update();
    }
  });
}

// Classes
class Gun {
  constructor() {
    this.bullets = [];
    this.gunRight = loadImage("assets/images/gun-rifle-right.png");
    this.gunRightFlash = loadImage("assets/images/gun-rifle-right-flash.png");

    this.gunLeft = loadImage("assets/images/gun-rifle-left.png");
    this.gunLeftFlash = loadImage("assets/images/gun-rifle-left-flash.png");
  }

  shoot() {
    if (direction == 1) {
      this.bullets.push(
        new Bullet(
          playerX + PLAYERWIDTH / 2 + this.gunRight.width + 24,
          playerY + (GUNPOS + 13) + random(-BULLETSPREAD, BULLETSPREAD),
          direction
        )
      );
    } else {
      this.bullets.push(
        new Bullet(
          playerX + PLAYERWIDTH / 2 - this.gunLeft.width - 24,
          playerY + (GUNPOS + 13) + random(-BULLETSPREAD, BULLETSPREAD),
          direction
        )
      );
    }
  }

  update() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();

      if (
        this.bullets[i].posX > WIDTH ||
        parseInt(this.bullets[i].posX) + BULLETWIDTH < 0
      ) {
        this.bullets.splice(i, 1);
      } else {
        for (var s = 0; s < squares.length; s++) {
          if (
            this.bullets[i].posX + BULLETWIDTH >= squares[s].relX &&
            this.bullets[i].posX <= squares[s].relX + squares[s].picture.width
          ) {
            if (
              this.bullets[i].posY >= squares[s].y &&
              this.bullets[i].posY <=
                parseInt(squares[s].y) + squares[s].picture.height &&
              squares[s].drawn == true
            ) {
              this.bullets.splice(i, 1);

              if (squares[s].breakable) {
                squares[s].health -= BULLETDMG;
                
                if (squares[s].health <= 0) {
                  squares[s].drawn = false;
                }

                squares[s].healthBarCount = 0;
                squares[s].damaged = true;
              }
              break;
            }
          }
        }
      }
    }

    if (direction == 1) {
      image(this.gunRight, playerX + PLAYERWIDTH / 2, playerY + GUNPOS);
      if (shooting) {
        image(
          this.gunRightFlash,
          playerX + (PLAYERWIDTH / 2 + this.gunRight.width),
          playerY + (GUNPOS + 5)
        );
      }
    } else {
      image(
        this.gunLeft,
        playerX + PLAYERWIDTH / 2 - this.gunLeft.width,
        playerY + GUNPOS
      );
      if (shooting) {
        image(
          this.gunLeftFlash,
          playerX +
            (PLAYERWIDTH / 2 - this.gunLeft.width - this.gunLeftFlash.width),
          playerY + (GUNPOS + 5)
        );
      }
    }
  }
}

class Bullet {
  constructor(posX, posY, direction) {
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  update() {
    fill(230, 190, 20); // Drawing before updating so we can see the bullet before it is moved
    rect(this.posX - BULLETWIDTH / 2, this.posY, BULLETWIDTH, BULLETHEIGHT);

    if (this.direction == 1) {
      this.posX += BULLETVELOCITY;
    } else {
      this.posX -= BULLETVELOCITY;
    }
  }
}

class Square {
  constructor(x, y, imageURL, status, traversable, breakable, health) {
    this.x = x;
    this.y = y;
    this.relX;
    this.relY;
    this.picture = loadImage(imageURL);
    this.drawn = status;
    this.traversable = traversable;
    this.breakable = breakable;
    this.startHealth = health;
    this.health = health;

    this.healthBarCount = 0;
    this.damaged = false;
  }

  drawSquare() {
    image(this.picture, parseInt(this.relX), this.y);
  }

  Update(){
    if (this.damaged){
      this.drawHealth();

      this.healthBarCount++;
      if (this.healthBarCount > HEALTHBARTIME){
        this.damaged = false;
        this.healthBarCount = 0;
      }
    }
    this.drawSquare();

  }

  drawHealth(){
    fill(0)
    rect((parseInt(this.relX) + (this.picture.width / 2) - (this.startHealth / 2) - 3),(this.y - 50) - 3, parseInt(this.startHealth) + 6, HEALTHBARHEIGHT + 6)

    fill(200, 20, 20);
    rect((parseInt(this.relX) + (this.picture.width / 2) - (this.startHealth / 2)),(this.y - 50), this.startHealth, HEALTHBARHEIGHT)

    fill (20, 200, 200)
    rect((parseInt(this.relX) + (this.picture.width / 2) - (this.startHealth / 2)),(this.y - 50), this.health, HEALTHBARHEIGHT)
    
    console.log("health");
  }
}
