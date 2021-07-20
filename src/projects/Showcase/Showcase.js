import React, { useMemo, useState } from 'react';

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
    return <mesh receiveShadow castShadow>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={props.color} />
    </mesh>
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

                    <Flex justifyContent="center" alignItems="center" flexDirection="row" position={[-.5,.5,0]}>
                        <Box centerAnchor margin={1}>
                            <Model color={"red"} />
                        </Box>
                        <Box centerAnchor flexGrow={1} margin={1}>
                            <Model color={"orange"} />
                        </Box>
                        <Box centerAnchor flexGrow={1} margin={1}>
                            <Model color={"yellow"} />
                        </Box>
                        <Box centerAnchor flexGrow={1} margin={1}>
                            <Model color={"green"} />
                        </Box>
                        <Box centerAnchor flexGrow={1} margin={1}>
                            <Model color={"blue"} />
                        </Box>
                    </Flex>

                    <Floor />
                    <Wall />
                </Canvas>
            </div>

        </div>
    }
}

export default Showcase;
