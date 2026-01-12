import React, { useContext, useRef, useState, useEffect } from 'react'
import { ProductContextData } from '../Context/ProductContext.jsx'
import { Link } from 'react-router-dom';

const Product = () => {
    const { productData } = useContext(ProductContextData);
    const scrollContainerRef = useRef(null);
    const [showButton, setShowButton] = useState(false);

    const locateTop = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current.scrollTop > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        const container = scrollContainerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                ref={scrollContainerRef}
                className='p-10 h-screen gap-20 overflow-auto [&::-webkit-scrollbar]:hidden'
            >
                <h1 className='text-center text-6xl mb-6'>Product Page</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                    {productData.map((item) => (
                        <Link to={`/product/${item.id}`} key={item.id}>
                            <div className='border border-slate-500 p-5 h-110 rounded-lg flex flex-col justify-center items-center gap-5'>
                                <img src={item.image} alt={item.title} className='h-40 object-contain' />
                                <h2 className='text-xl font-bold'>{item.title}</h2>
                                <p className='text-lg font-semibold'>${item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {showButton && (
                <button
                    onClick={locateTop}
                    className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer fixed bottom-5 right-5'
                >
                    <i class="ri-arrow-up-s-fill"></i>
                </button>
            )}
        </>
    );
};

export default Product;
