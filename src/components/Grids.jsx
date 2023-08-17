import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function Grids(props) {   
    
    const [status, setStatus] = useState();

    useEffect(()=>{
        if(props.user.status === "retired"){
            setStatus('text-red-500');
        }
        if(props.user.status === "unknown"){
            setStatus('text-gray-500');
        }
        if(props.user.status === "active"){
            setStatus('text-green-500');
        }
        if(props.user.status === "destroyed"){
            setStatus('text-black');
        }
        else ;
    },[])
    
   

  return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link target={"_blank"} to={`/capsule/${props.user.capsule_serial}`}>
                        {props.user.missions.map(mission => (
                            mission.name
                        ))}
                </Link>
                
            </th>
            <td className="px-6 py-4">
                <Link target={"_blank"} to={`/capsule/${props.user.capsule_serial}`}>
                    {props.user.capsule_serial}
                </Link>
            </td>
            <td className="px-6 py-4">
                <Link target={"_blank"} to={`/capsule/${props.user.capsule_serial}`}>
                    {props.user.original_launch}
                </Link>
            </td>
            <td className="px-6 py-4">
                <Link target={"_blank"} to={`/capsule/${props.user.capsule_serial}`}>
                    {props.user.type}
                </Link>
            </td>
            <td className = {`px-6 py-4 uppercase ${status}`}>
                <Link target={"_blank"} to={`/capsule/${props.user.capsule_serial}`}>
                    {props.user.status}
                </Link>
            </td>
        </tr>
  )
}
