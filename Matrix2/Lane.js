class Lane{
    constructor(letter, x){
        this.x = x;
        this.letter = letter;
        this.available;

        this.strings = []
    }

    update(){
        for (let i = this.strings.length - 1; i >= 0; i--){
            this.strings[i].update();

            if (this.strings[i].getY() > windowHeight){
                this.strings.splice(i, 1);
            }
          }

          if (this.strings.length < 1){
              this.available = true;
          }
          else{
              this.available = false;
          }

    }

    spawnString(){
        this.strings.push(new TextString(this.letter, this.x))
    }

    updateCharacters(){
        for (let i = 0; i < this.strings.length; i++){
            this.strings[i].updateCharacters();
        }
    }
}