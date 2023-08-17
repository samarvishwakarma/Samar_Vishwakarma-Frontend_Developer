import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, useGLTF} from "@react-three/drei";

function Model(props){
    const {scene} = useGLTF("/dragon.glb");
    const mesh = useRef();

    useFrame ( ()=> (mesh.current.rotation.y += 0.01))
    useFrame ( ()=> (mesh.current.rotation.z += 0.001))
    useFrame ( ({clock})=> (
        mesh.current.position.y = 0.5*Math.sin(clock.getElapsedTime())
      ))
    

    return <primitive object={scene} ref={mesh} {...props} /> 
}


export default function Capsule() {

    const params = useParams();
    const [capsule, setCapsule] = useState([])
    
    const fetchData = () => {
        fetch(`https://api.spacexdata.com/v3/capsules/${params.id}`)
          .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }            
          })
          .then(data => {
            setCapsule(data)
          })
      }

    useEffect(() => {
        fetchData()
    }, [ ]) 


  return (
    <div className="bg-gradient-to-r
    from-gray-500
    via-gray-700
    to-gray-900
    background-animate Capsule h-screen snap-y snap-mandatory scroll-smooth overflow-y-auto dark:text-white">
        <div className=' h-screen snap-center grid grid-flow-col justify-around items-center max-sm:grid-flow-row'>
            <div className="Model h-full max-sm:h-3/4">
                <Canvas>
                    <OrbitControls />
                    <ambientLight intensity ={2} />
                    <Model scale={0.8} />
                </Canvas>
            </div>
            <div className="items-center block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-transparent max-sm:scale-75">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{capsule.capsule_serial}</h5>
                <p className="font-normal text-ellipsis text-gray-700 dark:text-gray-400">{capsule.details}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Name: {capsule.missions?.map((mission) => (
                        mission.name
                ))}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Flight: {capsule.missions?.map((mission) => (
                        mission.flight
                ))}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Landing: {capsule.landings}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Type: {capsule.type}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">ID: {capsule.capsule_id}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Status: {capsule.status}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Original Launch: {capsule.original_launch}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Original Launch Unix: {capsule.original_launch_unix}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Reuse Count: {capsule.reuse_count}</p>  
                <Link to={`/`} className="items-center text-center m-2 block p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 max-sm:scale-75">Back To Home</Link>
            </div>
        </div>
    </div>
  )
}
