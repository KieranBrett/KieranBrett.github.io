const MINLENGTH = 3;
const MAXLENGTH = 15;
const MINTEXT = 5;
const MAXTEXT = 50

function sketch(p5) {


  let r;
  let g;
  let b;
  let rDes;
  let gDes;
  let bDes;

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

  
  p5.setup = function() {
    // p5 = p5;
    p5.createCanvas(document.getElementById('matrix-1').clientWidth, 500);

    p5.frameRate(30)

    r = p5.random(256);
    rDes = false;
    g = p5.random(256);
    gDes = false;
    b = p5.random(256);
    bDes = false;

    p5.fill(r, g, b);
  }

  p5.draw = function() {
    p5.background(10, 200); // adds motion blur effect

    for (let i = strings.length - 1; i >= 0; i--) {
      strings[i].update()

      if (strings[i].y - (strings[i].length * strings[i].textSize) > p5.height) {
        strings.splice(i, 1);
      }
    }

    if (p5.frameCount % 4 === 0) {
      strings.push(new TextString());
    }

    updateColour();
  }

  class TextString {
    constructor() {
      this.x = p5.random(p5.width)
      this.y = 0;

      this.textSize = p5.random(MINTEXT, MAXTEXT);
      this.length = p5.random(MINLENGTH, MAXLENGTH)
      this.textSpeed = parseInt(this.textSize * p5.random(0.2, 0.3))
      // console.log(this.textSpeed);

      this.characters = [];

      for (let i = 0; i < this.length; i++) {
        this.characters.push(new Character())
      }
    }

    update() {
      p5.textSize(this.textSize)

      for (let i = 0; i < this.characters.length; i++) {
        p5.text(this.characters[i].character, this.x, this.y - (i * this.textSize))

        if (p5.random(0, 10) < 1.5) {
          this.characters[i].update()
        }
      }
      this.y += this.textSpeed;
    }
  }

  class Character {
    constructor() {
      this.character = characters[parseInt(p5.random(0, characters.length - 1))]
    }

    update() {
      this.character = characters[parseInt(p5.random(0, characters.length - 1))]
    }
  }

  function updateColour() {
    let number = parseInt(p5.random(2));

    if (number === 0) {
      if (rDes) {
        r--
        if (r < 0) {
          r = 0;
          rDes = false;
        }
      }
      else {
        r++
        if (r > 255) {
          r = 255;
          rDes = true;
        }
      }
    } else if (number === 1) {
      if (gDes) {
        g--
        if (g < 0) {
          g = 0;
          gDes = false;
        }
      }
      else {
        g++
        if (g > 255) {
          g = 255;
          gDes = true;
        }
      }
    } else if (number === 2) {
      if (bDes) {
        b--
        if (b < 0) {
          b = 0;
          bDes = false;
        }
      }
      else {
        b++
        if (b > 255) {
          b = 255;
          bDes = true;
        }
      }
    } 
    
    p5.fill(r, g, b);
  }
}

export default sketch;