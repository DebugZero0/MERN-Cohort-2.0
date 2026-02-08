import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className='home-section justify-center items-center flex flex-col gap-8 h-screen bg-gray-800'>
                <h1 className='text-amber-50 text-6xl text-center'>Welcome to Home Page</h1>
                <button className='text-3xl text-amber-50 bg-blue-500 px-4 py-2 rounded-4xl hover:bg-blue-700' onClick={() => navigate('/create-post')}>Click</button>
            </section>
        </>
    )
}

export default Home
