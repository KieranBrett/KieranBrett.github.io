const TESTSTR = `TUMEKE`
const TEXTSPEED = 12;

const STRPAD = 4; // Ammount of blank spaces on either side of string
const SPAWNRATE = 3;
const STARRATE = 60;

// Colour values sourced from https://www.schemecolor.com/matrix-code-green.php

//Normal Colours
const R = 0;
const G = 143;
const B = 17;

//Shooting Stars
const STARR = 120;
const STARG = 255;
const STARB = 120;


//MESSAGE Fade Colours
const LETTERR = 200;
const LETTERG = 255;
const LETTERB = 200;

//MESSAGE Static Colours
const STATICR = 0;
const STATICG = 255;
const STATICB = 0;

//Stroke Colours
const STROKER = 0;
const STROKEG = 59;
const STROKEB = 0;

const COLOURJUMP = 2; // Ammount colour skips

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
  sourceCanvas = createCanvas(windowWidth, windowHeight);
  sourceCanvas.id('p5sourceCanvas')
  frameRate(60);

  textAlign(CENTER);
  stroke(STROKER, STROKEG, STROKEB);
  strokeWeight(5)

  fontSize = windowWidth / (TESTSTR.length + STRPAD);
  charUpdate = TESTSTR.length
  strController = new StringController(TESTSTR);
  letters = [];

  fill(R, G, B)
}

function draw() {
  background(0, 100); // adds motion blur effect

  strController.update();

  for (let i = 0; i < letters.length; i++){
    push();
    
    letters[i].update();
    pop();
  }
}

class Letters{
  constructor(letter, x, y){
    this.letter = letter;
    this.x = x;
    this.y = y;


    // LETTERS COLOR
    this.r = LETTERR;
    this.g = LETTERG;
    this.b = LETTERB;
    this.rDes = true;
    this.gDes = true;
    this.bDes = true;
  }
  update(){
    fill(this.r, this.g, this.b)
    text(this.letter, this.x, this.y)
    
    if (this.rDes){
      this.r -= COLOURJUMP
      if (this.r <= STATICR){
        this.r = STATICR;
        this.rDes = false;
      }
    }

    if (this.gDes){
      this.g -= COLOURJUMP
      if (this.g <= STATICG){
        this.g = STATICG;
        this.gDes = false;
      }
    }

    if (this.bDes){
      this.b -= COLOURJUMP
      if (this.b <= STATICB){
        this.b = STATICB;
        this.bDes = false;
      }
    }


  }
}