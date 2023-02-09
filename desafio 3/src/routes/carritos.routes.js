import { Router } from "express";
import { CarritoManager } from "../controllers/CarritoManager";

const routerCarrito = Router()
const carritoManager = new CarritoManager('src/models/productos.json')

routerCarrito.get('/', async (req, res) => { 
    const { limit } = req.query; 
    console.log(limit)
    const productos = await carritoManager.getProducts()
    console.log(productos)
    res.send(JSON.stringify(productos))
})

routerCarrito.get('/:id', async (req, res) => { 
    const producto = await carritoManager.getProductById(req.params.id)
    console.log(producto)
    res.send(JSON.stringify(producto))
})

routerCarrito.post('/', async (req, res) => { 
    let mensaje = await carritoManager.addProduct(req.body)
    res.send(mensaje)
})

routerCarrito.delete('/:id', async (req, res) => {
    let mensaje = await carritoManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})

routerCarrito.put('/:id', async (req, res) => { 
    let mensaje = await carritoManager.updateProduct(req.params.id, req.body)
    res.send(mensaje)
})

export default routerCarrito