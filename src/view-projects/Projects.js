import React from 'react';

import Matrix2 from '../projects/Matrix2/Matrix2';
import Matrix from '../projects/Matrix/Matrix';
import Gravity from '../projects/Gravity/Gravity';

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
        if (this.state.resized) {
            this.setState({
                resized: false
            })
            return <section>
                <Matrix />
                <Matrix2 />
                <Gravity />
            </section>
        }
        else {
            return <div>
                <Matrix />
                <Matrix2 />
                <Gravity />
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
