class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct (titulo, descripcion, precio, imagen, stock, code) {
        let idprod = this.products.find(p => p.id === Product.code)
        let valid  = [titulo, descripcion, precio, imagen, stock, code]

        if(idprod){
            console.log("El ID del producto ya se encuentra en uso");
        }else{
            if(valid.includes(null)||valid.includes("")||valid.includes(undefined)){
                console.log("Todos los campos deben estar completos");
            }else{
                let nuevoProducto = new Product(titulo, descripcion, precio, imagen, stock, code);
                this.products.push(nuevoProducto)
            }
        }
    }

    getProducts(){
        console.log(this.products);
    }

    getProductByID(id){
        this.products.find(i => i.id === id) ? console.log(this.products.filter(i => i.id === id)) :
        console.log("“El elemento buscado no se encuentra, pruebe con otro”");
    }
}
class Product {
    constructor(titulo, descripcion, precio, imagen, stock, code) {
        this.title = titulo;
        this.description = descripcion;
        this.price = precio;
        this.thumbnail = imagen;
        this.code = code;
        this.id = Product.addId();
        this.stock = stock;
    }
static addId() {
        if(this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const prod1 = new ProductManager();

prod1.addProduct("yerbaMaty", "la mejor", 500, "imagenchingona", 80, 12)
prod1.addProduct("yerbaAye", "no me hacen follow", 900, "imagenchingona", 90, 13)
prod1.addProduct("yerbaMMMaty", "la mejor", 500, "imagenchingona", 80, 15)
prod1.addProduct("yerbaAye", "no me hacen follow", 900, "imagenchingona", 90, 17)
prod1.addProduct("yerbaBraian", null, 500, "imagenchingona", 80,1)
prod1.addProduct("yerbaGaby", "", 900, "imagenchingona", 90,2)
prod1.addProduct("yerbaFranco", undefined , 900, "imagenchingona", 90,3)
console.log("-----------------------------------------");
console.log(prod1.getProducts());
console.log("-----------------------------------------");
console.log(prod1.getProductByID(3))