import React from 'react';
import Sketch from "react-p5";


class Art extends React.Component {
    circles = []
    circleHeight = 10;
    minSpeed = -3
    maxSpeed = 3

    setup = (p5, parent) => {
        let x = document.getElementById(this.props.parent_id).clientWidth;
        let y = document.getElementById(this.props.parent_id).clientHeight;
        p5.createCanvas(x, y).parent(parent);

        for (let i = 0; i < 50; i++) {
            this.circles.push(new Circle(p5.random(p5.width - this.circleHeight), p5.random(p5.height - this.circleHeight) ,
             p5.random(this.minSpeed, this.maxSpeed), p5.random(this.minSpeed, this.maxSpeed)))
            p5.circles = this.circles
        }
        // p5.circle = 

    }

    draw = p5 => {
        p5.background(this.props.colour[0], this.props.colour[1], this.props.colour[2]);
        
        // This is old code, not needed
        p5.circles.forEach(circle => {
            circle.update(p5)
            circle.display(p5)
        });
    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} />
    }
}

class Circle {
    constructor(x, y, xvel, yvel) {
        this.x = x;
        this.y = y;
        this.xvel = xvel;
        this.yvel = yvel;
    }

    update(p5) {
        if (this.x >= p5.width || this.x <= 0) {
            this.xvel *= -1;
        }
        if (this.y >= p5.height || this.y <= 0) {
            this.yvel *= -1;
        }

        this.x += this.xvel;
        this.y += this.yvel;
    }

    display(p5) {
        p5.ellipse(this.x, this.y, 10, 10)
    }
}

export default Art;
