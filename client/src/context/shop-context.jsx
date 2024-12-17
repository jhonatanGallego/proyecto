import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const ShopContext = createContext(null);
const URI = 'http://localhost:3001/listaProductos';

const getDefaultCart = () => {
    let cart = {}
    for(let i = 1; i < 100 ; i++) {
        cart[i] = 0
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [payAumount,setPayAumount] = useState(0);

    const[products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, []);

    const [inventario, setInventario] = useState([]);

    const [logged, setLogged] = useState(0);
    const loggedChanger = (value) => setLogged(value);

    const [admin, setAdmin] = useState(false);
    const AdminChanger = (value) => setAdmin(value);
    
    const [nombreUser, setNombreUser] = useState('');
    const NombreUser = (value) => setNombreUser(value);

    const [cedulaUser, setCedulaUser] = useState('');
    const CedulaUser = (value) => setCedulaUser(value);
    
    const getProducts = async () => {
        const res = await axios.get(URI)
        setProducts(res.data);

    }

    const getInventario = () => {
        let stock = 0;
        stock = inventario.map(inv => (
            stock = inv.inventario
        ));
        return stock;
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.precio;
            }
        }
        return totalAmount;
    };



    const addToCart = (itemId) => { 
        axios.get(`http://localhost:3001/inventario/${itemId}`)
        .then(({ data }) => {
           setInventario(data);
            let cant = getInventario();
               cant> 0 ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 })) : void(0);
               cant===0 ? Swal.fire(`El inventario esta vacio`) : void(0);           
        })
        .catch(error => {
            console.log(error.message);
        }) 
    };

    const removeFromCart = async (itemId) => { 
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
    };

    const vaciarCart = () => { 
        setCartItems(getDefaultCart());
    };

    const contextValue = { cartItems, addToCart, removeFromCart, vaciarCart, getTotalCartAmount, loggedChanger, logged, AdminChanger, admin,
                           payAumount,setPayAumount, nombreUser, NombreUser, cedulaUser, CedulaUser};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};