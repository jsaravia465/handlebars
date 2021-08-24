const express = require('express');

const app = express();

const productos = require('./productos/productos.router');
const handlebars = require('express-handlebars');

const server = app.listen(8080, () => { console.log(`Se levanto correctamente el servidor en el puerto ${server.address().port }`) })



server.on('error', error => {
    console.log(`Ocurrio un error: ${error}   `);
})

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