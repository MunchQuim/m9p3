const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

function leerUsuarios() {
    const data = fs.readFileSync('./jsons/users.json');
    return JSON.parse(data);
}
function leerEventos() {
    const data = fs.readFileSync('./jsons/events.json');
    return JSON.parse(data);
}

function escribirUsuarios(usuarios) {
    fs.writeFileSync('./jsons/users.json', JSON.stringify(usuarios, null, 2));
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/users', (req, res) => {
    res.json(leerUsuarios());
});

app.get('/usuarios/nombre/:nombre', (req, res) => {
    const nombreBuscado = req.params.nombre.toLowerCase();//lo  estandarizo a minusculas
    const usuarios = leerUsuarios(); // recojo los usuarios
    const usuariosEncontrados = usuarios.filter(u => u.nombre.toLowerCase().includes(nombreBuscado)); //miro si el 
    res.status(200).json(usuariosEncontrados);
  });
app.post('/usuarios', (req, res) => {
    const { nombre, password, mail } = req.body; //recibo el nombre, contraseña y mail

    let usuarios = leerUsuarios();
    let newId = usuarios[usuarios.length-1]["id"]+1;
    const newUser = { "id": newId, "nombre": nombre, "contraseña": password, "email":mail};
    usuarios.push(newUser);
    escribirUsuarios(usuarios);
    res.status(201).json(newUser);

})


app.get('/events', (req, res) => {
    res.json(leerEventos());
});
