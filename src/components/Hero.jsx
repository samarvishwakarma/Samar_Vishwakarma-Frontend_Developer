import React, { useRef } from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, useGLTF} from "@react-three/drei";

function Model(props){
  const {scene} = useGLTF("/rocket.glb");
  const mesh = useRef();
  scene.rotation.z += 0.5

  useFrame ( ({clock})=> (
    mesh.current.rotation.y = mesh.current.position.y = 0.5*Math.sin(clock.getElapsedTime())
  ))

  return <primitive object={scene} ref={mesh} {...props} /> 
}

export default function Hero() {
  return (
    <div className=' h-screen snap-center grid grid-flow-col justify-evenly max-sm:grid-flow-row'>
      <div className='font-spacex heroText bg-clip-text self-right text-center uppercase grid grid-flow-col justify-center items-center'>
        <h1 className="text-6xl max-lg:text-4xl text-white">Space</h1>
        <h1 className='text-[10rem] animate-pulse max-lg:text-5xl text-gray-100'>X</h1>
      </div>      
      <div className="Model h-full max-sm:h-3/4 cursor-pointer" >
        <Canvas>
            <OrbitControls/>
            <ambientLight intensity = {2} />
            <Model scale={0.1} />
        </Canvas>
      </div>
    </div>
  )
}
