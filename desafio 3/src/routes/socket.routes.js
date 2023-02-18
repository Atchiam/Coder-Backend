import { Router } from "express";
import {ProductManager} from "../controllers/ProductManager.js"

const routerSocket = Router();
const productManager = new ProductManager('src/models/productos.json');

routerSocket.get('/realtimeproducts', async(req,res) => {
    const products = await productManager.getProducts()

    res.render("realTimeProducts", { 
        titulo: "PetsShop - Catalogo Tiempo real",
        products: products
    })
})

routerSocket.get('/', async(req,res) => {
    const productos = await productManager.getProducts()

    res.render("home", { 
        titulo: "PetsShop - Catalogo",
        products: productos
    })
})

export default routerSocket;