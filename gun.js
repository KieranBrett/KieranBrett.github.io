// BULLET CONSTS
const BULLETWIDTH = 10;
const BULLETHEIGHT = 5;
const BULLETVELOCITY = 15;
const FIRERATE = 7;
const BULLETSPREAD = 10;
const BULLETDMG = 20;
const GUNPOS = 70;

let gunTickCount;

class GunController {
    constructor(enemy, playerX, playerY, gun) {
      this.bullets = [];
      this.gunRight = loadImage(gun.gunRight);
      this.gunLeft = loadImage(gun.gunLeft);
      this.bulletRight = loadImage(gun.bulletRight);
      this.bulletLeft = loadImage(gun.bulletLeft);
      this.gunRightFlash = loadImage("assets/images/gun-rifle-right-flash.png");
      this.gunLeftFlash = loadImage("assets/images/gun-rifle-left-flash.png");
      this.gunY = playerY;
      this.gunX = playerX;
      this.relX;
      this.relY;

      this.gunName = gun.gunName;
      this.bulletWidth = gun.bulletWidth;
      this.bulletHeight = gun.bulletHeight;
      this.bulletVel = gun.bulletVel;
      this.fireRate = gun.fireRate;
      this.bulletSpread = gun.bulletSpread;
      this.bulletDmg = gun.bulletDmg;
      this.gunOffset = gun.gunOffset;

      this.enemyGun = enemy;
      this.direction = 1;
      this.shooting;


      this.dropped;
      this.bobbed = false;
      this.yBob = 0;
      this.canBePicked;
      this.dropCount = 0;
    }
  
    shoot() {
      this.shooting = true;
      if (this.direction == 1) {
        this.bullets.push(
          new Bullet(
            this.gunX + worldX + PLAYERWIDTH / 2 + this.gunRight.width - this.gunOffset,
            this.gunY + worldY + (GUNPOS + 13) + random(-this.bulletSpread, this.bulletSpread),
            this.direction,
            this.bulletRight,
            this.bulletVel
          )
        );
      } else {
        this.bullets.push(
          new Bullet(
            this.gunX + worldX + PLAYERWIDTH / 2 - this.gunLeft.width + this.gunOffset,
            this.gunY + worldY + (GUNPOS + 13) + random(-this.bulletSpread, this.bulletSpread),
            this.direction,
            this.bulletLeft,
            this.bulletVel
          )
        );
      }
    }
  
