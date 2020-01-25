const TESTSTR = `THE MATRIX`
const TEXTSPEED = 25;
const STRPAD = 3; // Ammount of blank spaces on either side of string

let characters = ['ﾊ', 'ﾐ',
                  'ﾋ', 'ｳ',
                  'ｼ', 'ﾅ', 'ﾓ',
                  'ｻ', 'ﾜ',
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

let strController;
let fontSize;
let letters;
let charUpdate;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  textAlign(CENTER);
  stroke(0, 255, 0);
  strokeWeight(5)

  fontSize = windowWidth / (TESTSTR.length + STRPAD);
  charUpdate = TESTSTR.length
  strController = new StringController(TESTSTR);
  letters = [];

  fill(40,220,30)
}

function draw() {
  background(10, 160); // adds motion blur effect

  strController.update();

  for (let i = 0; i < letters.length; i++){
    letters[i].update();
  }
}

class Letters{
  constructor(letter, x, y){
    this.letter = letter;
    this.x = x;
    this.y = y;
  }
  update(){
    text(this.letter, this.x, this.y)
    
  }
}