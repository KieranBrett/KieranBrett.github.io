import React from 'react';

import Matrix2 from '../projects/Matrix2/Matrix2';
import Matrix from '../projects/Matrix/Matrix';
import Gravity from '../projects/Gravity/Gravity';
import Three from '../projects/ThreeJs/Three';

import './projects.css';

class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resized: false,
            width: window.innerWidth
        }

        window.addEventListener('resize', () => {
            // Only checking width because height on mobile changes regularly 
            if (window.innerWidth !== this.state.width) {
                this.setState({
                    resized: true,
                    width: window.innerWidth
                })
            }
        });
    }

    intro() {
        return <div id="intro">
            <p>Kieran Brett</p>
        </div>
    }

    projects() { 
        // Need to slightly change the render so that it can re render the components
        // Components need to re render so that the p5.js canvases can correctly scale
        // As they take in the <div> width as a property
        if (this.state.resized) {
            this.setState({
                resized: false
            })
            return <section>
                <Matrix />
                <Matrix2 />
                <Gravity />
                <Three />
            </section>
        }
        else {
            return <div>
                <Matrix />
                <Matrix2 />
                <Gravity />
                <Three />
            </div>
        }
    }


    render() {
        return <div id="home">
            <img src={'/assets/kieran.png'} id="background" />

            {this.intro()}

            {this.projects()}
        </div>
    }
}

export default Projects;
