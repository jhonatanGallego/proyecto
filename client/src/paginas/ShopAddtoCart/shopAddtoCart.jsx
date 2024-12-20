import React from 'react';
import { Product } from './productAddtoCart';
import './shopAddtoCart.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/listaProductos/';

export const ShopAddtoCart = () => {

    const[products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data)
    }
    return (
        <div className="shop">
            <div className="shopTitle">
                <spam>Tienda Virtual</spam><br/><br/>
                <img className="logo" src={`http://localhost:3001/images/tienda.png`}/>
            </div>
            <div className="products"> 
                {products.map((product) => (
                    <Product data={product} />
                ))}
            </div>
        </div>
    )
};