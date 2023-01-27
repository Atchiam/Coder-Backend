import {promises as fs} from "fs"

class ProductManager {
    constructor(path) {
        this.path = path;
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
                    let id;
                    id = data.length + 1;
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
        console.log(JSON.parse(read)); 
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
            console.log(product);
        } else {
            console.log("No se encontro el producto");
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
        const contenido = await fs.readFile(this.path, "utf-8");
        const aux = JSON.parse(contenido);
        if (aux.some(producto => producto.id === id)){
            let indice = aux.findIndex(producto => producto.id === id)
            aux[indice].title      = titulo
            aux[indice].description= descripcion
            aux[indice].price      = precio
            aux[indice].thumbnail  = imagen
            aux[indice].code       = code
            aux[indice].stock      = stock
            console.log(aux);
            await fs.writeFile(this.path, JSON.stringify(aux), "utf-8");
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

const prod1 = new ProductManager("./productos.json");

//prod1.addProduct("yerbaMaty", "la mejor", 500, "imagenchingona", 80, 12)
//prod1.addProduct("yerbaAye", "no me hacen follow", 900, "imagenchingona", 90, 1)
//prod1.addProduct("yerbaMMMaty", "la mejor", 500, "imagenchingona", 80, 15)
// prod1.addProduct("yerbaAye", "no me hacen follow", 900, "imagenchingona", 90, 17)
// prod1.addProduct("yerbaBraian", null, 500, "imagenchingona", 80,1)
// prod1.addProduct("yerbaGaby", "k", 900, "imagenchingona", 90,2)
// prod1.addProduct("yerbaFranco", undefined , 900, "imagenchingona", 90,3)

prod1.updateProduct(1,"aaaaaaa","1","2","3",4,5)
//console.log(prod1.getProducts());
//prod1.deleteProduct(1)
//console.log(prod1.getProductByID(3))