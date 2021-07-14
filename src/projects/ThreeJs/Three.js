import React from 'react';

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";



function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    return (
        <mesh ref={ref} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[10, 10]} />
            <meshPhysicalMaterial attach="material" color="lightblue" />
        </mesh>
    )
}

function Cube(props) {
    const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
    return (
        <mesh receiveShadow castShadow ref={ref}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
}

class Three extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>Three <small class="text-muted">Three.js Tester</small></h2>
                <br></br>
                <p>This is a small panel currently being used to test Three.js!</p>
            </div>

            <div class="col-sm-6 no-padding">
                <Canvas shadows={true} shadowMap camera={{ position: [-1, 2, 5], fov: 50 }}>
                    <OrbitControls />
                    <Stars />

                    <hemisphereLight intensity={0.35} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={4} castShadow />
                    <Physics>
                        <Plane />
                        <Cube />
                        <Cube position={[0, 10, -2]} />
                        <Cube position={[0, 20, -2]} />
                    </Physics>
                </Canvas>
            </div>

        </div>
    }
}

export default Three;
