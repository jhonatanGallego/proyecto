import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../hoja-de-estilos/navbar.css";
import { ShopContext } from "../context/shop-context";
import { IconBuildingStore, IconUserCircle, buildingStore } from '@tabler/icons-react';


export const Navbar = () => {
    const context = useContext(ShopContext);

    return (
        <div className="navbar">
        { !context.admin ? 
            !context.logged ?
                <div className="links"> 
                    <Link to="/"> 
                        <IconBuildingStore stroke={2} size={50}/>
                    </Link>
                    <Link to="/login">
                        <IconUserCircle stroke={2} size={50}/>
                    </Link>
                </div>
                :
                <div className="links">
                    <div >
                        <p className="bienvenido">Bienvenido {context.nombreUser} </p>
                    </div>
                    <div className="links">
                        <Link to="/actualizarDatos">Actualizar datos</Link>
                        <Link to="/shop"> Seguir Comprando </Link>
                        <Link to="/cart"> Pagar</Link>
                    </div>
                </div>    
            :
            <div className="links">
                    <Link to="/editarInventario"> Editar inventario </Link>
                    <Link to="/editarPerfiles"> Administrar usuarios </Link>
            </div>
        }
        </div>
    )
};