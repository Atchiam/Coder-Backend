import ProductManager from "./ProductManager.js";
import express from "express";

const app  = express();
const PORT = 4000;
const manager= new ProductManager("./src/productos.json");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.send("Desafio numero 3, server con express "+ PORT)
});

app.get("/catalogo", async (req,res)=>{
    const products = await manager.getProducts();
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
});

app.get("/catalogo/:id", async(req,res)=>{
    const product = await manager.getProductByID(parseInt(req.params.id))
    res.send(product)
});

app.listen(PORT,()=>{
    console.log(`servidor en "localhost:${PORT}"`)
});