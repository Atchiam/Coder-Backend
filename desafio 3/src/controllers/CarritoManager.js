import {promises as fs} from 'fs'

export class CarritoManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if(this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async addProduct (titulo, descripcion, precio, imagen, stock, code) {
        try{
            let valid  = [titulo, descripcion, precio, imagen, stock, code]
            const read = await fs.readFile(this.path, "utf8");
            const data = JSON.parse(read);
            const objCode = data.find((product) => product.code == code);

            if(objCode){
                throw error;
            }else{
                if(valid.includes(null)||valid.includes("")||valid.includes(undefined)){
                    console.log("Todos los campos deben estar completos");
                }else{
                    id = ProductManager.incrementarID()
                    let nuevoProducto = new Product(titulo, descripcion, precio, imagen, stock, code, id);
                    data.push(nuevoProducto);
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    
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
        try {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const newData = data.filter((product) => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
        return console.log(
            `El producto ha sido eliminado exitosamente`
        );
        } catch (error) {
        throw error;
        }
    }

    async updateProduct(id, titulo, descripcion, precio, imagen, stock, code) {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        if (data.some(producto => producto.id === id)){
            let indice = data.findIndex(producto => producto.id === id)
            data[indice].title      = titulo
            data[indice].description= descripcion
            data[indice].price      = precio
            data[indice].thumbnail  = imagen
            data[indice].code       = code
            data[indice].stock      = stock
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }else{
            console.log("producto no encontrado");
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
    }
}
