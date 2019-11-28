
const LETTERSPEED = 5;
const PAUSESENTENCE = 100;
const SUBTITLEHEIGHT = 200;
let textShowing = false;

function updateText(){
    fill(255, 255, 255)
    textStyle(BOLD)

    for (var i =0; i < tips.length; i++){
        tips[i].relX = parseInt(tips[i].x) - worldX;

        if (!textShowing){
            if (player.playerX > tips[i].relX && tips[i].drawing == false){ // If player trips tip  
                tips[i].drawing = true;
                textShowing = true;

                // return;
            }
            else{

            }
        }
        else{ // If no text showing

        }

        if (tips[i].drawing == true){
            tips[i].drawText(i);
        }
    }
}

class CheckPoints {
    constructor(x, tipName){
        this.x = x;
        this.relX;
        this.tipName = tipName;
        this.textDone = false;
        this.textCount = 0;
        this.charIndex = 0;
        this.stringIndex = 0;
        this.timerDone = false;
        this.timerCount = 0;
        this.drawing = false;

    }

    drawText(i){
        if (!this.timerDone){
            if (!this.textDone){
                this.textCount++;
                if (this.textCount > LETTERSPEED){
                    this.textCount = 0;
                    
                    this.charIndex++;
                    if (this.charIndex > introStrings[`${this.tipName}`].length){
                        
                        console.log(this.tipName);
                            this.textDone = true;
                            this.stringIndex--;
                        // this.stringIndex++;
                        // if (this.stringIndex >= introStrings[`${this.tipName}`].length){
                            
                        // }
                        // else{
                        //     this.charIndex = 0;
                        // }
                    }
                }
                    let textWid = textWidth(introStrings[`${this.tipName}`].substring(0, this.charIndex))
                    text(`${introStrings[`${this.tipName}`].substring(0, this.charIndex)}`, 800 - (textWid / 2), SUBTITLEHEIGHT)
            }
            else{
                this.timerCount++;
                if (this.timerCount >= PAUSESENTENCE){
                    this.timerDone = true;

                    textShowing = false;
                }

                let textWid = textWidth(introStrings[`${this.tipName}`].substring(0, this.charIndex))
                text(`${introStrings[`${this.tipName}`].substring(0, this.charIndex)}`, 800 - (textWid / 2), SUBTITLEHEIGHT)
            }
        }
    }
}

let tips = [];