import React from "react";
import './EditarPerfiles.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const EditarPerfiles = () => {
    let existe = 0;
    //Usuario
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    //Tercero
    const [nombre, setNombre] = useState('');
    const [tipoIdentificacion, setTipoIdentificacion] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    
    
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
        setTipoIdentificacion("");
        setCedula("");
        setDireccion("");
        setEditar(false);
      };

    const editarTercero = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setUsers(val.user);
        setPassword(val.password);
        setEmail(val.correo);
        setTelefono(val.telefono);
        setTipoIdentificacion(val.Tipo_identificacion);
        setCedula(val.cedula);
        setDireccion(val.direccion);
      };
    
    const inactivarUsuario = (cedula,activar) => {
        axios.put("http://localhost:3001/inactivarUser", {
            cedula: cedula,
            activar: activar,
        }).then(()=>{
            console.log(cedula+"+"+activar)
          Swal.fire(`El usuario fue inactivado correctamente`);
          getUsuarios();
          limpiarCampos();
        });
      };

    const update = () =>{
        axios.put("http://localhost:3001/updateUsuario", {
            nombre: nombre,
            telefono: telefono,
            email: email,
            cedula: cedula,
            direccion: direccion,
        }).then(()=>{
            Swal.fire("Los campos fueron actualizados satisfactoriamente.");
            getUsuarios();
            limpiarCampos();
        });

        //Si el Admin actualiza la contraseña del usuario
        if(password){
            axios.put("http://localhost:3001/updateUser", {
                password: password,
                cedula: cedula,
            }).then(()=>{
                Swal.fire("La contraseña fue actualizado satisfactoriamente.");
                getUsuarios();
                limpiarCampos();
            });
        }
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
        if (nombre && password && telefono && email &&cedula &&direccion){
            getBuscarUser(email);
            if(existe>=1){
                Swal.fire("El usuario digitado ya existe en la base de datos.");
            }else{
                Swal.fire("Usuario creado satisfactoriamente");
                await axios.post('http://localhost:3001/createTercero', {
                    nombre: nombre, password: password, telefono: telefono, email: email, users: email,
                    cedula: cedula, direccion: direccion, tipoIdent: tipoIdentificacion });
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
                    {editar?<input value={tipoIdentificacion} onChange={ (e) => setTipoIdentificacion(e.target.value)} type="text" name="tipoIdentif" id="tipoIdentif" placeholder="tipo de identificación" disabled/>
                    :<input value={tipoIdentificacion} onChange={ (e) => setTipoIdentificacion(e.target.value)} type="text" name="tipoIdentif" id="tipoIdentif" placeholder="tipo de identificación"/>}
                    {editar?<input value={cedula} onChange={ (e) => setCedula(e.target.value)} type="text" name="cedula" id="cedula" placeholder="Cedula" disabled/>
                    :<input value={cedula} onChange={ (e) => setCedula(e.target.value)} type="text" name="cedula" id="cedula" placeholder="Cedula"/>}
                    <input 
                    value={nombre}
                    onChange={ (e) => setNombre(e.target.value)}
                    type="text" name="nombre" id="nombre" placeholder="Nombre completo"/>
                    <input 
                    value={password}
                    onChange={ (e) => setPassword((e.target.value))}
                    type="password" name="pass" id="pass" placeholder="Nueva Contraseña"/>
                    <input 
                    value={telefono}
                    onChange={ (e) => setTelefono(e.target.value)}
                    type="text" name="telefono" id="telefono" placeholder="telefono"/>
                    <input 
                    value={direccion}
                    onChange={ (e) => setDireccion(e.target.value)}
                    type="text" name="direccion" id="direccion" placeholder="Direccion"/>
                    {editar?null:<input value={email} onChange={ (e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Correo electronico"/>}
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
                            <th scope="col">Tipo Identificación</th>
                            <th scope="col">Nro Identificación</th>
                            <th scope="col">Nombre completo</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Correo electronico</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Activo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    {usuariosLista.map((val, key) => {
                    return (
                        <tr>
                            <td scope="row">{val.user}</td>
                            <td>{"********"} </td>
                            <td>{val.tipo_identificacion} </td>
                            <td>{val.cedula} </td>
                            <td>{val.nombre} </td>
                            <td>{val.telefono} </td>
                            <td>{val.correo} </td>
                            <td>{val.direccion} </td>
                            <td>{val.activo} </td>
                            <td>
                                <button type="button" onClick={() => {editarTercero(val);}}className="btn-editar">
                                    Editar
                                </button>
                                {val.activo=="Y"?<button type="button" className="btn-eliminar" onClick={() => {inactivarUsuario(val.cedula,'N');}}>Inactivar</button>:
                                <button type="button" className="btn-activar" onClick={() => {inactivarUsuario(val.cedula,'Y');}}>Activar</button>}
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