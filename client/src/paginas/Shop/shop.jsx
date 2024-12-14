import React from 'react';
import { Product } from './product';
import './shop.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import MenuSlider from "../../componentes/MenuSlider";

const URI = 'http://localhost:3001/listaProductos/';

export const Shop = () => {
    
    const[products,setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data)
    };
 
    return (
        <div className="shop">
            <div className="shopTitle">
                <MenuSlider/>
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