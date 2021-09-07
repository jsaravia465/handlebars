const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require('constants');
//const fs = require('fs');
import fs from "fs";

// let obj = {
//     title: 'aceite',
//     price: 100,
//     thumbnail: 'foto1'
// }

let productos: any[] = [];

export default class Archivo {
    archivo: string;

    constructor(archivo: string) {
        this.archivo = archivo;
    }



    async guardar(obj: { [x: string]: number; }) {
        try {
            if (!fs.existsSync(this.archivo)) {
                obj['id'] = 1;
                productos.push(obj);
                await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
                console.log("Se creo archivo con un producto.");
            } else {
                const contenido = await fs.promises.readFile(this.archivo, 'utf-8');
                let arr = JSON.parse(contenido);
                obj['id'] = parseInt(arr.length) + 1;
                //console.log(arr.length);
                arr.push(obj);
                await fs.promises.writeFile(this.archivo, JSON.stringify(arr));
                console.log("Se agrego un nuevo Producto");
                this.leer().then(e => console.log(e));
                //console.log(arr);
                //console.log(arr.length);
            }
        } catch (err) {
            console.log('Salio por la excepcion: ' + err);

        }

    }


    async leer() {

        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');

            return contenido;

        } catch (err) {
            return [];
        }

    }

    async borrar() {
        try {
            const result = await fs.promises.unlink(this.archivo);
            console.log("Se borro correctamente el archivo");
        } catch (err) {
            console.log('No es posible borrar el archivo.');
        }

    }

}
