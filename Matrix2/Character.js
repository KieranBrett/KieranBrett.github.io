class Character{
    constructor(letter){
      this.letter = letter;
    }
    
    update(){
      this.letter = characters[parseInt(random(0, characters.length))]
    }
  }
  