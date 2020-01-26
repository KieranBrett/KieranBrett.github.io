class Character{
    constructor(letter){
      this.letter = letter;
      this.bright = false;
      this.flipped = false;
    }
    
    update(){
      this.letter = characters[parseInt(random(0, characters.length))]
    }
  }
  