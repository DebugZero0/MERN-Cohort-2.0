import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductContextData } from '../Context/ProductContext';


const ProductDetails = () => {
  const { productData } = useContext(ProductContextData);
  const { id } = useParams();
  const product = productData.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();
  
  return (
    <div className='p-5'>
      <h1>Product Details Page</h1>
      {product ? (
        <div className='flex flex-col justify-center items-center gap-8 mt-8'>
          <img src={product.image} alt={product.title} className='h-55 object-contain' />
          <h2 className='text-2xl font-bold'>{product.title}</h2>
          <p className='text-lg font-semibold'>${product.price}</p>
          <p className='max-w-md text-center'>{product.description}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )} 
      <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-4xl cursor-pointer absolute bottom-5 left-5 '
      onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default ProductDetails
