import React from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


const Register = () => {
    let existe = 0;
    const [nombre, setNombre] = useState(''); //todo esto son valores que se registran en la base de datos
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateRegister = () => {
        navigate(`/register`);
    }


    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        const res = await axios.get('http://localhost:3001/usuarios/')
        setUsers(res.data)
    }

    const getBuscarUser = async(email) => {
        const res = await axios.get(`http://localhost:3001/buscarUsuario/${email}`);
        existe = res.data.length; 
    }

    const atras = () => {
        navigateLogin();
    }

    const store = async (e) => { 
        e.preventDefault();
        if (nombre && password && telefono && email){
            getBuscarUser(email);
            console.log(existe);
            if(existe>=1){
                Swal.fire("El usuario digitado ya existe en la base de datos.");
            }else{
                Swal.fire("Usuario creado satisfactoriamente");
                await axios.post('http://localhost:3001/createUsers', {
                    nombre: nombre, password: password, telefono: telefono, email: email, users: email });
                navigateLogin();
                
            }
            
        }else{
            Swal.fire("Todos los campos son obligatorios.");
        }
    }

    return (

        <div className="register-form">
            <h2>Registro</h2>
            <form onSubmit={store} action="/auth" method="post">
                <input 
                value={nombre}
                onChange={ (e) => users.find(event => event.username === e.target.value) ? navigateRegister() : setNombre(e.target.value)}
                type="text" name="user" id="user" placeholder="Nombre completo"/>
                <input 
                value={password}
                onChange={ (e) => setPassword((e.target.value))}
                type="password" name="pass" id="pass" placeholder="Contraseña"/>
                <input 
                value={telefono}
                onChange={ (e) => setTelefono(e.target.value)}
                type="text" name="pass" id="pass" placeholder="telefono"/>
                <input 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                type="text" name="pass" id="pass" placeholder="Correo electronico"/>
                <input type="submit" className="btn-login" value="Registrar" />
            </form>
            <br/> 
            <button  className="btn-cancel" onClick={atras}>Atras</button>
        </div>       
    )
}

export default Register;