import express from "express";
import { __dirname } from "./path.js";
import multer from "multer";
import { engine } from "express-handlebars";
import * as path from 'path'
import { Server } from "socket.io";
import mongoose from "mongoose";
//-----RUTAS
import routerProduct from "./routes/productos.routes.js";
import routerCarrito from "./routes/carritos.routes.js";
import routerSocket from "./routes/socket.routes.js";
import routerUser from "./routes/users.routes.js";

import { ProductManager } from "./controllers/ProductManager.js";

const productManager = new ProductManager('src/models/productos.json')

//------multer
const storage = multer.diskStorage({
    //donde va destinado el archivo subido
    destination: (req,file, cb) => {
        cb(null, 'src/public/img')
    },
    //nombre del archivo
    filename: (req,file,cb) => {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const app = express()
const PORT = 8080 


const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//------ServerIO
const io = new Server(server)

io.on("connection",async (socket)=>{ //io.on es cuando se establece la coneccion
    
    socket.on("AddProduct", async info => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        console.log(info);
        let titulo =info.title
        let descripcion =info.description
        let precio =info.price
        let imagen =info.thumbnail
        let stock =info.stock
        let code =info.code
        let nuevoProduct = await productManager.addProduct(titulo, descripcion, precio, imagen, stock, code);
        socket.emit("confirmacionAdd",nuevoProduct)
    })

    socket.on("EliminarProduct", async id => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        let productoBorrado = await productManager.deleteProduct(id) 
        socket.emit("confirmacionBorrado",productoBorrado)
    })

    socket.emit("getProducts",  await productManager.getProducts()); //emito info desde mi servidor
})

//-------Middlewares
//express
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
//handlebars
app.engine('handlebars', engine());
app.set("view engine", 'handlebars');
app.set('views', path.resolve(__dirname, './views'))
//Mongoose
mongoose.connect("mongodb+srv://Atchiam:Atchiamcoderhouse@cluster0.gbxrbnr.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("BD Conectado"))
.catch(error => console.log("error" +error ))

//--------Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/api/products', routerProduct) 
app.use('/api/carts',routerCarrito)
app.use('/users', routerUser)
