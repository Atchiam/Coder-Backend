import express from "express";
import routerProduct from "./routes/productos.routes.js";
import routerCarrito from "./routes/carritos.routes.js";
import { __dirname } from "./path.js";
import multer from "multer";
//import { Engine } from "express-handlebars/types/index.js";

//const upload = multer({dest:'src/public/img'}) //Forma basica de utilizar multer
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

//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
// app.engine("handlebars",engine());
// app.set("view")


//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts',routerCarrito)

//poner en el POSTMAN producto como key para mandar la foto
app.post('/upload',upload.single("producto"), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})