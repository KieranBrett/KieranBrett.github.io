import React, { useEffect, useRef, useState } from 'react';

import Matrix2 from '../projects/Matrix2/Matrix2';
import Matrix from '../projects/Matrix/Matrix';
import Gravity from '../projects/Gravity/Gravity';
import Three from '../projects/ThreeJs/Three';
import Showcase from '../projects/Showcase/Showcase';

import './projects.css';

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PositionalAudio } from "@react-three/drei";
import { Flex, Box } from '@react-three/flex'
import Logo from '../projects/SpinningLogo/Logo';

function Cube() {
    const ref = useRef();
    const [active, setActive] = useState()

    return <mesh receiveShadow castShadow ref={ref}
        onPointerEnter={
            () => {
                setActive(true)
            }
        }
        onPointerLeave={
            () => {
                setActive(false)
            }
        } >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={active ? 'red' : 'blue'} />
    </mesh>
}

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

    projects() {
        // Need to slightly change the render so that it can re render the components
        // Components need to re render so that the canvases can correctly scale
        // As they take in the <div> width as a property
        if (this.state.resized) {
            this.setState({
                resized: false
            })
            return <section >
                <Matrix />
                <Matrix2 />
                <Gravity />
                <Showcase />
            </section>
        } else {
            return <div >
                <Matrix />
                <Matrix2 />
                <Gravity />
                <Showcase />
            </div>
        }
    }


    render() {
        return <div id="home" >
            <img src={'/assets/kieran.png'} alt="img of Kieran Brett" id="background" />

            {/* <div id="projectCanvas">
                <Canvas camera={{ position: [0, 0, 5] }} >
                    <ambientLight />
                    <OrbitControls />
                    <Cube />
                </Canvas>
            </div> */}

            <Logo />

            {this.projects()}
        </div>
    }
}

export default Projects;