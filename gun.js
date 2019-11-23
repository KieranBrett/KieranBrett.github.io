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
  
                if (squares[s].breakable) {
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

          for (var e = 0; e < enemies.length; e++){
            if (
              this.bullets[i].posX + BULLETWIDTH >= enemies[e].relX && this.bullets[i].posX <= enemies[e].relX + enemies[e].picture.width
            ) {

              if (
                this.bullets[i].posY >= enemies[e].y &&this.bullets[i].posY <= parseInt(enemies[e].y) + enemies[e].picture.height
              ) {
                enemies[e].health -= BULLETDMG;
                this.bullets.splice(i, 1);

                if (enemies[e].health <= 0){
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