const TESTSTR = `        THE MATRIX        `
let defaultStrings = ["Hello", "Tumeke", "Churr Cuzzi", "Bring Back $1 Frozen Cokes", "I think Jacinda is doing a good job", "Whats the weather like?", "Huh", 
                    "Creationism", "Eric the God eating penguin", "Snowflake", "Dunedin", "I like cheese", "Whats up?"]
const TRANSPARENCY = 90;

//Normal Colours
const R = 150;
const G = 0;
const B = 7;

//Stroke Colours
const STROKER = 80;
const STROKEG = 0;
const STROKEB = 0;

//Shooting Stars
const STARR = 255;
const STARG = 120;
const STARB = 120;

// Strings
const VANISHONPASS = true; // if letters vanish when passing the message
const STRPAD = 8; // Ammount of blank spaces on either side of string
const SWEEP = false; // If it rains or just falls once per lane
const SPAWNRATE = 3;

// Characters
const CHARCOLOUROFFSET = 60
const FLASHWHENHIT = false; // flashes a box around the letter when a piece of text hits it
const STARRATE = 60; // PERCENT
const CHANCEOFFLIPPED = 50 // PERCENT
const CHANGERATE = 70; // PERCENT
const SWITCHCHANCES = 10; // Ammount of times to try for changing characters

// Rain
const TEXTSPEED = 12;
const SPEEDVARY = 4;
const LENGTHMIN = 3;
const LENGTHMAX = 15;

// Message
//MESSAGE Fade Colours
const LETTERR = 255;
const LETTERG = 255;
const LETTERB = 255;
const COLOURJUMP = 2; // Ammount colour updates every frame

//Static Colours
const STATICR = 255;
const STATICG = 50;
const STATICB = 50;

//MESSAGE Border
const BORDERR = 255;
const BORDERG = 255;
const BORDERB = 255;
const BORDERWEIGHT = 3;

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
    string = random(defaultStrings)
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
    background(0, TRANSPARENCY); // adds motion blur effect

  strController.update();

  for (let i = 0; i < letters.length; i++){
    push();
    
    letters[i].update();
    pop();
  }

  // Signature
  push();

  fill(255,255,255)
  noStroke();
  textSize(12);
  textAlign(LEFT);
  text("Made By Kieran Brett", 10, windowHeight - 10)
  pop();
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
    stroke(BORDERR, BORDERG, BORDERB)
    strokeWeight(BORDERWEIGHT)
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
