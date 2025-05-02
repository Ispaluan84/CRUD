const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.json(`{
        ${usuarios.map((usuario) => `ID: ${usuario.id} Nombre: ${usuario.nombre}`).join('')}
    }`);
});










app.listen(3000, () => {
    console.log('Servidor express escuchando en el puerto http://localhost:3000')
})