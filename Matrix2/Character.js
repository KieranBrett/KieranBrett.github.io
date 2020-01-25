class Character{
    constructor(letter){
      this.letter = letter;
      this.bright = false;
    }
    
    update(){
      this.letter = characters[parseInt(random(0, characters.length))]
    }
  }
  