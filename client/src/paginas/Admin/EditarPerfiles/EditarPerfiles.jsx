import React from "react";
import './EditarPerfiles.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const EditarPerfiles = () => {
    let existe = 0;
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    
    const [usuariosLista, setUsuarios] = useState([]);
    const [editar, setEditar] = useState(false);

    const getUsuarios = () => {
        axios.get("http://localhost:3001/usuarios").then((response) => {
            setUsuarios(response.data);
        });
    };

    const limpiarCampos = () => {
        setNombre("");
        setUsers("");
        setPassword("");
        setEmail("");
        setTelefono("");
        setEditar(false);
      };

    const editarEmpleado = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setUsers(val.user);
        setPassword(val.password);
        setEmail(val.email);
        setTelefono(val.telefono);
      };
    
    const eliminarUsuario = (user) => {
        axios.delete(`http://localhost:3001/deleteUsuarios/${user}`).then(() => {
          Swal.fire(`El usuario fue eliminado correctamente`);
          getUsuarios();
          limpiarCampos();
        });
      };

    const update = () =>{
        axios.put("http://localhost:3001/updateUsuario", {
            nombre: nombre,
            password: password,
            telefono: telefono,
            email: email,
            users: users,
        }).then(()=>{
            Swal.fire("Los campos fueron actualizados satisfactoriamente.");
            getUsuarios();
            limpiarCampos();
        });
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
            }
            
        }else{
            Swal.fire("Todos los campos son obligatorios.");
        }
    }

    return (
        <div>
            <div className="register-form">
                {editar?<h2>Actualizar Datos</h2>:<h2>Registrar nuevo dato</h2>}
                <form onSubmit={store} action="/auth" method="post">
                    <input 
                    value={nombre}
                    onChange={ (e) => setNombre(e.target.value)}
                    type="text" name="user" id="user" placeholder="Nombre completo"/>
                    <input 
                    value={password}
                    onChange={ (e) => setPassword((e.target.value))}
                    type="password" name="pass" id="pass" placeholder="Contraseña"/>
                    <input 
                    value={telefono}
                    onChange={ (e) => setTelefono(e.target.value)}
                    type="text" name="pass" id="pass" placeholder="telefono"/>
                    {editar?null:<input value={email} onChange={ (e) => setEmail(e.target.value)} type="text" name="pass" id="pass" placeholder="Correo electronico"/>}
                    {editar?null:<input type="submit" className="btn-login" value="Registrar" />}
                    
                </form>
                <br/> 
                {editar?<button  className="btn-login" onClick={update}>Actualizar Usuario</button>:null}
                <button  className="btn-cancel" onClick={getUsuarios}>Listar Usuarios</button>
            </div>
            <div className="table-head">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Usuario</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Nombre completo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    {usuariosLista.map((val, key) => {
                    return (
                        <tr>
                            <td scope="row">{val.user}</td>
                            <td>{"****"} </td>
                            <td>{val.email} </td>
                            <td>{val.telefono} </td>
                            <td>{val.nombre} </td>
                            <td>
                                <button type="button" onClick={() => {editarEmpleado(val);}}className="btn-editar">
                                    Editar
                                </button>
                                <button type="button" className="btn-eliminar" onClick={() => {eliminarUsuario(val.user);}}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    );
                    })}
                </table>
            </div>
        </div>       
    )
}

export default EditarPerfiles;