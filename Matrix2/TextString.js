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
        if (random(100) < CHANCEOFFLIPPED){
          this.characters[this.characters.length - 1].flipped = true;
        }
      }
    }
    
    update(){
  
      for (let i = 0; i < this.characters.length; i++){

        if (i == 0){ // Only first characters can be bright
          if (this.characters[i].bright){ // Makes character bright
            push()
          fill(STARR,STARG,STARB)
          text(this.characters[i].letter, this.x, this.y - (i * fontSize))
          pop()
          }
        }
        else{
          if (this.characters[i].flipped){ // Flips character
            push()
            translate(this.x, this.y - (i * fontSize))
            var s = map(0,0,width,-1,1);
            scale(s,1);
            text(this.characters[i].letter, 0, 0)
            pop()
          }
          else{ // Normal Character
            text(this.characters[i].letter, this.x, this.y - (i * fontSize))
          }
          
        }
        
  
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