import {promises as fs} from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct (titulo, descripcion, precio, imagen, stock, code) {
        try{
            let valid  = [titulo, descripcion, precio, stock, code]
            const read = await fs.readFile(this.path, "utf8");
            const data = JSON.parse(read);
            const objCode = data.find((product) => product.code == code);
            let id

            if(objCode){
                throw error;
            }else{
                if(valid.includes(null)||valid.includes("")||valid.includes(undefined)){
                    console.log("Todos los campos deben estar completos");
                }else{
                    data.length > 0 ? id=data[parseInt(data.length) - 1].id + 1 : id = 1
                    let nuevoProducto = new Product(titulo, descripcion, precio, imagen ?? "sin img", stock, code,id);
                    data.push(nuevoProducto);
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    return (`El Producto: ${nuevoProducto} se creo con exito`)
                    
                }
            }
        }catch (error){
            console.log("El code del producto ya se encuentra en uso" + error);
        };
    }

    async getProducts() {
        try {
        const read = await fs.readFile(this.path, "utf8");
        return (JSON.parse(read)); 
        } catch (error) {
        throw error;
        }
    }

    async getProductByID(id) {
        try {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const product = data.find((product) => product.id === id);
        if (product) {
            return (product);
        } else {
            return (`El id seleccionado no corresponde a ninguno de nuestros productos`);
        }
        } catch (error) {
        throw error;
        }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(prods.some(prod => prod.id === parseInt(id))) {
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    }

    async updateProduct(id, titulo, descripcion, precio, imagen, stock, code,status) {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        if (data.some(producto => producto.id === id)){
            let indice = data.findIndex(producto => producto.id === id)
            data[indice].title      = titulo
            data[indice].description= descripcion
            data[indice].price      = precio
            data[indice].thumbnail  = imagen ?? ["src/public/img/default.jpg"]
            data[indice].code       = code
            data[indice].stock      = stock
            data[indice].status     = status ?? true
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }else{
            return "producto no encontrado";
        }
    }
}

class Product {
    constructor(titulo, descripcion, precio, imagen, stock, code, id) {
        this.title = titulo;
        this.description = descripcion;
        this.price = precio;
        this.thumbnail = imagen;
        this.code = code;
        this.id = id;
        this.stock = stock;
        this.status = true
    }
}
