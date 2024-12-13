import React, { useState } from "react";
import Axios from "axios";
import '../hoja-de-estilos/IngresoDatos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

/*No esta en uso*/
function GuardarDatos(){
    const [nombre, setNombre]=useState("");
    const [edad, setEdad]=useState(0);
    const [pais, setPais]=useState("");
    const [cargo, setCargo]=useState("");
    const [anio, setAnios]=useState(0);
    const [id, setId]=useState(0);

    //Filtro de empleados
    const [TipoFiltro, setTipoFiltro]=useState("");
    const [ValorFiltro, setValorFiltro]=useState("");

    const [empleadosList,setEmpleados] =useState([]);
    const [editar, setEditar]=useState(false);
    const [filtro, setFiltro]=useState(false);

    const mostrarDatos = () =>{
        if(nombre && edad && pais && cargo && anio){   
            Axios.post("http://localhost:3001/create", {
                nombre:nombre,
                edad:edad,
                pais:pais,
                cargo:cargo,
                anio:anio
            }).then(()=>{
                alert("empresa registrado");
                getEmpleados();
            });    
        }
    }

    const getEmpleados = () =>{
        Axios.get("http://localhost:3001/read").then((response)=>{
          setEmpleados(response.data);        
        });
    }

    const update = () =>{
        Axios.put("http://localhost:3001/update", {
            id:id,
            nombre:nombre,
            edad:edad,
            pais:pais,
            cargo:cargo,
            anio:anio,
        }).then(()=>{
            getEmpleados();
            limpiarCampos();
        });
    }

    const limpiarCampos = () =>{
        setNombre("");
        setEdad(0);
        setPais("");
        setCargo("");
        setAnios(0);
        setId(0);
    }

    const editarEmpleado = (val) => {
        setEditar(true);

        setNombre(val.nombre);
        setEdad(val.edad);
        setPais(val.pais);
        setCargo(val.cargo);
        setAnios(val.anio);
        setId(val.id);
    }

    const deleteEmpleado = (id) =>{
        Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
          alert("eliminado");
          getEmpleados();
          limpiarCampos();
        });
    }

    const activarFiltro = () =>{
        setFiltro(true);
    }

    const filtroConsulta = () =>{
        Axios.get(`http://localhost:3001/filtro/${TipoFiltro}/${ValorFiltro}`).then((response)=>{
            setEmpleados(response.data);
        });
    }

    return (
        <div className="App">
            <div className='datos'>
                <div>
                    <div className="card header">
                        Guardar datos
                    </div>
                    <form className="row g-3">
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <div className="col-md-4">
                            <label htmlFor="validationDefault01" className="form-label">Nombre:</label>
                            <input onChange={(event) =>{setNombre(event.target.value);}} type='text' value={nombre} className="form-control" id="validationDefault01" required/>
                            <div className="invalid-feedback">
                                Proporciona una ciudad válida.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Edad:</label>
                            <input onChange={(event) =>{setEdad(event.target.value);}} type='number' value={edad} className="form-control" id="validationDefault02" required/>
                            <div className="valid-feedback">
                                ¡Se ve bien!
                            </div>
                        </div>   
                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">Pais:</label>
                            <input onChange={(event) =>{setPais(event.target.value);}} type='text' value={pais} className="form-control" id="validationDefault03" required/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom04" className="form-label">Cargo:</label>
                            <input onChange={(event) =>{setCargo(event.target.value);}} type='text' value={cargo} className="form-control" id="validationDefault04" required/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom05" className="form-label">Año:</label>
                            <input onChange={(event) =>{setAnios(event.target.value);}} type='number' value={anio} className="form-control" id="validationDefault05" required/>
                        </div>
                        <div className="card footer text-body-secondary">
                            <ButtonToolbar aria-label="Toolbar with button groups">
                            {
                                editar?<button className="btn btn-warning" onClick={update}>Actualizar</button>
                                :<button className="btn btn-success" onClick={mostrarDatos}>Registrar</button>
                            }
                            </ButtonToolbar>
                        </div>
                    </form>  
                    <div className="card footer text-body-secondary">
                            <ButtonToolbar aria-label="Toolbar with button groups">
                                <button className="btn btn-info" onClick={getEmpleados}>Listar Empleados</button>
                                <button className="btn btn-warning" onClick={activarFiltro}>Filtros </button>
                            </ButtonToolbar>
                        {
                            filtro?<div className='datos'>
                                        <h4>Filtro</h4>
                                        <div className="col-md-4">
                                            <select name="" id="" onChange={(event) =>{setTipoFiltro(event.target.value);}}>
                                                <option value="nombre">Nombre</option>
                                                <option value="edad">Edad</option>
                                                <option value="pais">Pais</option>
                                                <option value="cargo">Cargo</option>
                                                <option value="anio">Año</option>
                                            </select>
                                            <input onChange={(event) =>{setValorFiltro(event.target.value);}} type='text' value={ValorFiltro} className="form-control" id="validationDefault01" required/>
                                            <button className="btn btn-success" onClick={filtroConsulta}>Filtrar</button>
                                        </div>
                                    </div>
                            :null
                        }
                    </div>
                </div>
                <div className='listar'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Pais</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Año</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                                {
                                    empleadosList.map((val,key)=>{
                                        return <tr>
                                            <th scope="row">{val.id}</th>
                                            <td>{val.nombre} </td>
                                            <td>{val.edad} </td>
                                            <td>{val.pais} </td>
                                            <td>{val.cargo} </td>
                                            <td>{val.anio} </td>
                                            <td>
                                                <button type="button"
                                                onClick={()=> {
                                                editarEmpleado(val)     
                                                }}  
                                                className="btn btn-info">Editar</button>
                                                <button type="button" 
                                                        className="btn btn-danger"
                                                        onClick={()=>{
                                                            deleteEmpleado(val.id)}
                                                        }>Eliminar</button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </table>
                </div>
            </div>
        </div>
    );
};

export default GuardarDatos;