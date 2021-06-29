import React from 'react';

import Matrix2 from '../projects/Matrix2/Matrix2';
import Matrix from '../projects/Matrix/Matrix';
import Gravity from '../projects/Gravity/Gravity';

import './projects.css';
import Contact from '../contact';
class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resized: false,
            width: window.innerWidth
        }
        window.addEventListener('resize', () => {
            console.log(this.state.id)

            if (window.innerWidth !== this.state.width) {
                this.setState({
                    resized: true,
                    width: window.innerWidth
                })
            }
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
            <p>Kieran Brett</p>
        </div>
    }


    render() {
        return <div id="home">
            <img src={'/assets/kieran.png'} id="background"/>

            {this.intro()}

            <Contact />
            <Matrix />
            <Matrix2 /> 
            <Gravity />

            {this.resized()}
        </div>
    }
}

export default Projects;
