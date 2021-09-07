//const express = require('express');
import express from "express";
const router = express.Router();

const app = express();
let productos: any[] = [];

router.get('/listar', (req, res) => {

    if (productos.length > 0) {
        res.send(JSON.stringify(productos));
    } else {
        res.send(JSON.stringify({ error: 'no hay productos cargados' }));
    }


});

router.get('/listar/:id', (req, res) => {
    if (parseInt (req.params.id) > productos.length || parseInt(req.params.id) < 0) {
        res.send(JSON.stringify({ error: 'producto no encontrado' }))

    } else {
        res.send(JSON.stringify(productos[parseInt(req.params.id) - 1]))
    }


});

// router.post('/guardar', (req, res) => {

//     console.log(req.body);
//     let obj = req.body;
//     obj.id = productos.length + 1;
//     productos.push(req.body);
//     //res.send(req.body);
//     res.redirect('/static/index.html');



// });


router.put('/actualizar/:id', (req, res) => {
    let id:number = parseInt (req.params.id);

    console.log(req.body);
    productos[id - 1].titulo = req.body.titulo;
    productos[id - 1].precio = req.body.precio;
    productos[id - 1].foto = req.body.foto;
    res.send(JSON.stringify(productos[id - 1]));


});

router.delete('/borrar/:id', (req, res) => {
    let obj = productos.splice(parseInt(req.params.id) - 1, 1);
    res.send(JSON.stringify(obj));


});

router.get('/vista', (req, res) => {
    let valor = false;
    if (productos.length > 0) {
        valor = true;
    }
    res.render("index", { productos: productos, cantRegistros: valor });


});

export default  router;