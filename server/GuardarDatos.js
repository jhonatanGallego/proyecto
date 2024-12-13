const express =require("express");
const app=express();
const mysql = require ("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());



const baseDatos =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sistemas_tech"

});

//Funcion para insertar un nuevo registro
app.post("/create",(req,res) =>{
    const nombre= req.body.nombre;
    const edad= req.body.edad;
    const pais= req.body.pais;
    const cargo= req.body.cargo;
    const anio= req.body.anio;

    baseDatos.query("INSERT INTO empleados(nombre, edad, pais, cargo, anio) VALUE(?,?,?,?,?)",[nombre,edad,pais,cargo,anio],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("empleado registrado con exito");
            }
        });
});

//Funcion para consultar los usuarios de la BD.
app.get("/read",(req,res)=> {
    baseDatos.query("SELECT * FROM empleados",
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
});


//Funcion para consultar la BD.
app.get("/filtro/:TipoFiltro/:ValorFiltro",(req,res)=> {
    const TipoFiltro= req.params.TipoFiltro;
    const ValorFiltro= req.params.ValorFiltro;
    let query=null;
    
    query=`SELECT * FROM empleados where ${TipoFiltro}=?`;
    
    console.log(query);
    baseDatos.query(query, [ValorFiltro],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    
})

//Funcion para actualizar los datos en la base de datos.
app.put("/update",(req,res) =>{
    const id= req.body.id;
    const nombre= req.body.nombre;
    const edad= req.body.edad;
    const pais= req.body.pais;
    const cargo= req.body.cargo;
    const anio= req.body.anio;

    baseDatos.query("UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anio=? WHERE id=?",[nombre,edad,pais,cargo,anio,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("empleado actualizado con exito");
            }
        });
});

//Funcion para borrar los datos en la base de datos.
app.delete("/delete/:id",(req,res) =>{
    const id= req.params.id;

    baseDatos.query("DELETE FROM empleados WHERE id=?",[id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
});

app.listen(3001,()=>{
    console.log("escuchando por puerto 3001");
});


