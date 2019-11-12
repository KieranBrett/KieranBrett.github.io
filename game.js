
// SCENERY CONSTANT
const GRASSPOS = 520;

// PLAYER CONSTANTS
const STEPSIZE = 10;
const JUMPFORCE = 50;
const GRAVITYFORCE = -6;
const PLAYERHEIGHT = 200;
const PLAYERWIDTH = 100;

// Images
const BACKMULTI = .85;
let backgroundPic;
let backgroundx;

const MIDMULTI = .8;
let backGrass;
let backGrassx;

const FOREMULTI = .05;
let foregroundGrass;
let foregroundGrassx;

// BULLET CONSTS
const BULLETWIDTH = 20;
const BULLETHEIGHT = 10;
const BULLETVELOCITY = 60;

// Player fields
let playerX;
let playerY;
let moving;
let jumping;
let shooting;
let yVelocity;
let direction; // 0 = left, 1 = right;
let gun;

function setup() {
  canvas = createCanvas(1200, 600);

  backgroundPic = loadImage('assets/images/background-stars.png')
  backgroundx = 0;
  backGrass = loadImage('assets/images/background-grass.png')
  backGrassx = 0;
  foregroundGrass = loadImage('assets/images/foreground-grass-blurred.png')
  foregroundGrassx = 0;
  

  playerX = 600;
  playerY = 300;
  moving = false;
  jumping = true;
  shooting = false;
  yVelocity = 0;
  direction = -1;
  gun = new Gun();

  frameRate(30);
}

function draw() {
  clear();
  background(200);

  drawBackground();
  updatePlayer();
  drawForeground();

  gun.update();
}

function drawBackground() { // Background that will scroll foreverrrrrrrrr

  // BACKGROUND
  image(backgroundPic, backgroundx, 0)
  
  if (backgroundx <= 0){
    image(backgroundPic, backgroundx + 1200, 0) // Image width is 1200
  }
  else{
    image(backgroundPic, backgroundx - 1200, 0)
  }

  if (backgroundx >= 1200){
    backgroundx = 0;
  }
  else if (backgroundx <= -1200){
    backgroundx = 0;
  }


  // MIDGROUND
  image(backGrass, backGrassx, 400);

  if (backGrassx <= 0){
    image(backGrass, backGrassx + 1200, 400)
  }
  else{
    image(backGrass, backGrassx - 1200, 400)
  }

  if (backGrassx >= 1200){
    backGrassx = 0;
  }
  else if (backGrassx <= -1200){
    backGrassx = 0;
  }
}
function drawForeground(){
  fill(30, 129, 30);
  rect(0, GRASSPOS, 1200, 100);

  image(foregroundGrass, foregroundGrassx, 455);

  if (foregroundGrassx <= 0){
    image(foregroundGrass, foregroundGrassx + 1200, 460)
  }
  else{
    image(foregroundGrass, foregroundGrassx - 1200, 460)
  }

  if (backGrassx >= 1200){
    backGrassx = 0;
  }
  else if (backGrassx <= -1200){
    backGrassx = 0;
  }
}

function keyPressed() {

  if (keyCode == LEFT_ARROW) {
    moving = true;
    direction = 0;
  }
  else if (keyCode == RIGHT_ARROW) {
    moving = true;
    direction = 1;
  }
  else if (keyCode == UP_ARROW) {
    jumping = true;
    yVelocity = JUMPFORCE;
  }
  else if (keyCode == 32){
    shooting = true;
  }
}
function keyReleased() {
    if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) 
    moving = false;
    else if (keyCode == 32){ // Space bar
      shooting = false;
    }
}

function updatePlayer() {
  movementUpdate(); // Includes jumping and checking boundaries

  if (shooting){
    gun.shoot();
  }
  // Draw Player
  fill(200, 20, 20);
  rect(playerX, playerY, PLAYERWIDTH, PLAYERHEIGHT);
}

function movePlayer() {

  if (direction === 0) { // If left

    if (playerX <= 200){ // moves background if player is too far to left or right
      backgroundx += STEPSIZE * BACKMULTI;
      backGrassx += STEPSIZE * MIDMULTI;
      foregroundGrassx -= STEPSIZE * FOREMULTI;
    }
    else{
      playerX -= STEPSIZE;
    }

  }
  else { // if right

    if (playerX >= 1000 - PLAYERHEIGHT){
      backgroundx -= STEPSIZE * BACKMULTI;
      backGrassx -= STEPSIZE * MIDMULTI;
      foregroundGrassx += STEPSIZE * FOREMULTI;
    }
    else{
      playerX += STEPSIZE;
    }

  }
}
function movementUpdate() {
  if (moving) {
    movePlayer();
  }

  if (jumping) {
    playerY -= yVelocity;
    yVelocity += GRAVITYFORCE;
  }
  
  if (playerY + PLAYERHEIGHT >= GRASSPOS) { // 500 is position of grass
    playerY = GRASSPOS - PLAYERHEIGHT;
    jumping = false;
  }
}


class Gun {
  constructor() {
    this.bullets = [];
  }

  shoot(){
    this.bullets.push(new Bullet(playerX + (PLAYERWIDTH / 2), playerY + 20, direction));
  }

  update(){
    for (var i = 0; i < this.bullets.length; i++){
      this.bullets[i].update();

      if (this.bullets[i].posX > 1200 || this.bullets[i].posX + BULLETWIDTH < 0){
        this.bullets.splice(i, 1);
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
    rect(this.posX, this.posY, BULLETWIDTH, BULLETHEIGHT)

    if (this.direction == 1){
      this.posX += BULLETVELOCITY;
    }
    else{
      this.posX -= BULLETVELOCITY;
    }
  }

  
}