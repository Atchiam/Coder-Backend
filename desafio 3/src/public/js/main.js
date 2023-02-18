// codigo desde el front JS

const formAgregar = document.getElementById('formAgregarProductos');
const formEliminar = document.getElementById('formEliminarProductos')
const socket = io()

//Enviar informacion a mi servidor

formAgregar.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    
    socket.emit("AddProduct", {title:title,description:description,price:price,thumbnail:thumbnail,code:code,stock:stock})
    ;
    formAgregar.reset()
});

formEliminar.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('borrarPodId').value;  
    socket.emit("EliminarProduct", id)
    ;
});

//Recivir informacion de mi servidor

socket.on("getProducts", products =>{

    document.getElementById("productsCard").innerHTML=""

    products.forEach(product => {
        document.getElementById("productsCard").innerHTML+=  
        `
        <div class="card text-center p-2 g-col-6" style="width: 14rem;">
            <img src="${product.thumbnail}" alt="imagen" class="card-img-top">
            <h3 class="text-center ">${product.title}</h3>
            <p class="text-center card-text">${product.description}</p>
            <p class="card-title fs-5">precio: ${product.price}</p>
            <button class="btn btn-primary m-2" id= "botonProducto${product.id}">Elminar Pruducto</button>
        </div>
        `
    });

    products.forEach(product=>{
        document.getElementById(`botonProducto${product.id}`).addEventListener("click",(e)=>{
            socket.emit("EliminarProduct", product.id)
        })
    })
})

socket.on("confirmacionAdd", info => {
    console.log(info)
})

socket.on("confirmacionBorrado", info => {
    console.log(info)
})
