//Librerias de react
import React from 'react';
import { Routes, Route } from "react-router-dom";

//Componentes
import { Navbar } from "./componentes/navbar.jsx";
import {Footer} from "./componentes/Footer.jsx";

//Paginas
import Login from "./paginas/Login/Login.jsx";
import ActualizaDatos from "./paginas/Users/ActualizarDatos.jsx";
import Register from "./paginas/Registro/register.jsx";
import EditarPerfiles from "./paginas/Admin/EditarPerfiles/EditarPerfiles.jsx";
import EditarInventario from "./paginas/Admin/EditarProductos/EditarInventario.jsx";
import { Cart } from './paginas/Cart/cart';
import { Shop } from './paginas/Shop/shop';
import { ShopAddtoCart } from './paginas/ShopAddtoCart/shopAddtoCart.jsx';

//Context
import { ShopContextProvider } from "./context/shop-context";


function App() {
  return (
    <div className="App">
      <ShopContextProvider>     
          <Navbar />
          <Routes>
            <Route path="/shop" element={<ShopAddtoCart />}/>
            <Route path="/" element={<Shop />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/actualizarDatos" element={<ActualizaDatos />}/>
            <Route path="/editarPerfiles" element={<EditarPerfiles />}/>
            <Route path="/editarInventario" element={<EditarInventario />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
          <Footer />
      </ShopContextProvider> 
    </div>
  );
}

export default App;