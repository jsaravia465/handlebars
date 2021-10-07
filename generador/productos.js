const faker = require('faker');

faker.locale = 'es';

const get = () => ({
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    foto: faker.image.image()

});

module.exports = {
    get
}