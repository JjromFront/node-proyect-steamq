
const validateInput = (req, res, next) => {
    const regex = /\S+@\S+\.\S+/;

    if (!req.body.name || req.body.name.split(' ').length <= 1) {
        res.status(400).send("Debes ingresar tu nombre completo");
        return;
    }
    if (!req.body.phone || req.body.phone.length < 10) {
        res.status(400).send("El teléfono debe tener más de 10 números o no está agregado");
        return;
    }
    if (!req.body.email || req.body.email.indexOf(' ') >= 0 || !regex.test(req.body.email)) {
        res.status(400).send("Email inválido o no agregado");
        return;
    }

    next(); 
};

module.exports = {
    validateInput
};
