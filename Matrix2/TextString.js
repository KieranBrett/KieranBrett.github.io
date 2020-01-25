class TextString{
    constructor(letter, x){
      this.letter = letter;
      this.length = random(2, 10)
      this.x = x;
      this.y = 0;
      
      this.enabled = true;
  
      this.characters = [];
  
      // for (let i = 0; i < this.letter.length; i++){
      //   this.characters.push(new Character(this.letter))
      // }
  
      for (let i = 0; i < this.length; i++){
        this.characters.push(new Character(characters[parseInt(random(0, characters.length))]))
      }
    }
    
    update(){
  
      for (let i = 0; i < this.characters.length; i++){
  
  
        text(this.characters[i].letter, this.x, this.y - (i * fontSize))
  
      }
      
      if (this.enabled)
      this.y += TEXTSPEED;
    }
  
    updateCharacters(){
      this.characters[parseInt(random(0, this.characters.length - 1))].update();
    }

    getY(){
      return this.y - (this.characters.length * fontSize);
    }
  }