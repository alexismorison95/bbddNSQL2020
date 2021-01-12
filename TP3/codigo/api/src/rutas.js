const express = require('express');
const controladores = require('./controladores');


const router = express.Router();

router.get('/iniciar', controladores.iniciarBBDD);

router.post('/radio-km-rubro', controladores.radioKmRubro);

router.post('/distancia', controladores.distANegocio);


module.exports = router;