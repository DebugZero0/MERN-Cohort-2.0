import React, { createContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const ProductContextData=createContext(); 

const ProductContext = ({ children }) => {
    const [productData, setproductData] = useState([])

    const getData = async () => {
        const resposne = await axios.get('https://fakestoreapi.com/products')
        setproductData(resposne.data)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <ProductContextData.Provider value={{ productData }}>
            {children}
        </ProductContextData.Provider>
    )
}

export default ProductContext
