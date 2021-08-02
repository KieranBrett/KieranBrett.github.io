import React, { useEffect, useRef, useState, Suspense } from 'react';

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import './Logo.css';


function Floor() {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position-y={-.7}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" color={'white'} />
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
    </mesh>
}

function ShowLogo() {
    const [model, setModel] = useState();

    useEffect(() => {
        new GLTFLoader().load('/assets/dinosaur.gltf', setModel);
    })

    return model ? <primitive object={model.scene} scale={[3,3,3]} position={[0,0,0]} /> : null
}



class Logo extends React.Component {
    render() {
        return <div class="row project shadow">
            <div class="sketch-text">
                <h2>Logo <small class="text-muted">React-Three-Fiber</small></h2>
            </div>

            <div class="col-sm-12 no-padding" id="showcase">
                <Canvas shadows={true} shadowMap camera={{ position: [0, .4, 5], fov: 50 }}>
                    <OrbitControls />

                    <ambientLight intensity={.2} />
                    <directionalLight position={[0, 5, 4]} intensity={1} castShadow />
                    <directionalLight position={[0, 10, 5]} intensity={.8} castShadow />
                    <spotLight position={[0, 1000, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

                    <Floor />
                    <ShowLogo />
                </Canvas>
            </div>

        </div>
    }
}

export default Logo;
