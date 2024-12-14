import React from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import Swal from 'sweetalert2';

const URI = 'http://localhost:3001/usuarios/';

const Login = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate();
    const navigateRegister = () => {
        navigate(`/register`);
    }

    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateShopAddtoCart = () => {
        navigate(`/shop`);
        
    }

    const navigateEditInventory = () => {
        navigate(`/editInventory`);
    }

    const [entrada, SetEntrada] = useState('');
    const [entradaP, SetEntradaP] = useState('');
    const [users, setUsers] = useState([]);
    

    const getUsers = async() => {
        const res = await axios.get(URI)
        setUsers(res.data)
    }

    const compare = () => {
        getUsers();
        if (users.find(e => e.user === entrada && e.password === entradaP)){
            return true;
        }else {
            return false;
        }
    }

    const nombreUsuario = async(correo) => {
        const res = await axios.get(`http://localhost:3001/buscarUsuario/${correo}`);
        let a = res.data;
        context.NombreUser(a.map(u => (
            u.nombre
       )));
       context.CedulaUser(a.map(u => (
        u.cedula
   )));
    }


    return (
        <div className="login-form">
            <h2>Iniciar sesión</h2>
            <form onSubmit={compare()}>
                <input 
                    value={entrada}
                    onChange={(e) => SetEntrada(e.target.value)}
                    type="text" name="user" id="user" placeholder="Usuario" />
                <input 
                    value={entradaP}
                    onChange={(e) => SetEntradaP((e.target.value))}  
                    type="password" name="pass" id="pass" placeholder="Contraseña" />
                <input type="submit" className="btn-login" value="Iniciar Sesión" onClick={(e) => {
                    e.preventDefault();
                    if(compare())
                    {
                        if (entrada === 'admin')
                        {
                            navigateEditInventory();
                            nombreUsuario(entrada);
                            context.AdminChanger(true);
                        }
                        else 
                            navigateShopAddtoCart();
                            nombreUsuario(entrada);
                            context.loggedChanger(true);
                    }else{
                        Swal.fire(`El usuario o contraseña esta mal digitada`);
                        navigateLogin() 
                    }
                }}/>
            </form>
            <div href="register" className="btn-register" onClick={navigateRegister}>Registrarse</div>
        </div>
    )
}

export default Login;