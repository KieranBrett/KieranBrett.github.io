// BULLET CONSTS
const BULLETWIDTH = 10;
const BULLETHEIGHT = 5;
const BULLETVELOCITY = 15;
const FIRERATE = 7;
const BULLETSPREAD = 10;
const BULLETDMG = 20;
const GUNPOS = 110;

let gunTickCount;

class Gun {
    constructor(enemy, playerX, playerY) {
      this.bullets = [];
      this.gunRight = loadImage("assets/images/gun-rifle-right.png");
      this.gunRightFlash = loadImage("assets/images/gun-rifle-right-flash.png");
  
      this.gunLeft = loadImage("assets/images/gun-rifle-left.png");
      this.gunLeftFlash = loadImage("assets/images/gun-rifle-left-flash.png");
      this.gunY = playerX;
      this.gunX = playerY;

      this.enemyGun = enemy;
      this.direction = 1;
      this.shooting;
    }
  
    shoot() {
      this.shooting = true;
      if (this.direction == 1) {
        this.bullets.push(
          new Bullet(
            this.gunX + PLAYERWIDTH / 2 + this.gunRight.width + 24,
            this.gunY + (GUNPOS + 13) + random(-BULLETSPREAD, BULLETSPREAD),
            this.direction
          )
        );
      } else {
        this.bullets.push(
          new Bullet(
            this.gunX + PLAYERWIDTH / 2 - this.gunLeft.width - 24,
            this.gunY + (GUNPOS + 13) + random(-BULLETSPREAD, BULLETSPREAD),
            this.direction
          )
        );
      }
    }
  
    update(x, y) {

      

      this.gunX = x;
      this.gunY = y;

      for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update();
  
        if (
          this.bullets[i].posX > WIDTH ||
          parseInt(this.bullets[i].posX) + BULLETWIDTH < 0
        ) {
          this.bullets.splice(i, 1);
        } else { // If bullet is on screen

          for (var s = 0; s < squares.length; s++) {
            if (
              this.bullets[i].posX + BULLETWIDTH >= squares[s].relX &&
              this.bullets[i].posX <= squares[s].relX + squares[s].picture.width
            ) {
              if (
                this.bullets[i].posY >= squares[s].y &&
                this.bullets[i].posY <=
                  parseInt(squares[s].y) + squares[s].picture.height
              ) {
                this.bullets.splice(i, 1);
  
                if (squares[s].breakable && !this.enemyGun) {
                  squares[s].health -= BULLETDMG;
                  
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
                this.bullets[i].posX + BULLETWIDTH >= enemies[e].relX && this.bullets[i].posX <= enemies[e].relX + enemies[e].picture.width
              ) {
  
                if (
                  this.bullets[i].posY + BULLETHEIGHT >= enemies[e].relY &&this.bullets[i].posY <= parseInt(enemies[e].relY) + enemies[e].picture.height
                ) {
                  enemies[e].health -= BULLETDMG;
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
            if (this.bullets[i].posY + BULLETHEIGHT > player.playerY && this.bullets[i].posY <= player.playerY + PLAYERHEIGHT){
              if (this.bullets[i].posX + BULLETWIDTH >= player.playerX && this.bullets[i].posX <= player.playerX + PLAYERWIDTH){
                player.playerHealth -= (BULLETDMG / 2);
                this.bullets.splice(i, 1);

                if (player.playerHealth < 0){
                  gameOver = true;
                }
              }
            }
          }
        }
      }
  
      if (this.direction == 1) {
        image(this.gunRight, this.gunX + PLAYERWIDTH / 2, this.gunY + GUNPOS);
        if (this.shooting) {
          image(
            this.gunRightFlash,
            this.gunX + (PLAYERWIDTH / 2 + this.gunRight.width),
            this.gunY + (GUNPOS + 5)
          );
        }
      } else {
        image(
          this.gunLeft,
          this.gunX + PLAYERWIDTH / 2 - this.gunLeft.width,
          this.gunY + GUNPOS
        );
        if (this.shooting) {
          image(
            this.gunLeftFlash,
            this.gunX +
              (PLAYERWIDTH / 2 - this.gunLeft.width - this.gunLeftFlash.width),
            this.gunY + (GUNPOS + 5)
          );
        }
      }

      this.shooting = false;
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