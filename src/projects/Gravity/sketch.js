
import pricedown from './assets/pricedown.otf';
import sun_pic from './assets/sun.jpg';
import moon from './assets/moon.jpg';
import rock from './assets/rock.jpg';
import venus from './assets/venus.jpg';

var easycam;
let sun;
let planets = []
let particles = []

let score = 0;
let G = 5;
let userG = 5;
let maxPlanets = 5
let spawnRate = 1; // How many frames per add

let hudX = 30;
let hudY = 30;
let hudWidth;
let hudHeight;

const MAXDIST = 2000
const SPAWNDIST = 500;
const PLAN_SPIN = 0.02
const SPAWNFRAMES = 100
const GRAV_COST = 6;
const MASS_COST = 5;
const SIZE_COST = 4;
const PLAN_COST = 2;
const SPAWN_COST = 4;

const METE_MIN = 0.003;
const METE_MAX = 0.006

const PARTICLE_SIZE = 8;

let images = []
let fonts = []
let buttons = []

let gravity;
let spawn2;

let cam;

let started = false;

function sketch(p5) {

    p5.preload = function () {
        fonts.push(p5.loadFont('https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'));
        console.log("First font")
        fonts.push(p5.loadFont(pricedown))
        console.log("second font")

        images.push(p5.loadImage(sun_pic))
        console.log("First the sun")
        images.push(p5.loadImage(moon))
        console.log("Moon Loaded")
        images.push(p5.loadImage(rock))
        console.log("Rock Done")
        images.push(p5.loadImage(venus))
        console.log("Done")
    }

    p5.setup = function () {
        p5.createCanvas(document.getElementById('gravity').clientWidth, 500, p5.WEBGL);
        p5.setAttributes('antialias', true);
        p5.frameRate(60)

        // Frustrum lets you change the view clipping
        // p5.frustum(0.2, -0.2, 0.1, -0.1, .1, 60000); // L    R    UP   DWN   NEAR   FAR
        // easycam = createEasyCam();
        cam = p5.createCamera()
        cam.move(0, 0, 400);
        //                            X  Y  Z     
        sun = new Planet(p5.createVector(0, 0, 0), // Pos
            p5.createVector(0, 0, 0), // Vel
            1500,                   // Mass
            200,                   // Size
            0,                     // Image Index
            p5.createVector(0, 0, 0),   // Starting Rotation Value
            p5.createVector(0, .001, 0)) // Rotation Velocity

        p5.textFont(fonts[0]);
        p5.textSize(16);
        hudHeight = (p5.height / 3) * 2;
        hudWidth = 250;

        // Creating shop buttons
        for (let i = 0; i < 5; i++) {
            buttons.push(new Shop(p5.createVector(hudX, 50 + (hudHeight / 6 * i), 0), i))
        }

        gravity = new Powerup(10, 30, p5.height - 60, "Gravity")
        spawn2 = new Powerup(10, 30, p5.height - 110, "Spawn Two")

        started = true;
    }

    p5.draw = function () {
        p5.background(30);
        p5.noStroke();

        if (gravity.active) {
            G = 100
        }
        else {
            G = userG
        }

        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].update())
                particles.splice(i, 1)
        }

        sun.update()
        for (var i = planets.length - 1; i >= 0; i--) {
            planets[i].update();

            planets[i].attract(sun.pos, sun.mass)
            // If planet[i] collides
            if (planets[i].checkCollision(sun.pos, sun.size)) {
                score += planets[i].mass
                particles.push(new ParticleGenerator(planets[i].pos, planets[i].size, planets[i].img)) // Create effect
                if (spawn2.active) {
                    for (let p = 0; p < 2; p++) {
                        generatePlanet()
                    }
                }
                planets.splice(i, 1)
            } else if (planets[i].limitDistance(sun.pos, sun.size)) {
                planets.splice(i, 1)
            }
        }

        if (p5.frameCount % SPAWNFRAMES == 0) {
            for (var p = 0; p < spawnRate; p++) {
                if (planets.length < maxPlanets) {
                    generatePlanet()
                }
            }
        }

        // showHud()
    }

    function generatePlanet() {
        let planetMass;
        let planetSize;
        let planetImg;

        planetMass = sun.mass * p5.random(METE_MIN, METE_MAX);

        planetSize = planetMass * 1.5;

        if (planetMass <= 10) {
            planetImg = 1;
        } else if (planetMass <= 20) {
            planetImg = 2;
        } else if (planetMass <= 30) {
            planetImg = 3;
        } else if (planetMass <= 50) {
            planetImg = 0;
        }

        planets.push(
            new Planet(p5.createVector(p5.random(-(SPAWNDIST + sun.size), SPAWNDIST + sun.size),
                p5.random(-(SPAWNDIST + sun.size), SPAWNDIST + sun.size),
                p5.random(-(SPAWNDIST + sun.size), SPAWNDIST + sun.size)), // Pos
                p5.createVector(p5.random(-3, 3), p5.random(-3, 3), p5.random(-3, 3)), // Vel
                planetMass, // Mass
                planetSize, // Size
                planetImg, // Image Index
                p5.createVector(p5.random(360), p5.random(360), p5.random(360)), // Start Rotation amount
                p5.createVector(p5.random(-PLAN_SPIN, PLAN_SPIN), p5.random(-PLAN_SPIN, PLAN_SPIN), p5.random(-PLAN_SPIN, PLAN_SPIN)))) // Rot Value
    }

    p5.mouseClicked = function () {
        if (started)
            generatePlanet();
    }

    class ParticleGenerator {
        constructor(pos, size, img) {
            this.pos = pos
            this.size = size
            this.img = img
            this.tick = 30

        }

        update() {
            this.tick -= .3;
            this.draw();

            if (this.tick <= 0)
                return true

            return false
        }

        draw() {
            for (var i = 0; i < this.tick; i++) {
                p5.push();
                p5.fill(247, 156, 29, 90)
                p5.translate(this.pos.x + p5.random(-this.size, this.size), this.pos.y + p5.random(-this.size, this.size), this.pos.z + p5.random(-this.size, this.size)) // Translate
                p5.sphere(PARTICLE_SIZE)

                p5.pop();
            }
        }
    }

    class Powerup {
        constructor(length, x, y, text) {
            this.length = length
            this.active = false
            this.pos = p5.createVector(x, y, 0)
            this.genTimes()
            this.text = text;
        }

        genTimes() {
            this.startSecond = (p5.minute() * 60) + p5.second()
        }

        time() {
            return (p5.minute() * 60) + p5.second()
        }

        timeRunning() {
            return (this.time() - this.startSecond)
        }

        checkActive() {
            if (this.timeRunning() >= this.length) {
                this.active = false
            }
        }

        update() {
            p5.fill(255, 255, 255)
            p5.text(this.text, this.pos.x, this.pos.y - 3)
            if (this.active) {
                p5.text(this.length - this.timeRunning(), this.pos.x + (30 / 2) - (p5.textWidth(this.length - this.timeRunning()) / 2), this.pos.y + p5.textSize() + 4)
                this.checkActive();
            } else {
                p5.fill(20, 255, 20)
                p5.rect(this.pos.x + 5, this.pos.y + 5, 20, 20)
            }
            p5.fill(255, 255, 255, 70)
            p5.rect(this.pos.x, this.pos.y, 30, 30)
        }

        checkClick() {
            if (p5.mouseX >= this.pos.x && p5.mouseX <= this.pos.x + 30 &&
                p5.mouseY >= this.pos.y && p5.mouseY <= this.pos.y + 30 && this.active == false) {
                this.genTimes()
                this.active = true;
                return true
            }
        }
    }

    class Shop {
        constructor(pos, type) {
            this.pos = pos
            this.type = type
            this.level = 1
        }

        show() {
            p5.textFont(fonts[0])
            p5.fill(255, 255, 255)
            p5.textSize(12);
            let string;

            switch (this.type) {
                case 0:
                    string = "Force of Gravity";
                    p5.text('G = ' + G, this.pos.x, this.pos.y + 30)
                    break;
                case 1:
                    string = "Mass";
                    p5.text(sun.mass, this.pos.x, this.pos.y + 30)
                    break;
                case 2:
                    string = "Size";
                    p5.text(sun.size, this.pos.x, this.pos.y + 30)
                    break;
                case 3:
                    string = "Max Planets";
                    p5.text(maxPlanets + '       Current Planets: ' + planets.length, this.pos.x, this.pos.y + 30)
                    break;
                case 4:
                    string = "Spawn Rate";
                    p5.text(spawnRate, this.pos.x, this.pos.y + 30)
                    break;
                default:
                    break;
            }

            p5.textSize(16);
            p5.text(string, this.pos.x, this.pos.y + p5.textSize())

            p5.fill(0, 0, 0, 80)
            p5.rect(hudWidth - (30 + hudX), this.pos.y, 30, 30)
            p5.textSize(18);
            p5.textFont(fonts[1])
            p5.fill(80, 255, 80)
            p5.text('$' + this.calculateCost(), hudWidth - (35 + hudX) - p5.textWidth('$' + this.calculateCost()), this.pos.y + p5.textSize())
        }

        checkClick() {
            if (p5.mouseX > hudX + hudWidth - (30 + hudX) && p5.mouseX < hudX + hudWidth - hudX &&
                p5.mouseY > this.pos.y + hudY && p5.mouseY < this.pos.y + 30 + hudY) {
                this.upgrade();
                return true
            }
        }

        calculateCost() {
            switch (this.type) {
                case 0:
                    return GRAV_COST ** this.level
                case 1:
                    return MASS_COST ** this.level
                case 2:
                    return SIZE_COST ** this.level
                case 3:
                    return PLAN_COST ** this.level
                case 4:
                    return SPAWN_COST ** this.level
                default:
                    break;
            }
        }

        upgrade() {
            if (score >= this.calculateCost()) {
                switch (this.type) {
                    case 0:
                        userG += 1
                        break;
                    case 1:
                        sun.mass += 500
                        break;
                    case 2:
                        sun.size += 100
                        easycam.setDistanceMin(sun.size + 200)
                        break;
                    case 3:
                        maxPlanets += 1
                        break;
                    case 4:
                        spawnRate += 1
                        break;
                    default:
                        break;
                }

                score -= this.calculateCost()
                this.level += 1
            }
        }
    }

    class Planet {
        constructor(pos, vel, mass, size, img, rot, rotVel) {
            this.pos = pos
            this.vel = vel
            this.mass = mass
            this.size = size
            this.img = img
            this.rot = rot;
            this.rotVel = rotVel;
        }

        update() {
            this.move();
            this.draw();
        }

        move() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            this.pos.z += this.vel.z;

            this.rot.x += this.rotVel.x;
            this.rot.y += this.rotVel.y;
            this.rot.z += this.rotVel.z;
        }

        draw() {
            p5.push();

            p5.texture(images[this.img])
            p5.translate(this.pos.x, this.pos.y, this.pos.z) // Translate

            p5.rotateX(this.rot.x)
            p5.rotateY(this.rot.y)
            p5.rotateZ(this.rot.z)

            p5.sphere(this.size) // Draw Shape

            p5.pop();
        }

        attract(pos, mass) {
            let r = p5.dist(this.pos.x, this.pos.y, this.pos.z, pos.x, pos.y, pos.z)
            let f = this.pos.copy().sub(pos)
            f.setMag((G * this.mass * mass) / (r * r))

            this.vel.x -= f.x / this.mass
            this.vel.y -= f.y / this.mass
            this.vel.z -= f.z / this.mass
        }

        checkCollision(pos, size) {
            let distance = p5.dist(this.pos.x, this.pos.y, this.pos.z, pos.x, pos.y, pos.z)

            if (distance < size)
                return true
            return false
        }

        limitDistance(pos, size) {
            let distance = p5.dist(this.pos.x, this.pos.y, this.pos.z, pos.x, pos.y, pos.z)

            if (distance > size + MAXDIST)
                return true
            return false
        }
    }
}

export default sketch;