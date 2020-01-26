class Character{
    constructor(letter){
      this.letter = letter;
      this.bright = false;
      this.flipped = false;
      
    this.r = R + random(CHARCOLOUROFFSET);
    this.g = G - random(CHARCOLOUROFFSET);
    this.b = B + random(CHARCOLOUROFFSET)
    
    }
    
    update(){
      this.letter = characters[parseInt(random(0, characters.length))]
    }
  }
  