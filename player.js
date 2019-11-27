// PLAYER CONSTANTS
const STEPSIZE = 10;
const SPRINTMULTIPLIER = 1.5;
const VELMAX = -30;


const JUMPFORCE = 29;
const GRAVITYFORCE = -2;
const PLAYERHEIGHT = 200;
const PLAYERWIDTH = 100;
const FRAMEXMOVESIZE = 550;
const FRAMEYMOVESIZE = 150;

class Player {
  constructor(playerX, playerY, playerHealth, gunIndex){
    this.playerHealth = playerHealth;
    this.startHealth = playerHealth;
    this.playerX = playerX;
    this.playerY = playerY;

    this.moving = false;
    this.jumping = false;
    this.shooting = false;
    this.sprinting = false;
    this.doubleJumped = false;

    this.doubleJumped = false;
    this.yVelocity = 0;
    this.direction = 1;
    this.inventory = [];
    this.inventoryIndex;
    this.gunIndex = gunIndex;
    this.inventory.push(new GunController(false, this.playerX, this.playerY, guns[gunIndex]));
    this.inventory.push(new GunController(false, this.playerX, this.playerY, guns[0]));
    

    this.playerPic;
    this.effectiveStep = STEPSIZE;
    this.score = 0;
    this.inventoryIndex = 0;
    
  }

movementUpdate() {
    if (this.sprinting === true){
      this.effectiveStep = STEPSIZE * SPRINTMULTIPLIER;
    }
    else{
      this.effectiveStep = STEPSIZE;
    }
  
    if (this.moving) {
      this.movePlayer();
    }
  
    this.playerY -= this.yVelocity;

    if (this.yVelocity <= VELMAX){
      this.yVelocity = VELMAX;
    }
    else{
      this.yVelocity += GRAVITYFORCE;
    }
  
    for (var i = 0; i < squares.length; i++) {
      if ( // if inside of a box
        this.playerY + PLAYERHEIGHT >= squares[i].relY &&
        this.playerX + PLAYERWIDTH >= squares[i].relX &&
        this.playerX <= squares[i].relX + squares[i].picture.width &&
        this.playerY <= parseInt(squares[i].relY) + squares[i].picture.height
      ) {

        if (
          this.playerY + PLAYERHEIGHT >=
            parseInt(squares[i].relY) + squares[i].picture.height &&
            this.jumping == true
        ) { // if under the box
          this.yVelocity = 0;
          this.playerY = parseInt(squares[i].relY) + squares[i].picture.height + 1;
        } else {
          this.playerY = squares[i].relY - PLAYERHEIGHT;
          this.jumping = false;
          this.doubleJumped = false;
          this.yVelocity = 0;
        }
      }
    }
  
    if (this.playerY + PLAYERHEIGHT >= GRASSPOS) {
      // 500 is position of grass
      this.playerY = GRASSPOS - PLAYERHEIGHT;
      this.jumping = false;
      this.doubleJumped = false;
      worldY = 0;
    }

    // DO Y SCROLLING
    // If player is inside of a box, they cant move

    if (this.playerY < 0 + FRAMEYMOVESIZE){
      worldY -= this.yVelocity;
      this.playerY = 0 + FRAMEYMOVESIZE;
    }
    else if (parseInt(this.playerY) + PLAYERHEIGHT > 800 - FRAMEYMOVESIZE){
      if (worldY >= 0){
        worldY = 0;
      }
      else{
        worldY -= this.yVelocity;
        this.playerY = 800 - PLAYERHEIGHT - FRAMEYMOVESIZE;
      }
      
    }

  }

movePlayer() {
    let tempX;
    let canMove = true;
  
    if (this.direction === 0) {
      tempX = this.playerX - this.effectiveStep;
    } else {
      tempX = this.playerX + this.effectiveStep;
    }
  
    squares.forEach(s => {
      if (
        tempX + PLAYERWIDTH >= s.relX &&
        tempX <= parseInt(s.relX) + s.picture.width &&
        this.playerY + PLAYERHEIGHT > s.relY &&
        this.playerY <= parseInt(s.relY) + s.picture.height
      ) {
        canMove = false;
      }
    });
  
    if (canMove) {
      if (this.direction === 0) {
        // If left
  
        if (this.playerX <= FRAMEXMOVESIZE) {
          // moves background if player is too far to left or right
          backgroundx += this.effectiveStep * BACKMULTI;
          backGrassx += this.effectiveStep * MIDMULTI;
          foregroundGrassx += this.effectiveStep * FOREMULTI;
          worldX -= this.effectiveStep;
        } else {
          this.playerX -= this.effectiveStep;
        }
      } else {
        // if right
  
        if (this.playerX >= WIDTH - FRAMEXMOVESIZE - PLAYERHEIGHT) {
          backgroundx -= this.effectiveStep * BACKMULTI;
          backGrassx -= this.effectiveStep * MIDMULTI;
          foregroundGrassx -= this.effectiveStep * FOREMULTI;
          worldX += this.effectiveStep;
        } else {
          this.playerX += this.effectiveStep;
        }
      }
    }
  }

