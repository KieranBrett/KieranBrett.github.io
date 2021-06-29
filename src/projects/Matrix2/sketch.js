
let defaultStrings = ["Hello", "Tumeke", "Churr Cuzzi", "Bring Back $1 Frozen Cokes", "Whats the weather like?", "Huh",
  "Creationism", "Christmas", "Dunedin", "I like cheese", "Whats up?", "The Matrix"]

const TRANSPARENCY = 70;

// DEFAULT COLOURS
const R = 40;
const G = 190;
const B = 40;

//Stroke Colours DIFFERENCE
const STROKER = 80;
const STROKEG = 80;
const STROKEB = 80;

//Shooting Stars
const STARR = 100;
const STARG = 100;
const STARB = 100;

// Strings
const VANISHONPASS = true; // if letters vanish when passing the message
const STRPAD = 8; // Ammount of blank spaces on either side of string
const SPAWNRATE = 3;

// Characters
const CHARCOLOUROFFSET = 15
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
const COLOURJUMP = 2; // Ammount colour updates every frame

//Static Colours
const STATICR = 100;
const STATICG = 100;
const STATICB = 100;

//MESSAGE Border
const BORDERR = 255;
const BORDERG = 255;
const BORDERB = 255;
const BORDERWEIGHT = 1.5;

