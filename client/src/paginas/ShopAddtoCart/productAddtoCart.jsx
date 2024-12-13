import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, nombre, precio, descripcion, img } = props.data; 
    const { addToCart, cartItems} = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
    return (
        <div className="product">
            <div className="slide-var">
                <ul>
                    <li><img src={`http://localhost:3001/images/${img}`} alt={nombre}/></li>
                </ul>
            </div>
            <div className="descripcion">
                <p>{descripcion}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{nombre}</b> 
                </p>
                <p> ${precio.toLocaleString('es-CO')}</p>
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}>
                Agregar al Carrito {cartItemAmount > 0 && <> ({cartItemAmount})</>} 
            </button>
        </div> 
    );
};