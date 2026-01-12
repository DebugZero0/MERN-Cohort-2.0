import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Product from './Pages/Product'
import ProductDetails from './Pages/ProductDetails'

function App() {

  return (
    <>
      <div className='h-screen w-screen bg-slate-900 text-white '>
        <Routes>
          <Route path='/' element={<Home  />} />
          <Route path='/product' element={<Product  />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
