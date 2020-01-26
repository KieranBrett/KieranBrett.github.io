class Lane{
    constructor(letter, x){
        this.x = x;
        this.letter = letter;
        this.available = true;

        this.strings = []
        this.laneTripped = false;
    }

    update(){
        for (let i = this.strings.length - 1; i >= 0; i--){
            this.strings[i].update();

            if (this.strings[i].getY() > windowHeight){
                this.strings.splice(i, 1);
            }
          }

          // If there is a string
          if (this.strings.length != 0){
            switch(this.letter){
                case ";":
                case " ":
                    // Normal Strings
                    break;
    
                default:
                    if (this.strings[0].y > (windowHeight / 2) + (fontSize / 2) && !this.laneTripped){

                        letters.push(new Letters(this.letter, this.x, (windowHeight / 2) + (fontSize / 2)))

                        // this.strings[0].characters[0].letter = " "

                        this.strings[0].characters.splice(0, 1);
                        this.strings[0].y -= fontSize;

                        this.laneTripped = true;
                    }
                    break;
            }
          }
          else{
              this.available = true;
          }
        

    }

    spawnString(){
        this.strings.push(new TextString(this.letter, this.x))
        if (random(100) < STARRATE){
            this.strings[this.strings.length - 1].characters[0].bright = true;
        }
    }

    updateCharacters(){
        for (let i = 0; i < this.strings.length; i++){
            this.strings[i].updateCharacters();
        }
    }
}