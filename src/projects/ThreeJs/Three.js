import React, { useState } from 'react';

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

import './Three.css';



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
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))

    const [active, setActive] = useState(false)

    useFrame((state, delta) => {
        // console.log(api.velocity.copy())
        // console.log(api.velocity)

        // if (ref.current.velocity.x === 0) {
        //     console.log("test")
        // }
        // api.rotation.set(1, 2, 3)
    })

    return (
        <mesh receiveShadow castShadow ref={ref}
            onPointerEnter={() => {
                api.velocity.set(0, 2, 0);
            }}
            onClick={() => {
                setActive(!active)
            }}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color={active ? 'hotpink' : 'blue'} />
        </mesh>
    )
}

function SpawnCubes() {
    return <group>
        <Cube />
        <Cube position={[0, 10, -2]} />
        <Cube position={[0, 20, -2]} />
    </group>
}

class Three extends React.Component {
    render() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>Three <small class="text-muted">Three.js Tester</small></h2>
                <br></br>
                <p>This is a small panel currently being used to test Three.js!</p>
            </div>

            <div class="col-sm-6 no-padding" id="threeCanvas">
                <Canvas shadows={true} shadowMap camera={{ position: [-1, 2, 5], fov: 50 }}>
                    <OrbitControls />
                    <Stars />

                    <hemisphereLight intensity={0.35} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={4} castShadow />

                    <Physics>
                        <Plane />
                        <SpawnCubes />
                    </Physics>
                </Canvas>
            </div>

        </div>
    }
}

export default Three;
