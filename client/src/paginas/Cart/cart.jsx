import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import "./cart.css";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const URI = 'http://localhost:3001/listaProductos/';


export const Cart = () => {
    const context = useContext(ShopContext);
    const { cartItems, getTotalCartAmount } = useContext(ShopContext); 
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    const[products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data)
    }

    const buy = async (e) => {
        e.preventDefault();
        context.setPayAumount(totalAmount);
            Swal.fire(`Gracias por la compra ${totalAmount}`);    
            context.setCartItems(0);
            navigate ("/shop")
    }

    return (
        <div className="cart">
            <div> 
                <h1> Lista de productos</h1>
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? 
            <div className="checkout">
                <p> Subtotal: ${totalAmount.toLocaleString('es-CO')}</p>
                <div className='contenedorCheckout'>
                    <button onClick={() => navigate ("/shop")}> Continuar Comprando</button>
                    <button onClick={buy}> Pagar </button>
                </div>
            </div>
            : <h1> Tu carrito esta vacio </h1>}
        </div>
    )
};