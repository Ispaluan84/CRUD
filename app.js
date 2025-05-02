const express = require('express');
const app = express();
const port = 3000;

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
    res.json(Object.values(usuarios))
});

app.get('/usuarios/:nombre', (req, res) => {
    const nombreBuscado = req.params.nombre.toLowerCase();
    const encontrado = usuarios.find(us => us.nombre.toLowerCase() === nombreBuscado);

    if(encontrado) {
        res.json(encontrado)
    } else {
        res.status(404).json({mensaje: 'Usuario no Encontrado'});
    }
});

app.post('/usuarios', (req, res) => {
    const {nombre} = req.body;
    if(!nombre) {
        return res.status(400).json({mensaje: 'Falta el campo "nombre"'})
    }

    const existe = usuarios.find(us => us.nombre.toLowerCase() === nombre.toLowerCase());
    if(existe) {
        return res.status(400).json({mensaje: 'Ya existe un usuario con ese nombre'})
    }

    const id = Date.now();
    const nuevoUsuario = { id, nombre };
    elementos.push(nuevoUsuario);

    res.status(201).json(nuevoUsuario);
    })

    app.put('/usuarios/:nombre', (req, res) => {
        const usuarioOriginal = req.params.nombre.toLowerCase();
        const nuevoNombre = req.body.nombre;

        const index = usuarios.findIndex(us => us.nombre.toLowerCase() === usuarioOriginal);

        if(index === -1) {
            res.status(404).json({mensaje: 'Elemento no encontrado'})
        }
        if(!nuevoNombre) {
            return res.status(400).json({mensaje: 'Falta el nuevo nombre'})
        }

        usuarios[index].nombre = nuevoNombre;
        res.json({mensaje: 'Elemento Actualizado', Elemento: usuarios[index]})
    })

    app.delete('/usuarios/:nombre', (req, res) => {
        const nombre = req.params.nombre.toLowerCase();
        const index = usuarios.findIndex(us => us.nombre.toLowerCase() === nombre);
      
        if (index === -1) {
          return res.status(404).json({ mensaje: "Usuario no encontrado para eliminar" });
        }
      
        const eliminado = usuarios.splice(index, 1);
        res.json({ mensaje: "Usuario eliminado", eliminado: eliminado[0] });
      });
      





app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto http://localhost:${port}/usuarios`)
})