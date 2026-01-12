import React, { use } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-10' >
      <h1 className='text-center text-6xl'>Home Page</h1>
      <button onClick={() => navigate('/product')} 
      className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-4xl cursor-pointer'>Explore</button>
    </div>
  )
}

export default Home
