const express = require('express');
const controladores = require('./controladores');


const router = express.Router();

router.get('/iniciar', controladores.iniciarBBDD);

router.get('/radio-km-rubro', controladores.radioKmRubro);

router.get('/distancia', controladores.distANegocio);


module.exports = router;