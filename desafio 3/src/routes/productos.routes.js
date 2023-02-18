import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerProduct = Router()
const productManager = new ProductManager('src/models/productos.json')

routerProduct.get('/', async (req, res) => { 
    const products = await productManager.getProducts();
    let limit  =parseInt(req.query.limit);
    let data;
    console.log(limit)
    if (limit) {
        if(limit < 0 || limit > products.length){
            data=`el limite debe ser un numero positivo y menor al numero ${products.length}`
        }else{data = products.slice(0, limit);}
    } else {
        data = products;
    }
    res.send(data);
})

routerProduct.get('/:id', async (req, res) => { 
    const product = await productManager.getProductByID(parseInt(req.params.id))
    res.send(product)
})

routerProduct.post('/', async (req, res) => { 
    let titulo = req.body.title
    let descripcion = req.body.description
    let precio = req.body.price
    let imagen = req.body.imagen
    let stock = req.body.stock
    let code = req.body.code
    const nuevoProduct = await productManager.addProduct(titulo, descripcion, precio, imagen, stock, code);
    res.send(nuevoProduct)
})

routerProduct.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})

routerProduct.put('/:id', async (req, res) => { 
    let titulo = req.body.title;
    let descripcion = req.body.description;
    let precio = req.body.price;
    let imagen = req.body.imagen;
    let stock = req.body.stock;
    let code = req.body.code;
    let id = parseInt(req.params.id);
    let updateProduct = await productManager.updateProduct(id, titulo, descripcion, precio, imagen, stock, code)
    res.send(`se modifico exitosamente ${updateProduct}`)
})

export default routerProduct