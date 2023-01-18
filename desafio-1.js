class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct (titulo, descripcion, precio, imagen, stock) {
        let idprod = this.products.find(p => p.id === this.id)
        let valid  = [titulo, descripcion, precio, imagen, stock]

        if(idprod){
            console.log("El ID del producto ya se encuentra en uso");
        }else{
            if(valid.includes(null)){
                console.log("Todos los campos deben estar completos");
            }else{
                let id = this.id
                const  nuevoProducto = new Product(titulo, descripcion, precio, imagen, stock, id);
                this.id += 1
                this.products.push(nuevoProducto)
            }
        }
    }

    getProducts(){
        console.log(this.products);
    }

    getProductByID(id){
        this.products.find(i => i.code === id) ? console.log(this.products.filter(i => i.code === id)) :
        console.log("“El elemento buscado no se encuentra, prueve con otro”");
    }
}

class Product {
    constructor(titulo, descripcion, precio, imagen, stock, id) {
        this.title = titulo;
        this.description = descripcion;
        this.price = precio;
        this.thumbnail = imagen;
        this.code = id;
        this.stock = stock;
    }
}

const prod1 = new ProductManager();

prod1.addProduct("yerbaMaty", "la mejor", 500, "imagenchingona", 80)
prod1.addProduct("yerbaAye", "no me hacen follow", 900, "imagenchingona", 90)
prod1.addProduct("yerbaBraian", "la mejor", 500, "imagenchingona", 80)
prod1.addProduct("yerbaGaby", "no me hacen follow", 900, "imagenchingona", 90)
prod1.addProduct("yerbaFranco", null , 900, "imagenchingona", 90)

console.log(prod1.getProducts());
console.log("-----------------------------------------");
console.log(prod1.getProductByID(5))