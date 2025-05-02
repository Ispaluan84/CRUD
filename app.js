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
    res.send(`
        <h1>API Luchadores Street Figther</h1>
        <ul>
            <li>GET /usuarios - Lista de luchadores</li>
            <li>GET /usuarios/:nombre - Obtiene luchador por nombre
            <li>POST /usuarios - Crea un nuevo luchador</li>
        </ul>
    `)
})

app.get('/usuarios', (req, res) => {
        res.send(`
            <h1>Luchadores Street Figther</h1>
            <ul>
                ${usuarios.map((usuario) => `<li>ID: ${usuario.id} Nombre: ${usuario.nombre} Edad: ${usuario.edad} Procedencia: ${usuario.lugarProcedencia}</li>`).join('')}
            </ul>
            <form action="/usuarios" method="post">
                <label for"nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                <label for="edad">Edad:</label>
                <input type="number" id="edad" name="edad" required>
                <label for="procedencia">Procedencia:</label>
                <input type="text" id="procedencia" name="procedencia" required>
                <button type"submit">Añadir Luchador</button>
            </form>
        `);
});

app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find( us => us.nombre.toLowerCase() === nombre.toLowerCase())

    if(usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({mensaje: `Usuario ${nombre} no Encontrado`});
    }
});

app.post('/usuarios', (req, res) => {
    const newFigther = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };

    usuarios.push(newFigther);
    res.redirect('/usuarios')
})




app.listen(3000, () => {
    console.log('Servidor express escuchando en el puerto http://localhost:3000/usuarios')
})