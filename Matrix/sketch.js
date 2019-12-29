const MINLENGTH = 3;
const MAXLENGTH = 15;
const MINTEXT = 5;
const MAXTEXT = 50

let characters = ['ﾊ', 'ﾐ',
                  'ﾋ', 'ｰ', 'ｳ',
                  'ｼ', 'ﾅ', 'ﾓ',
                  'ﾆ', 'ｻ', 'ﾜ',
                  'ﾂ', 'ｵ', 'ﾘ',
                  'ｱ', 'ﾎ', 'ﾃ',
                 'ﾏ', 'ｹ', 'ﾒ',
                 'ｴ', 'ｶ', 'ｷ',
                 'ﾑ', 'ﾕ', 'ﾗ',
                 'ｾ', 'ﾈ', 'ｽ',
                 'ﾀ', 'ﾇ', 'ﾍ',
                 'ｦ', 'ｲ', 'ｸ',
                 'ｺ', 'ｿ', 'ﾁ',
                 'ﾄ', 'ﾉ', 'ﾌ',
                 'ﾔ', 'ﾖ', 'ﾙ',
                 'ﾚ', 'ﾝ']



let strings = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  fill(255, 60, 120);
}

function draw() {
  background(10, 100); // adds motion blur effect
  
  for (let i = strings.length - 1; i >= 0; i--){
    strings[i].update()
    
    if (strings[i].y - (strings[i].length * strings[i].textSize) > height){
      strings.splice(i, 1);
    }
  }
  
  // if (frameCount % 20 == 0){
  //   strings.push(new TextString());
  // }
  
  if (keyIsPressed === true){
    strings.push(new TextString());
  }
}

class TextString{
  constructor(){
    this.x = random(width)
    this.y = 0;
    
    this.textSize = random(MINTEXT, MAXTEXT);
    this.length = random(MINLENGTH, MAXLENGTH)
    this.textSpeed = parseInt(this.textSize * random(0.2, 0.3))
    // console.log(this.textSpeed);
    
    this.characters = [];
    
    for (let i = 0; i < this.length; i++){
      this.characters.push(new Character())
    }
  }
  
  update(){
    textSize(this.textSize)
    for (let i = 0; i < this.characters.length; i++){
      text(this.characters[i].character, this.x, this.y - (i * this.textSize))
      this.characters[i].update()
    }
    
    this.y += this.textSpeed;
    // console.log(this.textSpeed);
  }
}

class Character{
  constructor(){
    this.character = characters[parseInt(random(0, characters.length - 1))]
    
  }
  
  update(){
    if (random(20) < 5){
      this.character = characters[parseInt(random(0, characters.length - 1))]
    }
  }
}