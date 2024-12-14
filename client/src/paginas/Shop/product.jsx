import React from 'react';
import { Link } from "react-router-dom";

export const Product = (props) => {
    const { nombre, precio, descripcion, img } = props.data;

    return (
        <div className="product">
            <div className="slide-var">
                <Link to="/login">
                    <ul>
                        <li><img className="logo" src={`http://localhost:3001/images/${img}`} alt={nombre}/></li>
                        <li><img className="logo" src={`http://localhost:3001/images/${img}`} alt={nombre}/></li>
                        <li><img className="logo" src={`http://localhost:3001/images/${img}`} alt={nombre}/></li>
                    </ul>
                </Link>
            </div>
            <div className="descripcion">
                <p>{descripcion}</p>
            </div>
            <div className="description"> 
                <p> <b>{nombre}</b></p>
                <p> ${precio.toLocaleString('es-CO')}</p>
            </div>
        </div> 
    );
};