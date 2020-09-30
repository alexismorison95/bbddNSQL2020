const clientRedis = require('./bbdd');

const db = clientRedis();


exports.agregarPersonaje = (req, res) => {

    const parametros = {
        episodio: req.params.episodio, 
        personaje: req.params.personaje
    }

    db.lpush(parametros.episodio, parametros.personaje, (err, reply) => {

        if (err) {
            res.status(500).json("Error interno de Redis");
        }
        else {
            res.status(200).json(
                `Agregado, total de personajes en episodio ${parametros.episodio}: ${reply}`
            );
        }
    });
}


exports.listarPersonajes = (req, res) => {

    const episodio = req.params.episodio

    db.lrange(episodio, 0, -1, (err, reply) => {

        if (err) {
            res.status(500).json("Error interno de Redis");
        }
        else {
            res.status(200).json(reply);
        }
    });
}


exports.eliminarPersonaje = (req, res) => {

    const parametros = {
        episodio: req.params.episodio, 
        personaje: req.params.personaje
    }

    db.lrem(parametros.episodio, 0, parametros.personaje, (err, reply) => {

        if (err) {
            res.status(500).json("Error interno de Redis");
        }
        else {
            res.status(200).json(
                `Eliminado, total de personajes eliminados: ${reply}`
            );
        }
    });
}

exports.clienteAngular = (req, res) => {

    res.sendFile(path.join(__dirname + '/dist/client/index.html'));
}