  updatePlayer() {
    this.movementUpdate(); // Includes jumping and checking boundaries
  
    // Draw Player
    fill(200, 20, 20);
    image(playerPic, this.playerX, this.playerY);
    this.inventory[this.inventoryIndex].update(this.playerX, this.playerY, PLAYERWIDTH, PLAYERHEIGHT);

    if (this.shooting) {
      if (gunTickCount >= this.inventory[this.inventoryIndex].fireRate) {
        this.inventory[this.inventoryIndex].shoot(this.playerX,this.playerY, PLAYERWIDTH, PLAYERHEIGHT);
        gunTickCount = 0;
      }
      else{
        gunTickCount++;
      }
    }
  

    fill(200, 20, 20);
    // Draw Hud
    image(playerHud, 1060, -20);

    // Health
    rect(1130, 111, 200, 10);
    fill(20, 200, 20);
    rect(1130, 111, this.playerHealth, 10);

    fill(255,255,255)
    text(`Score: ${this.score}`, 1130, 80)

    // DRAWING INVENTORY
    textSize(45)
    text(`Inventory`, 30, 60);
    textSize(30)

    for (var i = 0; i < 4; i++){
      if (this.inventory[i] != null){
        if (i == this.inventoryIndex){
          fill (255, 0, 0);
        }
        text(`${i + 1}. ${this.inventory[i].gunName}`, 30, 100 + (35 * i));
        fill (255,255,255)
      }
      else{
        text(`${i + 1}. Empty`, 30, 100 + (35 * i))
      }
    }

    
    // if (this.inventory[0] != null){
    //   if (0 == this.inventoryIndex){
    //     fill(200, 20, 20);
    //   }
    //   text(`1. ${this.inventory[0].gunName}`, 30, 100)
    //   fill(255,255,255);
    // }
    // else{
    //   text(`1. Empty`, 30, 100)
      
    // }

    // if (this.inventory[1] != null){
    //   if (1 == this.inventoryIndex){
    //     fill(200, 20, 20);
    //   }
    //   text(`2. ${this.inventory[1].gunName}`, 30, 135)
    //   fill(255,255,255);
    // }
    // else{
    //   text(`2. Empty`, 30, 135)
    // }

    // if (this.inventory[2] != null){
    //   if (2 == this.inventoryIndex){
    //     fill(200, 20, 20);
    //   }
    //   text(`3. ${this.inventory[2].gunName}`, 30, 170)
    //   fill(255,255,255);
    // }
    // else{
    //   text(`3. Empty`, 30, 170)
    // }

    // if (this.inventory[3] != null){
    //   if (3 == this.inventoryIndex){
    //     fill(200, 20, 20);
    //   }
    //   text(`4. ${this.inventory[3].gunName}`, 30, 205)
    //   fill(255,255,255);
    // }
    // else{
    //   text(`4. Empty`, 30, 205)
    // }
    
  }
}