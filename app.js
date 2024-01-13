const express = require('express')
const bodyParser = require('body-parser')
const { validateInput } = require('./middleware/valid'); 
const app = express();
const port = 3000;

let registro = [];
app.use(bodyParser.json());
// crear
app.post('/', validateInput, (req, res) => {
    const name = req.body.name.split(' ')[0];
    const finalName = name.charAt(0).toUpperCase() + name.slice(1);
    const lastName = req.body.name.split(' ')[1];
    const phoneNumber = req.body.phone;
    const email = req.body.email;

    registro.push({
        nombre: finalName,
        apellido: lastName,
        telefono: phoneNumber,
        email: email
    });

    console.log(registro);
    res.send(`Ha sido añadido con éxito!!!!!,  ${JSON.stringify(registro)}`);
});
app.get('/', (req, res) => {
    res.send(registro)
})

app.get('/:name', (req, res) => {
    const name = req.params.name;
    const encounter = registro.find(entry => entry.nombre.toLowerCase() === name.toLowerCase());
    res.send(encounter || "No se encontró ningún registro con ese nombre.");
});

app.put('/:name', validateInput, (req, res) => {
    const name = req.params.name;
    const encounterIndex = registro.findIndex(entry => entry.nombre.toLowerCase() === name.toLowerCase());

    if (encounterIndex !== -1) {
        const updatedName = req.body.name.split(' ')[0];
        const finalName = updatedName.charAt(0).toUpperCase() + updatedName.slice(1);
        const updatedLastName = req.body.name.split(' ')[1];
        const updatedPhoneNumber = req.body.phone;
        const updatedEmail = req.body.email;

        registro[encounterIndex] = {
            nombre: finalName,
            apellido: updatedLastName,
            telefono: updatedPhoneNumber,
            email: updatedEmail
        };

        console.log(registro);
        res.send(`Registro actualizado con éxito: ${JSON.stringify(registro[encounterIndex])}`);
    } else {
        res.status(404).send("No se encontró ningún registro con ese nombre.");
    }
});

app.delete('/:name', (req,res) => {
    const name = req.params.name;
    const encounterIndex = registro.findIndex(entry => entry.nombre.toLowerCase() === name.toLowerCase());
    registro.splice(encounterIndex, 1)
    res.send("El registro ha sido eliminado con exito!")

})

console.log(registro)

app.listen(port, () => {
    console.log('Its working');
});