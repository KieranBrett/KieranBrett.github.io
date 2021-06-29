import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import matrix2 from '../Matrix2/sketch';

import image from './image.PNG';

class Matrix2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: false,
            play: false
        }

        localStorage.clear()
    }

    matrix2Sketch() {
        if (this.state.play) {
            if (this.state.message) {
                return <div><P5Wrapper sketch={matrix2} /></div>;
            }
            else {
                return <P5Wrapper sketch={matrix2} />;
            }
        }

        return <img src={image} alt="Screenshot of simulation" class="placeholder-image" />
    }

    matrixForm() {
        return <div>
            <br />
            <label>Enter your text: <input id="matrixText" type="text" /></label><br />
            <label>Sweep: <input id="matrixSweep" type="checkbox" /></label><br />
            <label>Colour: <input id="matrixColour" type="color" /></label><br />

            <button class="btn btn-primary" onClick={() => {
                this.setState({
                    message: !this.state.message,
                    play: false
                })

                localStorage['message'] = document.getElementById('matrixText').value
                localStorage['sweep'] = document.getElementById('matrixSweep').checked
                localStorage['colour'] = document.getElementById('matrixColour').value

                this.setState({
                    message: !this.state.message,
                    play: true
                })
            }}>Submit</button>
        </div>
    }

    render() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>Matrix <small class="text-muted">Version 2</small></h2>

                <p>This is a more traditional matrix simulation, except this time, the user can enter values that are taken into account. Enter your name or any text and watch it fall from the matrix!</p>

                <p>Sweep decides if each "Lane" will rain text or if it will only fall once, revealing the text</p>
                {this.matrixForm()}
            </div>

            <div class="col-sm-6 no-padding" id="matrix-2" onClick={() => {
                this.setState({
                    play: !this.state.play,
                    message: this.state.message
                })
            }}>
                {this.matrix2Sketch()}
            </div>
        </div>
    }
}

export default Matrix2;