function matrix2(p5) {
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
  let goOnce;

  // let matrixFont;
  let textR;
  let textG;
  let textB;

  // SETTING THE CANVAS to WIDTH of the DIV
  let sketchWidth = document.getElementById('matrix-2').offsetWidth
  let sketchHeight = 500


  let string;

  p5.setup = function () {
    // Setting up user options
    goOnce = false;

    if (localStorage['sweep'] == 'true'){
      goOnce = true;
    }

    // Message
    if (localStorage['message'] != null){
      string = localStorage['message']
    }
    else{
      string = p5.random(defaultStrings)
    }

    // Colour
    let localColour = localStorage['colour'];
    if (localColour == "#000000"){
      localColour = null;
    }

    if (localColour != null) {
      textR = hexToRgb(localColour).r;
      textG = hexToRgb(localColour).g;
      textB = hexToRgb(localColour).b;
    }
    else {
      textR = R;
      textG = G;
      textB = B;
    }

    p5.createCanvas(sketchWidth, sketchHeight);
    p5.frameRate(30);

    p5.textAlign(p5.CENTER);
    p5.stroke(textR - STROKER, textG - STROKEG, textB - STROKEB);
    p5.strokeWeight(5)

    fontSize = sketchWidth / (string.length + STRPAD);
    strController = new StringController(string);
    letters = [];

    // matrixFont = p5.loadFont('../Matrix2/WESTM.TTF')
  }

  p5.draw = function () {
    p5.background(0, TRANSPARENCY); // adds motion blur effect

    strController.update();
    for (let i = 0; i < letters.length; i++) {
      p5.push();
      letters[i].update();
      p5.pop();
    }
  }

  function hexToRgb(hex) { // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  class Letters {
    constructor(letter, x, y) {
      this.letter = letter;
      this.x = x;
      this.y = y;

      // LETTERS COLOR
      this.r = 255;
      this.g = 255;
      this.b = 255;
      this.rDes = true;
      this.gDes = true;
      this.bDes = true;
    }
    update() {
      p5.fill(this.r, this.g, this.b)
      p5.stroke(BORDERR, BORDERG, BORDERB)
      p5.strokeWeight(BORDERWEIGHT)
      // p5.textFont(matrixFont)
      p5.text(this.letter, this.x, this.y)

      if (this.rDes) {
        this.r -= COLOURJUMP
        if (this.r <= textR + STATICR) {
          this.r = textR + STATICR;
          this.rDes = false;
        }
      }

      if (this.gDes) {
        this.g -= COLOURJUMP
        if (this.g <= textG + STATICG) {
          this.g = textG + STATICG;
          this.gDes = false;
        }
      }

      if (this.bDes) {
        this.b -= COLOURJUMP
        if (this.b <= textB + STATICB) {
          this.b = textB + STATICB;
          this.bDes = false;
        }
      }


    }
  }

  class StringController {
    constructor(string) {

      //////////////////////////////////// Setting up padding of word
      this.string = "";
      for (let i = 0; i < STRPAD; i++) {
        this.string += ";"
      }
      this.string += string;
      for (let i = 0; i < STRPAD; i++) {
        this.string += ";"
      }
      ////////////////////////////////////

      this.strings = [];
      p5.textSize(fontSize)

      this.generateLanes();
    }

    generateLanes() {
      this.lanes = new LaneController(this.string);
    }

    update() {
      this.lanes.update();
    }
  }

  class LaneController {
    constructor(string) {
      this.lanes = [];

      for (let i = 0; i < string.length; i++) {

        this.lanes.push(new Lane(string.charAt(i),
          (i * (sketchWidth / string.length)) + ((sketchWidth / string.length) / 2)));
      }
      // console.log(this.lanes)
    }
    update() {
      for (let i = 0; i < this.lanes.length; i++) {
        this.lanes[i].update();
      }

      if (p5.frameCount % SPAWNRATE == 0) // Keeps spawning strings
      {
        let randomLane = parseInt(p5.random(0, this.lanes.length))

        if (this.lanes[randomLane].available) {
          this.lanes[randomLane].spawnString();
          this.lanes[randomLane].available = false;
        }
      }

      // Randomly updating characters
      for (let i = 0; i < SWITCHCHANCES; i++) {
        if (p5.random(0, 100) < CHANGERATE) {
          this.lanes[parseInt(p5.random(0, this.lanes.length))].updateCharacters();
        }
      }
    }
  }

  class Lane {
    constructor(letter, x) {
      this.x = x;
      this.letter = letter;
      this.available = true;

      this.strings = []
      this.laneTripped = false;
    }

    update() {
      for (let i = this.strings.length - 1; i >= 0; i--) {
        this.strings[i].update();

        if (this.strings[i].getY() > sketchHeight) {
          this.strings.splice(i, 1);
        }
      }
      // If there is a string
      if (this.strings.length != 0) {
        switch (this.letter) {
          case ";":
          case " ":
            // Normal Strings
            break;
          default:
            if (this.strings[0].y > (sketchHeight / 2) + (fontSize / 2) && !this.laneTripped) {

              letters.push(new Letters(this.letter, this.x, (sketchHeight / 2) + (fontSize / 2)))

              // this.strings[0].characters[0].letter = " "

              this.strings[0].characters.splice(0, 1);
              this.strings[0].y -= fontSize;

              this.laneTripped = true;
            }
            else if (VANISHONPASS) { // Hiding letter if it passes word
              if (this.strings[0].y > (sketchHeight / 2) + (fontSize / 2)) {
                p5.push()
                p5.noStroke()
                if (FLASHWHENHIT) {
                  p5.fill(255, 255, 255)
                }
                else {
                  p5.fill(0, 0, 0)
                }

                let rectX = this.strings[0].x - (fontSize / 2);
                let rectY = (sketchHeight / 2) - (fontSize / 3)
                p5.rect(rectX, rectY, fontSize, fontSize)

                if (this.strings[0].y - fontSize > rectY) { // If letter has passed main letter
                  this.strings[0].characters.splice(0, 1);
                  this.strings[0].y -= fontSize;

                  if (this.strings[0].characters.length == 0) {
                    this.strings.splice(0, 1)
                  }
                }
                p5.pop()
              }
            }
            break;
        }
      }
      else {
        if (!goOnce) {
          this.available = true;
        }
      }
    }

    spawnString() {
      this.strings.push(new TextString(this.letter, this.x))
      if (p5.random(100) < STARRATE) {
        this.strings[this.strings.length - 1].characters[0].bright = true;
      }
    }

    updateCharacters() {
      for (let i = this.strings.length - 1; i >= 0; i--) {
        // console.log(`${this.strings[i].updateCharacters()}`)
        this.strings[i].updateCharacters();
      }
    }
  }

  class TextString {
    constructor(letter, x) {
      this.letter = letter;
      this.length = p5.random(LENGTHMIN, LENGTHMAX)
      this.x = x;
      this.y = 0;
      this.speed = p5.random(TEXTSPEED - SPEEDVARY, TEXTSPEED + SPEEDVARY - 1)

      this.enabled = true;

      this.characters = [];

      // for (let i = 0; i < this.letter.length; i++){
      //   this.characters.push(new Character(this.letter))
      // }

      for (let i = 0; i < this.length; i++) {
        this.characters.push(new Character(characters[parseInt(p5.random(0, characters.length))]))
        if (p5.random(100) < CHANCEOFFLIPPED) {
          this.characters[this.characters.length - 1].flipped = true;
        }
      }
    }

    update() {
      for (let i = 0; i < this.characters.length; i++) {
        p5.push()
        p5.fill(this.characters[i].r, this.characters[i].g, this.characters[i].b)

        if (i == 0) { // Only first characters can be bright
          if (this.characters[i].bright) { // Makes character bright

            p5.fill(textR + STARR, textG + STARG, textB + STARB)
            p5.text(this.characters[i].letter, this.x, this.y - (i * fontSize))

          }
        }
        else {
          if (this.characters[i].flipped) { // Flips character

            p5.translate(this.x, this.y - (i * fontSize))
            var s = p5.map(0, 0, p5.width, -1, 1);
            p5.scale(s, 1);
            p5.text(this.characters[i].letter, 0, 0)

          }
          else { // Normal Character
            p5.text(this.characters[i].letter, this.x, this.y - (i * fontSize))
          }

        }

        p5.pop()
      }

      if (this.enabled)
        this.y += this.speed;
    }

    updateCharacters() {
      this.characters[parseInt(p5.random(0, this.characters.length - 1))].update();
    }

    getY() {
      return this.y - (this.characters.length * fontSize);
    }
  }

  class Character {
    constructor(letter) {
      this.letter = letter;
      this.bright = false;
      this.flipped = false;

      this.r = textR + p5.random(-CHARCOLOUROFFSET, CHARCOLOUROFFSET);
      this.g = textG + p5.random(-CHARCOLOUROFFSET, CHARCOLOUROFFSET);
      this.b = textB + p5.random(-CHARCOLOUROFFSET, CHARCOLOUROFFSET)

    }

    update() {
      this.letter = characters[parseInt(p5.random(0, characters.length))]
    }
  }

}

export default matrix2;