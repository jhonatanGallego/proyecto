const express =require("express");
const app=express();
const mysql = require ("mysql");
const cors = require("cors");
const { console } = require("inspector");
const multer = require('multer')
const path = require('path')
const fs = require('fs')


app.use(cors());
app.use(express.json());

const baseDatos =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"tienda"
});


/* lista los datos de la tabla de productos */
app.get("/listaProductos",(req,res)=> {
    baseDatos.query("SELECT * FROM producto",
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
});


/*Eliminar producto*/
app.delete("/deleteProducto/:id",(req,res) =>{
    const id= req.params.id;
    baseDatos.query("DELETE FROM producto WHERE id=?",[id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});


/* consulta la imgaen de un producto */
app.get("/imagenes/:id",(req,res)=> {
    const id= req.params.id;
    baseDatos.query("SELECT img1 FROM producto where id= ?",[id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{             
                res.send(result);
            }
        }
    );
});

/* Revisar como esta el inventario de un producto*/
app.get("/inventario/:id",(req,res)=> {
    const id= req.params.id;
    baseDatos.query("SELECT inventario FROM producto WHERE id = ?", [id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    ); 
});

/* Listar todos los usuarios de la tabla de usuarios */
app.get("/usuarios",(req,res)=> {
    baseDatos.query("SELECT * FROM usuarios",
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});

/* Buscar un usuario de la tabla de usuarios */
app.get("/buscarUsuario/:email",(req,res)=> {
    const email= req.params.email;
    baseDatos.query("SELECT * FROM usuarios usu, terceros ter where usu.user = ? and ter.cedula = usu.cedula_tercero", [email],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );  
});

/* Crear un nuevo usuario */
app.post("/createUsers",(req,res) =>{
    const user= req.body.users;
    const cedula= req.body.cedula;
    const nombre= req.body.nombre;
    const email= req.body.email;
    const telefono= req.body.telefono;
    const direccion= req.body.direccion;

    const password= req.body.password;
    
    
    baseDatos.query("INSERT INTO terceros (cedula, nombre, correo, telefono, direccion) VALUES(?,?,?,?,?)",[cedula,nombre,email,telefono,direccion],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Tercero registrado con exito");
            }
        }
    );

    baseDatos.query("INSERT INTO usuarios (user, password, cedula_tercero) VALUES(?,?,?)",[user,password,cedula],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Usuario registrado con exito");
            }
        }
    );
});

/*Actualizar un usuario */
app.put("/updateUsuario",(req,res) =>{
    const user= req.body.users;
    const cedula= req.body.cedula;
    const nombre= req.body.nombre;
    const email= req.body.email;
    const telefono= req.body.telefono;
    const direccion= req.body.direccion;

    const password= req.body.password;

    baseDatos.query("UPDATE tercero SET nombre=?, correo=?, telefono=?, direccion=? WHERE cedula=?",[nombre,email,telefono,direccion,cedula],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("usuario actualizado con exito");
            }
        }
    );

    baseDatos.query("UPDATE usuarios SET password=? WHERE user=?",[password,email],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("usuario actualizado con exito");
            }
        }
    );
});

//Funcion para borrar los datos en la base de datos.
app.delete("/deleteUsuarios/:users",(req,res) =>{
    const user= req.params.users;

    baseDatos.query("DELETE FROM usuarios WHERE user=?",[user],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});

/*Guardar imagenes*/
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../server/images/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

app.get('/public/', (req, res) => {
    res.send('Welcome to my image app')
})

/* Crear un nuevo producto */
app.post("/createProductos", fileUpload, (req,res) =>{
    const nombre= req.body.nombre;
    const img= req.body.name;
    const descripcion= req.body.descripcion;
    const inventario= req.body.inventario;
    const precio= req.body.precio;
    baseDatos.query("INSERT INTO producto(nombre, img, descripcion, inventario, precio) VALUE(?,?,?,?,?)",[nombre,img,descripcion,inventario,precio],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Usuario registrado con exito");
            }
        }
    );
});

/*Actualizar un producto */
app.put("/updateProducto", fileUpload,(req,res) =>{
    const id= req.body.id;
    const nombre= req.body.nombre;
    const img= req.body.img;
    const descripcion= req.body.descripcion;
    const inventario= req.body.inventario;
    const precio= req.body.precio;

    baseDatos.query("UPDATE producto SET nombre=?, img=?, descripcion=?, inventario=?, precio=? WHERE id=?",[nombre,img,descripcion,inventario,precio,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("producto actualizado con exito");
            }
        }
    );
});

app.post('/images/post', fileUpload,(req, res) => {
    const type = req.file.mimetype
    const name = req.file.originalname
    const data = fs.readFileSync(path.join(__dirname, '../server/images/' + req.file.filename))
    baseDatos.query("INSERT INTO imagenes(type, name, data) VALUE(?,?,?)",[type,name,data],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("imagen registrado con exito");
            }
        }
    );
})



/*Publicar imagenes desde el Server */
app.use(express.static('images/..'));


app.listen(3001,()=>{
    console.log("escuchando por puerto 3001");
});

/*Pruebas */