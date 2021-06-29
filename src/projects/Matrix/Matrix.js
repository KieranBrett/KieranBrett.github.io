import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../Matrix/sketch';

import image from './image.PNG';

class Matrix extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            play: false
        }
    }

    matrix() {
        if (this.state.play) {
            return <P5Wrapper sketch={sketch} />
        }

        return <img src={image} alt="Screenshot of simulation" class="placeholder-image"/>
    }

    render() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>Matrix <small class="text-muted">Version 1</small></h2>

                <p>This is a Matrix simulation that is designed to show depth, as opposed to just 1 layer of falling text</p>

                <p>It is made by using a String object class, which has a random amount of Character Objects when created. Each character randomly chooses from an array of characters and displays, and will also randomly change to another character</p>

                <p>View the source code <a href="https://editor.p5js.org/KieranBrett/sketches/kR11siG1Y">Here</a></p>

                <button class="btn btn-primary" onClick={() => {
                this.setState({
                    play: !this.state.play
                })
            }}>Play/Pause</button>
            </div>

            <div class="col-sm-6 no-padding" id="matrix-1" >
                { this.matrix() }
            </div>

        </div>
    }
}

export default Matrix;
