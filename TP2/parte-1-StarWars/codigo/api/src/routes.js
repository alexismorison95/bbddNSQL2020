const express = require('express');
const controllers = require('./controllers');


const router = express.Router();

router.post('/agregar-personaje', controllers.agregarPersonaje)

router.get('/listar-personajes/:episodio', controllers.listarPersonajes)

router.delete('/eliminar-personaje', controllers.eliminarPersonaje)


module.exports = router;