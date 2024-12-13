import React, { useState, Fragment } from "react";
import './EditarInventario.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditarInventario = () => {
    const [nombre, setNombre] = useState('');
    const [img, setImg] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [inventario, setInventarios] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [id, setId] = useState(0);
    
    const [productosLista, setProductos] = useState([]);
    const [editar, setEditar] = useState(false);

    const [file, setFile] = useState(null);

    const getProductos = () => {
        axios.get("http://localhost:3001/listaProductos").then((response) => {
            setProductos(response.data);
        });
    };

    const limpiarCampos = () => {
        setNombre("");
        setImg("");
        setDescripcion("");
        setInventarios(0);
        setPrecio(0);
        setEditar(false);
    };

    const editarProducto = (val) => {
        setEditar(true);
        setId(val.id);
        setNombre(val.nombre);
        setImg(val.img);
        setDescripcion(val.descripcion);
        setInventarios(val.inventario);
        setPrecio(val.precio);
    };
    
    const eliminarProducto = (id) => {
        axios.delete(`http://localhost:3001/deleteProducto/${id}`).then(() => {
            Swal.fire(`El producto fue eliminado correctamente`);
            getProductos();
            limpiarCampos();
        });
    };

    const update = () =>{
        if(!file){
            axios.put("http://localhost:3001/updateProducto", {
                id: id,
                nombre: nombre,
                img: img,
                descripcion: descripcion,
                inventario: inventario,
                precio: precio,
            }).then(()=>{
                Swal.fire("Los campos fueron actualizados satisfactoriamente.");
                getProductos();
                limpiarCampos();
            });
        }else{
            axios.put("http://localhost:3001/updateProducto", {
                id: id,
                nombre: nombre,
                img: file.name,
                descripcion: descripcion,
                inventario: inventario,
                precio: precio,
            }).then(()=>{
                Swal.fire("Los campos fueron actualizados satisfactoriamente.");
                sendHandler();
                getProductos();
                limpiarCampos();
            });
        }      
    }

    const store = async (e) => { 
        e.preventDefault();
        if(!file){
            Swal.fire("Se debe cargar un archivo.");
            return
        }

        const formdata = new FormData();

        formdata.append('image', file);
        await axios.post('http://localhost:3001/createProductos', {
            name: file.name,
            type: file.type,
            nombre: nombre,
            img: formdata,
            descripcion: descripcion,
            inventario: inventario,
            precio: precio, })
            .then(()=>{
                Swal.fire("El producto fue creado satisfactoriamente.");
                sendHandler();
                getProductos();
                limpiarCampos();
            });   
    }

    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const sendHandler = () => {
        if(!file){
            Swal.fire("Debes cargar una imagen.");
            return
        }

        const formdata = new FormData()
        formdata.append('image', file)  
      
        fetch('http://localhost:3001/images/post', {
            method: 'POST',
            body: formdata
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => {
            console.error(err)
        })

        document.getElementById('fileinput').value = null

        setFile(null)
    }

    return (
        <div>
            <div className="register-form">
                {editar?<h2>Actualizar Datos de un producto</h2>:<h2>Registrar nuevo producto</h2>}
                <form onSubmit={store} action="/auth" method="post">
                    <input 
                    value={nombre}
                    onChange={ (e) => setNombre(e.target.value)}
                    type="text" name="user" id="user" placeholder="Nombre del producto"/>
                    {/*<input 
                    value={img}
                    onChange={ (e) => setImg((e.target.value))}
                    type="text" name="pass" id="pass" placeholder="imagen"/>*/}
                    <input id="fileinput" onChange={selectedHandler} className="form-control" type="file"/>
                    <input 
                    value={descripcion}
                    onChange={ (e) => setDescripcion(e.target.value)}
                    type="text" name="pass" id="pass" placeholder="descripcion del producto"/>
                    <input 
                    value={inventario}
                    onChange={ (e) => setInventarios(e.target.value)}
                    type="number" name="pass" id="pass" placeholder="inventario"/>
                    <input 
                    value={precio}
                    onChange={ (e) => setPrecio(e.target.value)}
                    type="number" name="pass" id="pass" placeholder="precio del producto"/>
                    {editar?null:<input type="submit" className="btn-login" value="Registrar" />}
                    
                </form>
                <br/> 
                {editar?<button  className="btn-login" onClick={update}>Actualizar producto</button>:null}
                <button  className="btn-cancel" onClick={getProductos}>Listar Producto</button>
            </div>
            <div className="table-head">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre del producto</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Inventario</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    {productosLista.map((val, key) => {
                    return (
                        <tr>
                            <td scope="row">{val.id}</td>
                            <td>{val.nombre} </td>
                            <td className="td-img">
                              <img src={`http://localhost:3001/images/${val.img}`}/> 
                            </td>
                            <td>{val.descripcion} </td>
                            <td>{val.inventario} </td>
                            <td>{val.precio.toLocaleString('es-CO')} </td>
                            <td>
                                <button type="button" onClick={() => {editarProducto(val);}}className="btn-editar">
                                    Editar
                                </button>
                                <button type="button" className="btn-eliminar" onClick={() => {eliminarProducto(val.id);}}>
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

export default EditarInventario;