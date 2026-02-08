import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsVisible(true);
        
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <section className='relative home-section justify-center items-center flex flex-col gap-10 h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
                {/* Animated Background Elements */}
                <div className='absolute inset-0 overflow-hidden'>
                    <div 
                        className='absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'
                        style={{
                            top: '20%',
                            left: '20%',
                            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                        }}
                    ></div>
                    <div 
                        className='absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'
                        style={{
                            top: '40%',
                            right: '20%',
                            transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`
                        }}
                    ></div>
                    <div 
                        className='absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'
                        style={{
                            bottom: '20%',
                            left: '40%',
                            transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`
                        }}
                    ></div>
                </div>

                {/* Content */}
                <div className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Main Heading */}
                    <div className='text-center space-y-4'>
                        <h1 className='text-7xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl'>
                            Welcome
                        </h1>
                        <p className='text-2xl md:text-3xl text-gray-300 font-light tracking-wide'>
                            Create & Share Your Moments
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4'>
                        <div className='backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 cursor-pointer'>
                            <div className='text-4xl mb-3'>📸</div>
                            <h3 className='text-xl font-semibold text-white mb-2'>Upload</h3>
                            <p className='text-gray-300 text-sm'>Share your favorite moments</p>
                        </div>
                        <div className='backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 hover:border-blue-400/50 hover:scale-105 transition-all duration-300 cursor-pointer'>
                            <div className='text-4xl mb-3'>🎨</div>
                            <h3 className='text-xl font-semibold text-white mb-2'>Create</h3>
                            <p className='text-gray-300 text-sm'>Design beautiful posts</p>
                        </div>
                        <div className='backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 hover:border-pink-400/50 hover:scale-105 transition-all duration-300 cursor-pointer'>
                            <div className='text-4xl mb-3'>🌟</div>
                            <h3 className='text-xl font-semibold text-white mb-2'>Explore</h3>
                            <p className='text-gray-300 text-sm'>Discover amazing content</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                        <button 
                            className='group relative text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50'
                            onClick={() => navigate('/create-post')}
                        >
                            <span className='relative z-10 flex items-center gap-2'>
                                Create Post
                                <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                            </span>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </button>
                        
                        <button 
                            className='text-xl font-semibold text-white border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/60 hover:scale-110 transition-all duration-300'
                            onClick={() => navigate('/feed')}
                        >
                            View Feed
                        </button>
                    </div>

                    {/* Scroll Indicator */}
                    <div className='absolute bottom-10 animate-bounce'>
                        <svg className='w-6 h-6 text-white/50' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
                            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
                        </svg>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    )
}

export default Home
