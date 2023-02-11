import { Router } from "express";
import { CarritoManager } from "../controllers/CarritoManager.js";
import { ProductManager } from "../controllers/ProductManager.js";

const routerCarrito = Router()
const carritoManager = new CarritoManager('src/models/carritos.json')
const productManager = new ProductManager('src/models/productos.json')

routerCarrito.post('/', async (req, res) => { 
    let mensaje = await carritoManager.crearCarrito()
    res.send(mensaje)
})

routerCarrito.post('/:idCarrito/product/:idProducto', async (req, res) => { 
    let idCarrito = parseInt(req.params.idCarrito)
    let idProducto = parseInt(req.params.idProducto)
    let prodEncontrado = await  productManager.getProductByID(idProducto)
    if(prodEncontrado){
        let mensaje = await carritoManager.addProductInCarrito(idCarrito,idProducto)
        res.send(mensaje)
    }else{
        res.send(prodEncontrado)
    }
})

routerCarrito.get('/:id', async (req, res) => { 
    const producto = await carritoManager.getCarritoByID(parseInt(req.params.id))
    console.log(producto)
    res.send(JSON.stringify(producto))
})


export default routerCarrito