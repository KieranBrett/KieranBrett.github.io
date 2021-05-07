import React from 'react';

import P5Wrapper from 'react-p5-wrapper';
import sketch from '../projects/matrix';

import matrix2 from '../projects/Matrix2/sketch';

import '../Home/home.css';
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: false,
            resized: false
        }
        window.addEventListener('resize', () => {
            console.log(this.state.id)
            this.setState({
                resized: true,
                message: this.state.message
            })
        });
        localStorage.clear()
    }

    resized() {
        if (this.state.resized) {
            return <div id="resize">
                <h1>Please Refresh Page</h1>
                <p>This allows the p5.js canvases to correctly resize</p>
            </div>
        }
    }

    intro() {
        return <div id="intro">
            <h1>Kieran Brett</h1>
        </div>
    }

    matrixSketch() {
        return <div class="row">
            <div class="sketch-text col-sm-6">
                <h2>Matrix <small class="text-muted">Version 1</small></h2>

                <p>This is a Matrix simulation that is designed to show depth, as opposed to just 1 layer of falling text</p>

                <p>It is made by using a String object class, which has a random amount of Character Objects when created. Each character randomly chooses from an array of characters and displays, and will also randomly change to another character</p>

                <p>View the source code <a href="https://editor.p5js.org/KieranBrett/sketches/kR11siG1Y">Here</a></p>
            </div>

            <div class="col-sm-6">
                <P5Wrapper sketch={sketch} message="hi" />
            </div>

        </div>
    }

    matrix2Form() {
        return <div class="row">
            <div class="col-sm-6">
                {this.matrix2Sketch()}
            </div>

            <div class="sketch-text col-sm-6">
            <h2>Matrix <small class="text-muted">Version 2</small></h2>
                <input id="matrixForm" type="text"></input>
                <button onClick={() => {
                    localStorage['message'] = document.getElementById('matrixForm').value
                    this.setState({
                        resized: this.state.resized,
                        message: true
                    })
                }}>Submit</button>
            </div>

        </div>
    }

    matrix2Sketch() {
        console.log(this.state.message)
        if (this.state.message) {
            return <div><P5Wrapper sketch={matrix2} /></div>;
        }
        else {
            return <P5Wrapper sketch={matrix2} />;
        }
    }



    render() {
        return <div id="home">
            {this.intro()}

            {this.matrixSketch()}
            {this.matrix2Form()}

            {this.resized()}
        </div>
    }
}

export default Home;
