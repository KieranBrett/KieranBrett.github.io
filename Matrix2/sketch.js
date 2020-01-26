const TESTSTR = `Welcome to the Matrix 2.0`

//Normal Colours
const R = 0;
const G = 143;
const B = 17;

//Shooting Stars
const STARR = 120;
const STARG = 255;
const STARB = 120;

// Characters
const CHARCOLOUROFFSET = 50
const VANISHONPASS = true; // if letters vanish when passing the message
const FLASHWHENHIT = false; // flashes a box around the letter when a piece of text hits it
const STRPAD = 8; // Ammount of blank spaces on either side of string
const SPAWNRATE = 3;
const STARRATE = 60;
const CHANCEOFFLIPPED = 40 // PERCENT OF CHANCE
const SWEEP = false; // If it rains or just falls once per lane

// Rain
const TEXTSPEED = 12;
const SPEEDVARY = 4;
const LENGTHMIN = 3;
const LENGTHMAX = 15;

//Stroke Colours
const STROKER = 0;
const STROKEG = 80;
const STROKEB = 0;

// Message
//MESSAGE Fade Colours
const LETTERR = 255;
const LETTERG = 255;
const LETTERB = 255;
const COLOURJUMP = 2; // Ammount colour updates every frame
//Static Colours
const STATICR = 150;
const STATICG = 255;
const STATICB = 150;
//MESSAGE Border
const BORDERR = 255;
const BORDERG = 255;
const BORDERB = 255;

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

let english = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
              'O','P','Q','R','S','T','U','V','W','X','Y','Z']

let englishNum = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
                'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3',
                '4','5','6','7','8','9','0']

let englishNumSymbol = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
                      'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3',
                      '4','5','6','7','8','9','0','!','@','#','$','%','^','&','*',
                      '(',')','_','+','=','-','[',']','}','{','}',':','>','<','.',
                      ',','/','?','"','|','\\', `~`]

let collection = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
                      'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3',
                      '4','5','6','7','8','9','0','!','@','#','$','%','^','&','*',
                      '(',')','_','+','=','-','[',']','}','{','}',':','>','<','.',
                      ',','/','?','"','|','\\', `~`, 'ﾊ', 'ﾐ', 'ﾋ', 'ｳ', 'ｼ', 'ﾅ', 
                      'ﾓ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ',  'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 
                      'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
                     'ｦ', 'ｲ', 'ｸ','ｺ', 'ｿ', 'ﾁ','ﾄ', 'ﾉ', 'ﾌ', 'ﾔ', 'ﾖ', 'ﾙ', 'ﾚ', 'ﾝ']  

let strController;
let fontSize;
let letters;
let charUpdate;
let goOnce;

let matrixFont;


function setup(message) {

  matrixFont = loadFont('WESTM.TTF')

  let string;
  if (message != null){
    string = message
    console.log(string)
  }
  else{
    string = TESTSTR
  }

  sourceCanvas = createCanvas(windowWidth, windowHeight);
  sourceCanvas.id('p5sourceCanvas')
  frameRate(60);

  textAlign(CENTER);
  stroke(STROKER, STROKEG, STROKEB);
  strokeWeight(5)

  fontSize = windowWidth / (string.length + STRPAD);
  charUpdate = string.length
  strController = new StringController(string);
  letters = [];
  goOnce = SWEEP;

  fill(R, G, B)
  
}

function draw() {
    background(0, 50); // adds motion blur effect

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
    stroke(0)
    strokeWeight(20)
    textFont(matrixFont)
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
