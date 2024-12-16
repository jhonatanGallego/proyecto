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
    const {cartItems, getTotalCartAmount, vaciarCart } = useContext(ShopContext); 
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    const[products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data)
    }

    const buy = async (e) => {
        e.preventDefault();

        {products.map((product) => {
            if (cartItems[product.id] !== 0) {
                registroCompra(product.id,context.cedulaUser,cartItems[product.id]);
            }
        })}
        Swal.fire(`Gracias por la compra de $${totalAmount.toLocaleString('es-CO')}`);
        vaciarCart();
        navigate ("/shop");
    }

    const registroCompra = async (id_producto,id_cedula,cantidad) => { 
        Swal.fire("Usuario creado satisfactoriamente");
        await axios.post('http://localhost:3001/registroCompra', {
            id_producto: id_producto, id_cedula: id_cedula, cantidad: cantidad 
        });       
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