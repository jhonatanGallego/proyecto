import React from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


const Register = () => {
    let existe = 0;
    const [users, setUsers] = useState([]);
    const [tipoIdents, setTipoIdents] = useState([]);
    //Valores es para crear el tercero
    const [tipoIdent, setTipoIdent] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    //Valores para crear el usuario
    const [password, setPassword] = useState('');
    
    
    
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateRegister = () => {
        navigate(`/register`);
    }


    useEffect(() => {
        getUsers();
        getTiposIdentificacion();
    }, [])

    const getUsers = async() => {
        const res = await axios.get('http://localhost:3001/usuarios/')
        setUsers(res.data)
    }

    const getBuscarUser = async(email) => {
        const res = await axios.get(`http://localhost:3001/buscarUsuario/${email}`);
        existe = res.data.length; 
    }

    const getTiposIdentificacion = async() => {
        const res = await axios.get(`http://localhost:3001/listaTiposIdentif`);
        console.log(res.data);
        setTipoIdents(res.data);
    }
    

    const atras = () => {
        navigateLogin();
    }

    const store = async (e) => { 
        e.preventDefault();
        if (nombre && password && telefono && email && cedula && direccion && tipoIdent){
            getBuscarUser(email);
            if(existe>=1){
                Swal.fire("El usuario digitado ya existe en la base de datos.");
            }else{
                Swal.fire("Usuario creado satisfactoriamente");
                //Para crear el tercero
                await axios.post('http://localhost:3001/createTercero', {
                    nombre: nombre, telefono: telefono, email: email, cedula: cedula, direccion: direccion, tipoIdent: tipoIdent });

                //Para crear el usuario
                await axios.post('http://localhost:3001/createUsers', {
                    users: email, password: password, cedula: cedula});
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
            <select value={tipoIdent}  onChange={ (e) => setTipoIdent(e.target.value)} required>
                <option selected disabled value="">Tipo de identificación</option>
                {tipoIdents.map((tiposIde) => (
                    <option value={tiposIde.id}>{tiposIde.descripcion}</option>
                ))}
            </select>
            <input 
                value={cedula}
                onChange={ (e) => setCedula(e.target.value)}
                type="number" name="cedula" id="cedula" placeholder="Numero de identificación" maxLength="11"/>
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
                value={direccion}
                onChange={ (e) => setDireccion(e.target.value)}
                type="text" name="pass" id="pass" placeholder="Dirección"/>
                <input 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                type="email" name="email" id="email" placeholder="Correo electronico"/>
                <input type="submit" className="btn-login" value="Registrar" />
            </form>
            <br/> 
            <button  className="btn-cancel" onClick={atras}>Atras</button>
        </div>       
    )
}

export default Register;