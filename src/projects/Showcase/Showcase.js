import React, { useRef, useState } from 'react';

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Flex, Box } from '@react-three/flex'

import './Showcase.css';



function Wall() {
    return (
        <mesh receiveShadow position-z={-2.5}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshPhysicalMaterial attach="material" color="#262626" />
        </mesh>
    )
}

function Floor() {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position-y={-2.5}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshPhysicalMaterial attach="material" color="#616161" />
        </mesh>
    )
}

function Model(props) {
    const [active, setActive] = useState(false)
    const ref = useRef()

    useFrame((state, delta) => {
        if (active) {
            ref.current.rotation.y += 0.01
        }
    })

    return <mesh receiveShadow castShadow ref={ref}
        onPointerEnter={() => {
            setActive(true)
        }}
        onPointerLeave={() => {
            setActive(false)
            ref.current.rotation.y = 0
        }}>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={props.color} />
        <Light active={active} />
    </mesh>
}

function Light(props) {
    if (props.active) {
        return <spotLight angle={.2} intensity={2} castShadow />
    }
    return null
}

function ModelBox(props) {
    return <Box centerAnchor flexGrow={1} margin={1}>
        <Model color={props.color} />
    </Box>
}


class Showcase extends React.Component {
    render() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>Item Showcase <small class="text-muted">React-Three-Fiber</small></h2>
                <br></br>
                <p>A small showcase features items</p>
            </div>

            <div class="col-sm-6 no-padding" id="showcase">
                <Canvas shadows={true} shadowMap >
                    <color attach="background" args={"#141414"} />
                    <OrbitControls />

                    <hemisphereLight intensity={1} />
                    <spotLight position={[0, 2, 35]} angle={0.3} penumbra={1} intensity={.8} castShadow />

                    <Flex justifyContent="center" alignItems="center" flexDirection="row" position={[-.5, .5, 0]}>
                        <ModelBox color={'blue'} />
                        <ModelBox color={'yellow'} />
                        <ModelBox color={'green'} />
                        <ModelBox color={'red'} />
                    </Flex>

                    <Floor />
                    <Wall />
                </Canvas>
            </div>

        </div>
    }
}

export default Showcase;
