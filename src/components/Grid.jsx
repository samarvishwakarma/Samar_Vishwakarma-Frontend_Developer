import React, { useEffect, useState } from 'react'
import Grids from './Grids'

export default function Grid({list, filter}) {

    const [users, setUsers] = useState([])

    const fetchUserData = () => {
        fetch("https://api.spacexdata.com/v3/capsules/")
          .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }            
          })
          .then(data => {
            setUsers(data)
          })
      }

    useEffect(() => {
        fetchUserData()
    }, []) 

  return (
    <div className='h-auto snap-center'>   
        <div className="overflow-x-auto px-32 pb-5 max-lg:px-5">
            <table className="border border-gray-700 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="border border-gray-700 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Capsule Serial
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Original Launch
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                {users.length > 0 && (
                    <tbody>
                    {users.filter((user) =>  {
                        if(list === ""){
                            return user;
                        }
                        else if(filter==='1' && user.status.toLowerCase().includes(list.toLowerCase())){
                            return user
                        }
                        else if(filter==='2' && user.original_launch.toLowerCase().includes(list.toLowerCase())){
                            return user
                        }
                        else if(filter==='3' && user.type.toLowerCase().includes(list.toLowerCase())){
                            return user
                        }
                        else if(filter==='0'){
                            if(JSON.stringify(user).toLowerCase().includes(list.toLowerCase())){
                                return user;
                            }                            
                        }

                    }).map((user,index) => (
                        index < 10 && (
                            <Grids key={user.capsule_serial} user={user}/>
                        )
                    ))
                    }
                    </tbody>
                )}
            </table>
        </div>
    </div>
  )
}
