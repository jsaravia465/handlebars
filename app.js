const express = require('express');

const app = express();

const productos = require('./productos/productos.router');
const handlebars = require('express-handlebars');

const http = require('http').Server(app);
const io = require('socket.io')(http);

let carrito = [];

// const server = app.listen(8080, () => { console.log(`Se levanto correctamente el servidor en el puerto ${server.address().port }`) })
http.listen(8080, () => console.log('SERVER ON'))




// server.on('error', error => {
//     console.log(`Ocurrio un error: ${error}   `);
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productos);

app.engine("hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + '/views/partials/'
    }));

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use('/static', express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado')
        // Se imprimirá solo la primera vez que se ha abierto la conexión 
        //socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')
        //io.sockets.emit('reenvio', carrito);

    console.log('envio a todos ' + carrito);
    socket.on('productos', data => {
        console.log('llega al servidor ' + JSON.stringify(data));
        carrito.push(data);
        console.log('Datos en el carrito ' + carrito);
        io.sockets.emit('reenvio', data);


    })



})