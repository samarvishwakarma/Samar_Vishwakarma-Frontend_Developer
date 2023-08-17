import Hero from './Hero';
import Search from './Search';
import { useState } from 'react';

export default function Home() {

    const [list, setList] = useState(""); 
    const [filter, setFliter] = useState('0'); 

  return (
    <div className=" bg-gradient-to-r
    from-gray-500
    via-gray-700
    to-gray-900
    background-animate Home h-screen snap-y snap-mandatory scroll-smooth overflow-y-auto dark:text-white">
      <Hero/>
      <Search list={list} setList={setList} filter={filter} setFilter={setFliter}/>
    </div>
  )
}
