const TESTSTR = "123456789"
const TEXTSPEED = 10;
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
let charUpdate;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  fontSize = windowWidth / (TESTSTR.length + STRPAD);
  charUpdate = TESTSTR.length / 4
  strController = new StringController(TESTSTR);
}

function draw() {
  background(10, 200); // adds motion blur effect

  fill(40,200,30)
  strController.update();
}