    update() {

      if (!this.dropped){
        if (this.direction == 1) {
          image(this.gunRight, this.gunX + PLAYERWIDTH / 2 - this.gunOffset, this.gunY + GUNPOS);
        } else {
          image( this.gunLeft, this.gunX + PLAYERWIDTH / 2 - this.gunLeft.width + this.gunOffset, this.gunY + GUNPOS);
        }
  
  
        for (var i = 0; i < this.bullets.length; i++) {
  
          this.bullets[i].relY = parseInt(this.bullets[i].posY) - worldY;
          this.bullets[i].relX = parseInt(this.bullets[i].posX) - worldX;
          this.bullets[i].update();
  
          
    
          if (
            this.bullets[i].relX > WIDTH ||
            parseInt(this.bullets[i].relX) + this.bulletWidth < 0
          ) {
            this.bullets.splice(i, 1);
          } else { // If bullet is on screen
  
            for (var s = 0; s < squares.length; s++) {
              if (
                parseInt(this.bullets[i].relX) + this.bullets[i].image.width >= squares[s].relX &&
                this.bullets[i].relX <= parseInt(squares[s].relX) + squares[s].picture.width
              ) {
                if (
                  this.bullets[i].relY >= squares[s].relY &&
                  this.bullets[i].relY <=
                    parseInt(squares[s].relY) + squares[s].picture.height
                ) {
                  this.bullets.splice(i, 1);
    
                  if (squares[s].breakable && !this.enemyGun) {
                    squares[s].health -= this.bulletDmg;
                    
                    if (squares[s].health <= 0) {
                      squares.splice(s, 1);
                    }
                    else{
                      squares[s].healthBarCount = 0;
                      squares[s].damaged = true;
                    }
                  }
                  return;
                }
              }
            } // Massive for loop checking each square
  
            if (!this.enemyGun){ // Checking enemy hit
              for (var e = 0; e < enemies.length; e++){
                if (
                  this.bullets[i].relX + this.bullets[i].image.width >= enemies[e].relX && this.bullets[i].relX <= enemies[e].relX + enemies[e].picture.width
                ) {
                  
    
                  if (
                    this.bullets[i].relY + this.bullets[i].image.height >= enemies[e].relY &&this.bullets[i].relY <= parseInt(enemies[e].relY) + enemies[e].picture.height
                  ) {
                    enemies[e].health -= this.bulletDmg;
                    this.bullets.splice(i, 1);
    
                    if (enemies[e].health <= 0){ // if enemy is dead
                      drops.drop(parseInt(enemies[e].x), enemies[e].y, COINVALUE, enemies[e].picture.height, enemies[e].picture.width);
                      enemies.splice(e, 1);
                    }
                    else{
                      enemies[e].healthBarCount = 0;
                      enemies[e].damaged = true;
                    }
    
                    return;
                  }
                }
              }
            }
            else{ // checking player hit
              if (this.bullets[i].relY + this.bullets[i].image.height > player.playerY && this.bullets[i].relY <= player.playerY + PLAYERHEIGHT){
                if (this.bullets[i].relX + this.bullets[i].image.width >= player.playerX && this.bullets[i].relX <= player.playerX + PLAYERWIDTH){
                  player.playerHealth -= this.bulletDmg;
                  this.bullets.splice(i, 1);
  
                  if (player.playerHealth < 0){
                    gameOver = true;
                  }
                }
              }
            }
          }
        }

        this.shooting = false;
      }
      else{ // IF IT IS DROPPED
        if (this.direction == 1) {
          image(this.gunRight, this.relX + PLAYERWIDTH / 2 - this.gunOffset, this.relY + GUNPOS + this.yBob);
        } else {
          image( this.gunLeft, this.relX + PLAYERWIDTH / 2 - this.gunLeft.width + this.gunOffset, this.relY + GUNPOS + this.yBob);
        }

        if (!this.bobbed){
          this.yBob++;
        }
        else{
            this.yBob--;
        }

        if (this.yBob > BOBHEIGHT){
            this.bobbed = true;
        }
        else if (this.yBob < -BOBHEIGHT){
            this.bobbed = false;
        }
      }
    }

    dropGun(playerX, playerY) {
      this.canBePicked = false;
      this.dropped = true;
      this.dropCount = 0;
      this.gunX = playerX + worldX;
      this.gunY = playerY + worldY;
    }
  }

  class Bullet {
    constructor(posX, posY, direction, image, bulletVel) {
      this.posX = posX;
      this.posY = posY;
      this.direction = direction;
      this.image = image;
      this.vel = bulletVel

      this.relX;
      this.relY;
    }
  
    update(bulletVel) {
      fill(230, 190, 20); // Drawing before updating so we can see the bullet before it is moved
      // rect(this.posX - bulletWidth / 2, this.posY, bulletWidth, bulletHeight);
      image(this.image,this.relX - this.image.width / 2, this.relY)
      // console.log(this.image)
  
      if (this.direction == 1) {
        this.posX += this.vel;
      } else {
        this.posX -= this.vel;
      }
    }
  }

  class Gun{
    constructor(bulletVel, fireRate, bulletSpread, bulletDmg, gunLeft, gunRight, bulletRight, bulletLeft, gunOffset, gunName){
      this.bulletLeft = bulletLeft;
      this.bulletRight = bulletRight;

      this.bulletVel = bulletVel;
      this.fireRate = fireRate;
      this.bulletSpread = bulletSpread;
      this.bulletDmg = bulletDmg;
      this.gunLeft = gunLeft;
      this.gunRight = gunRight;
      this.gunOffset = gunOffset;
      this.gunName = gunName;
    }
  }