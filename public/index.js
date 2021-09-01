// const Handlebars = require("handlebars");
document.addEventListener("DOMContentLoaded", function() {
    const socket = io();
    let productos = [];

    const my_template = `{{#if cantRegistros}}
    <div class="container-fluid">
        <div class="col-2">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Foto</th>
                    </tr>
                </thead>
                <tbody>

                    {{#each prod}}

                    <tr>
                        <td>{{this.titulo}}</td>
                        <td>{{this.precio}}</td>
                        <td><img src={{this.foto}} width="32" height="32"></td>

                    </tr>
                    {{/each}}


                </tbody>
            </table>
        </div>
    </div>
    {{else}}
    <div>
        <h2>No se encontraron productos</h2>
    </div>
    {{/if}}`; //document.querySelector("#template");




    const tabla = document.querySelector("#tabla");

    const template = Handlebars.compile(my_template);

    socket.on('reenvio', data => {
        console.log('entro por reenvio ' + JSON.stringify(data));
        //console.log(data.length);
        //if (data.length > 0) {
        productos.push(data);
        //console.log(productos);
        tabla.innerHTML = template({
            prod: productos,
            cantRegistros: valor()
        });
        // };

    });

    socket.on('reenvio_lista', data => {
        console.log('entro por reenvio ' + JSON.stringify(data));
        //console.log(data.length);
        if (data.length > 0) {
            productos = data.slice();
            //console.log(productos);
            tabla.innerHTML = template({
                prod: productos,
                cantRegistros: valor()
            });
        };

    });

    tabla.innerHTML = template({
        prod: productos,
        cantRegistros: valor()
    });
    console.log('paso por parte principal');




    document.querySelector('form').addEventListener("submit", function(e) {
        e.preventDefault();
        guardar();


    })


    socket.on('mi mensaje', data => {
        alert(data)
        socket.emit('notificacion', 'Mensaje recibido exitosamente');

    })



    function guardar() {
        console.log("Guardando");
        // document.getElementById('titulo').innerText = "";
        let obj = {};
        obj.titulo = document.getElementById('titulo').value;
        obj.precio = document.getElementById('precio').value;
        obj.foto = document.getElementById('foto').value;
        // console.log(obj);
        //productos.push(obj);
        // const template = Handlebars.compile(my_template);
        // tabla.innerHTML = template({
        //     prod: productos,
        //     cantRegistros: valor()
        // });
        //console.log(productos);
        socket.emit('productos', obj);
        document.getElementById('form').reset();
        return false;

    }



    function valor() {
        console.log('tamaño de productos' + productos.length);
        if (productos.length > 0) {
            return true;
        } else {
            return false;
        }
    }

});