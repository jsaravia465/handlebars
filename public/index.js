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

    document.getElementById('form_chat').addEventListener("submit", function(e) {
        e.preventDefault();
        addMessage();
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

    function addMessage() {
        console.log(document.getElementById('correo').value);
        if (document.getElementById('correo').value === "") {
            alert('Debe ingresar un correo.');
        } else {
            var mensaje = {
                correo: document.getElementById('correo').value,
                mensaje: document.getElementById('mensaje').value
            };

            socket.emit('new-message', mensaje);
        }
        return false;
    }

    function render(data) {
        let f = new Date();
        let fecha = f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear() + '  ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
        console.log(fecha);

        var html = data.map(function(elem, index) {
            return (`<div>
        <b style="color:blue"> ${elem.correo} </b> <strong style="color:#8D4925">[${fecha}]</strong> :
        <em style="color:green"> <font face="Italic">  ${elem.mensaje}</font> </em> </div>`)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
    }
    socket.on('messages', function(data) { render(data); });

});