import {promises as fs} from 'fs'

export class CarritoManager {
    constructor(path) {
        this.path = path
    }

    async crearCarrito (){
        try{
            const data = JSON.parse(await fs.readFile(this.path, "utf8"));
            let idCarrito = data.length > 0 ? data[parseInt(data.length) - 1].idCarrito + 1 :  1
            let nuevocarrito = new Carrito(idCarrito);
            data.push(nuevocarrito);
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }catch(error){
            console.log(error);
        }
    }
    async addProductInCarrito(idCarrito,idProducto) {
        try{
            const dataCarrito = JSON.parse(await fs.readFile(this.path, "utf8"));
            const carrito = dataCarrito.find((carrito) => carrito.idCarrito == idCarrito);
            if (carrito) {
                let indiceCarrito = dataCarrito.findIndex((carrito) => carrito.idCarrito == idCarrito)
                let indiceProd = dataCarrito[indiceCarrito].prod.findIndex((producto) => producto.idProd == idProducto)
                let stockProd = JSON.parse(await fs.readFile('src/models/productos.json', "utf8")).find((Prod) => Prod.id === idProducto).stock;
                if (indiceProd === -1) {
                    dataCarrito[indiceCarrito].prod.push({"idProd":idProducto,"cantidad":1});
                    await fs.writeFile(this.path, JSON.stringify(dataCarrito), "utf-8");
                    return (`tu producto fue agregado con exito`);
                } else {
                    if (dataCarrito[indiceCarrito].prod[indiceProd].cantidad < stockProd) {
                        dataCarrito[indiceCarrito].prod[indiceProd].cantidad += 1
                        await fs.writeFile(this.path, JSON.stringify(dataCarrito), "utf-8");
                        return (`sumaste un producto`);
                    }else{
                        return (`no podes sumar mas productos que los que hay en stock`);
                    }
                }
            } else {
                return (`El id seleccionado no corresponde a ninguno de nuestros carritos`);
            }
        }catch (error){
            console.log(error);
        };
    }

    async getCarritoByID(id) {
        try {
        let data = JSON.parse(await fs.readFile(this.path, "utf8"));
        let carrito = data.find((carrito) => carrito.idCarrito === id);
        if (carrito) {
            return (carrito);
        } else {
            return (`El id seleccionado no corresponde a ninguno de nuestros carritos`);
        }
        } catch (error) {
        throw error;
        }
    }

}

class Carrito {
    constructor(idCarrito) {
        this.idCarrito = idCarrito;
        this.prod = [];
    }
}