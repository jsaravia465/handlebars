// const Handlebars = require("handlebars");
document.addEventListener("DOMContentLoaded", function() {
    const socket = io();
    let productos = [];

    const my_template = document.querySelector("#template");
    const tabla = document.querySelector("#tabla");

    document.querySelector('form').addEventListener("submit", function(e) {
        e.preventDefault();
        guardar();


    })


    socket.on('mi mensaje', data => {
        alert(data)
        socket.emit('notificacion', 'Mensaje recibido exitosamente')

    })

    function guardar() {
        console.log("Guardando");
        // document.getElementById('titulo').innerText = "";
        let obj = {};
        obj.titulo = document.getElementById('titulo').value;
        obj.precio = document.getElementById('precio').value;
        obj.foto = document.getElementById('foto').value;
        console.log(obj);
        productos.push(obj);
        const template = Handlebars.compile(my_template.innerHTML);
        tabla.innerHTML = template({
            prod: productos,
            cantRegistros: valor()
        });
        console.log(productos);
        document.getElementById('form').reset();
        return false;

    }



    function valor() {
        if (productos.length > 0) {
            return true;
        } else {
            return false;
        }
    }
});