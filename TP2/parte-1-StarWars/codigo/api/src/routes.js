const express = require('express');
const controllers = require('./controllers');


const router = express.Router();

router.post('/:episodio/:personaje', controllers.agregarPersonaje)

router.get('/:episodio', controllers.listarPersonajes)

router.delete('/:episodio/:personaje', controllers.eliminarPersonaje)


module.exports = router;