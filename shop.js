let shopping = false;
let shopButtons = [];
let shopBack;
let coins;

let exitShop;
const EXITX = 1250;
const EXITY = 600;


function showShop(nextLevel){
    // if (shopping != nextLevel){
    //     shopping = nextLevel;
    // }

    textSize(30)
    text(`Your Balance: ${player.score}`, 280, 180)

    image(shopBack, 175, 200)
    let fieldText;
    let value;

    for (var i = 0; i < GUNFIELDS; i++){
        switch (i){
            case 0:
                fieldText = "Bullet Velocity"
                value = 80;
                break;
            
            case 1:
                fieldText = "Fire Rate"
                value = 100;
                break;
    
            case 2:
                fieldText = "Bullet Damage"
                value = 70;
                break;
            
            case 3:
                fieldText = "Bullet Spread"
                value = 50;
                break;
        }


        let textX = (GUNNEGX + ((GUNPOSX - GUNNEGX) / 2)) - textWidth(text);
        let textY = BUTTONYSTART + 30 + (i * BUTTONGAP);
        fill(255,255,255)
        textSize(20)
        text(fieldText, GUNPOSX + 75, textY)
        image(coins, GUNPOSX + 250, textY - 25);
        text(value, GUNPOSX + 300, textY);
    }

    shopButtons.forEach(b => {
        b.draw();
    })

    image(exitShop, EXITX, EXITY)

    return shopping;
}

const UPGRADEAMMOUNT = 2;
const BULLETUPGRADE = 5;

function checkClick(x, y){
    console.log(x)
    
    shopButtons.forEach(s => {
        if (s.x < x && s.x + s.image.width > x &&
            s.y < y && s.y + s.image.height > y){
                console.log(`Button click ${s.fieldIndex}`)

                if (player.score >= s.cost){
                    player.score -= s.cost / 2;
                }

                switch(s.fieldIndex){
                    case 0:
                    if (s.positive){
                        player.inventory[player.inventoryIndex].bulletVel += UPGRADEAMMOUNT;
                    }
                    else{
                        player.inventory[player.inventoryIndex].bulletVel -= UPGRADEAMMOUNT;
                    }
                    break;
            
                case 1:
                    if (s.positive){
                        player.inventory[player.inventoryIndex].fireRate -= 1;
                    }
                    else{
                        player.inventory[player.inventoryIndex].fireRate += 1;
                    }
                    break;
    
                case 2:
                    if (s.positive){
                        player.inventory[player.inventoryIndex].bulletDmg += BULLETUPGRADE;
                    }
                    else{
                        player.inventory[player.inventoryIndex].bulletDmg -= BULLETUPGRADE;
                    }
                    break;
            
                case 3:
                    if (s.positive){
                        player.inventory[player.inventoryIndex].bulletSpread += UPGRADEAMMOUNT;
                    }
                    else{
                        player.inventory[player.inventoryIndex].bulletSpread -= UPGRADEAMMOUNT;
                    }
                    break;
                }

                return;
            }
    })

    if (x > EXITX && x < EXITX + exitShop.width &&
        y > EXITY && y < EXITY + exitShop.height){
            console.log("exit shop");
            shopping = false;
        }
}

const GUNFIELDS = 4;

const BUTTONGAP = 75;
const GUNNEGX = 200;
const GUNPOSX = 275;
const BUTTONYSTART = 300;

function createButtons(){

    let fieldText;
    let minus;
    let positive;
    let value;

    for (var i = 0; i < GUNFIELDS; i++){
        switch (i){
            case 0:
                fieldText = "Bullet Velocity"
                minus = false;
                positive = true;
                value = 80;
                break;
            
            case 1:
                fieldText = "Fire Rate"
                minus = false;
                positive = true;
                value = 100;
                break;
    
            case 2:
                fieldText = "Bullet Damage"
                minus = false;
                positive = true;
                value = 70;
                break;
            
            case 3:
                fieldText = "Bullet Spread"
                minus = true;
                positive = true;
                value = 50;
                break;
        }
    
        if (minus){
            shopButtons.push(new Buttons(GUNNEGX, BUTTONYSTART + (i * BUTTONGAP), i, value, false))
        }
        if (positive){
            shopButtons.push(new Buttons(GUNPOSX, BUTTONYSTART + (i * BUTTONGAP), i, value, true))
        }
        let textX = (GUNNEGX + ((GUNPOSX - GUNNEGX) / 2)) - textWidth(text);
        let textY = BUTTONYSTART + (i * BUTTONGAP);
        text(fieldText, textX, textY)
    }
}

class Buttons{
    constructor(x, y, fieldIndex, cost, positive){
        this.x = x;
        this.y = y;
        this.fieldIndex = fieldIndex;
        this.cost = cost;
        this.positive = positive;
        this.positiveImage = loadImage("assets/images/shop-plus.png");
        this.negativeImage = loadImage("assets/images/shop-minus.png");
        this.image;

        this.setUpButton();
    }
    
    setUpButton(){
        if (this.positive == true){
            this.image = this.positiveImage;
        }
        else{
            this.image = this.negativeImage;
        }
    }

    draw(){
        
        image(this.image, this.x, this.y);
    }
}