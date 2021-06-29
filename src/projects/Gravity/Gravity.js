import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../Gravity/sketch';

import image from './image.PNG';

class Gravity extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            play: false
        }
    }

    gravity() {
        if (this.state.play) {
            return <P5Wrapper sketch={sketch} />
        }

        return <img src={image} alt="Screenshot of simulation" class="placeholder-image"/>
    }

    render() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>Gravity <small class="text-muted">Version 1</small></h2>

                <p>This is a gravity simulation where you can watch planets crash and burn into the sun!</p>

                <p>Unfortunately I cant use p5.easyCam with the react-p5 wrapper so this is a stripped down version</p>
                <p>You can click on the simulation to spawn in another planet.</p>

                <button class="btn btn-primary" onClick={() => {
                    this.setState({
                        play: !this.state.play
                    })
                }}>Play/Pause</button>

                <p>Please <a href="https://editor.p5js.org/KieranBrett/sketches/M6ezC4T4o">view and play the full game</a>, which includes a store with upgrades, as well as power ups! (and the abillity to freely move the camera)</p>
                <p>View the source code <a href="https://editor.p5js.org/KieranBrett/sketches/M6ezC4T4o">Here</a></p>
            </div>

            <div class="col-sm-6 no-padding" id="gravity">
                {this.gravity()}
            </div>

        </div>
    }
}

export default Gravity;
