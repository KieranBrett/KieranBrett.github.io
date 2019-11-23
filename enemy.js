class Enemy {
    constructor(x, y, imgUrl, health, speed) {
        this.x = x;
        this.y = y;
        this.relX;
        this.relY;
        this.picture = loadImage(imgUrl);
        this.health = health;
        this.startHealth = health;
        this.speed = speed;
        this.direction = -1;
        this.healthBarCount = 0;
        this.damaged = false;
    }

    UpdateEnemy() {
        this.move()

        if (this.damaged){
            this.drawHealth();
            this.healthBarCount++;

            if (this.healthBarCount > HEALTHBARTIME){
                this.damaged = false;
                this.healthBarCount = 0;
            }
        }

        image(this.picture, this.relX, this.y)
    }

    move(){

        if (this.direction === -1){ // If Left
            this.x = parseInt(this.x) - this.speed;
        }
        else{
            this.x = parseInt(this.x) + parseInt(this.speed);
        }

        for (var i = 0; i < squares.length; i++){
            if (parseInt(this.x) + this.picture.width >= squares[i].x &&
            this.x <= parseInt(squares[i].x) + squares[i].picture.width){
                
                if (parseInt(this.x) <= parseInt(squares[i].x) + squares[i].picture.width && parseInt(this.x) + this.picture.width >= parseInt(squares[i].x) + squares[i].picture.width){
                    this.x = parseInt(squares[i].x) + squares[i].picture.width
                    this.direction *= -1;
                }
                else{
                    this.x = parseInt(squares[i].x) - this.picture.width
                    this.direction *= -1;
                }

                break;
            }
        }
    }

    drawHealth(){
        fill(0)
      // BLACK BACKGROUND
      rect((parseInt(this.relX) + (this.picture.width / 2) - (BARLENGTH / 2) - 3),(this.y - 50) - 3, parseInt(BARLENGTH) + 6, HEALTHBARHEIGHT + 6)
  
      // RED

      let ammount = (this.health / this.startHealth) * BARLENGTH;

      fill(200, 20, 20);
      rect((parseInt(this.relX) + (this.picture.width / 2) - (BARLENGTH / 2)),(this.y - 50), BARLENGTH, HEALTHBARHEIGHT)
  
      // GREEN
      fill (20, 200, 20)
      rect((parseInt(this.relX) + (this.picture.width / 2) - (BARLENGTH / 2)),(this.y - 50), ammount, HEALTHBARHEIGHT)
    }


}