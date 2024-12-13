import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
    const { id, nombre, precio, img } = props.data;
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    return  (
        <div className="cartItem">
            <img src={`http://localhost:3001/images/${img}`} />
            <div className="description">
                <p> 
                    <b> {nombre} </b>
                </p>
                <p> ${precio.toLocaleString('es-CO')} </p>
                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}> - </button>
                    <input value={cartItems[id]} />
                    <button onClick={() => addToCart(id)}> + </button>
                </div>
            </div>
        </div>
    );
};