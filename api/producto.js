const generador = require('../generador/productos');
const generar = (req, res) => {

    let cant = req.params.cant || 10;
    let productos = [];

    for (let i = 0; i < cant; i++) {
        let producto = generador.get();
        productos.push(producto);

    }
}