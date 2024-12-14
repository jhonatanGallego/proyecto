import React from "react";
import './ActualizarDatos.css';
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import Swal from 'sweetalert2';
import { ShopContext } from "../../context/shop-context";


const EditarPerfiles = () => {
    const context = useContext(ShopContext);
    //Usuario
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    //Tercero
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    

   
    const update = () =>{
        axios.put("http://localhost:3001/updateUsuario", {
            nombre: nombre,
            telefono: telefono,
            email: email,
            cedula: cedula,
            direccion: direccion,
        }).then(()=>{
            Swal.fire("Los campos fueron actualizados satisfactoriamente.");
         });

        //Si el ususario actualiza la contraseña del usuario
        if(password){
            axios.put("http://localhost:3001/updateUser", {
                password: password,
                cedula: cedula,
            }).then(()=>{
                Swal.fire("La contraseña fue actualizado satisfactoriamente.");
            });
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const consultarDatos =() =>{
        users.forEach((val, key) => {
            setNombre(val.nombre);
            setPassword(val.password);
            setEmail(val.correo);
            setTelefono(val.telefono);
            setCedula(val.cedula);
            setDireccion(val.direccion);
            console.log(val.direccion);
        })
    }

    const getUsers = async() => {
        const res = await axios.get(`http://localhost:3001/buscarCedula/${context.cedulaUser}`);
        setUsers(res.data);
        consultarDatos();
         
    }

    return (
        <div>
            <div className="register-form">
                <h2>Actualizar Datos</h2>
                <form>
                    <input value={cedula} onChange={ (e) => setCedula(e.target.value)} type="text" name="cedula" id="cedula" placeholder="Cedula" disabled/>
                    <input value={nombre} onChange={ (e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" placeholder="Nombre completo"/>
                    <input value={password} onChange={ (e) => setPassword((e.target.value))} type="password" name="pass" id="pass" placeholder="Nueva Contraseña"/>
                    <input value={telefono} onChange={ (e) => setTelefono(e.target.value)} type="text" name="telefono" id="telefono" placeholder="telefono"/>
                    <input value={direccion} onChange={ (e) => setDireccion(e.target.value)} type="text" name="direccion" id="direccion" placeholder="Direccion"/>
                    <input value={email} onChange={ (e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Correo electronico" disabled/>
                </form>
                <br/> 
                <button  className="btn-login" onClick={update}>Actualizar Usuario</button>
            </div>
        </div>       
    )
}

export default EditarPerfiles;