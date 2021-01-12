const clientRedis = require('./bbdd');

const db = clientRedis();


/* 
Funcion que dado un rubro y un radio en km, junto con tu latitud y longuitud
devuelve los negocios que se encuentran en ese radio.
*/
exports.radioKmRubro = (req, res) => {

    const parametros = {
        "rubro": req.body.rubro,
        "lat": req.body.lat,
        "lon": req.body.lon,
        "km": req.body.km
    };

    db.georadius(
        parametros.rubro, 
        parametros.lat,
        parametros.lon,
        parametros.km,
        'km', 
        (err, reply) => {

            if (err) {
                res.status(500).json("Error interno de Redis");
            }
            else {
                res.status(200).json(reply);
            }
        }
    );
}


/*
Dadauna ubicacion y un negocio de un rubro, devuelve la distancia entre ambos
*/
exports.distANegocio = (req, res) => {

    const parametros = {
        "rubro": req.body.rubro,
        "negocio": req.body.negocio,
        "lat": req.body.lat,
        "lon": req.body.lon
    };

    // Cargo en distancia la pos del usuario
    db.geoadd('distancia', parametros.lat, parametros.lon, 'usuario');

    // Cargo en distancia el negocio pasado por el cliente, necesito su posicion
    db.geopos(parametros.rubro, parametros.negocio, (err, reply) => {

        // Cargo en distancia la pos del negocio
        db.geoadd('distancia', reply[0][0], reply[0][1], parametros.negocio, (err, reply) => {

            // Calculo la distancia
            db.geodist('distancia', 'usuario', parametros.negocio, 'km', (err, reply) => {

                if (err) {
                    res.status(500).json("Error");
                }
                else {
                    res.status(200).json(reply);
                }
            });
        });
    });
}


//inicializacion de bbdd

const rubros = [
    'Cervecerias', 
    'Farmacias', 
    'Universidades',
    'Centro de Emergencias',
    'Supermercados'
];

exports.iniciarBBDD = (req, res) => {

    db.flushdb();

    db.geoadd(rubros[0],'-32.476350','-58.248431','Cervecería Lagash');
    db.geoadd(rubros[0],'-32.479699','-58.235290','Cervecería 7 Colinas');
    db.geoadd(rubros[0],'-32.480378','-58.233895','Cervecería Drakkar');
    db.geoadd(rubros[0],'-32.484532','-58.236942','Cervecería Biguá');

    db.geoadd(rubros[1],'-32.479869','-58.234614','Farmacia Círculo Católico de Obreros');
    db.geoadd(rubros[1],'-32.483751','-58.235801','Farmacia Vitamina');
    db.geoadd(rubros[1],'-32.480051','-58.236526','Farmacia Argachá');
    db.geoadd(rubros[1],'-32.489191','-58.228870','Farmacia Flores');

    db.geoadd(rubros[2],'-32.495510','-58.229644','Universidad Tecnológica Nacional');
    db.geoadd(rubros[2],'-32.481524','-58.229188','Universidad de Concepción del Uruguay');
    db.geoadd(rubros[2],'-32.478903','-58.232822','Universidad Autónoma de Entre Ríos FCYT');
    db.geoadd(rubros[2],'-32.480219','-58.261312','Universidad Nacional de Entre Ríos');

    db.geoadd(rubros[3],'-32.481147','-58.261099','Hospital Justo José de Urquiza');
    db.geoadd(rubros[3],'-32.479744','-58.236865','Cooperativa Médica');
    db.geoadd(rubros[3],'-32.483241','-58.230664','Clínica Uruguay');
    db.geoadd(rubros[3],'-32.479829','-58.231179','Círculo Médico de Concepción del Uruguay');

    db.geoadd(rubros[4],'-32.489202','-58.230296','Supermercado Gran Rex I');
    db.geoadd(rubros[4],'-32.486262','-58.232637','Supermercado Dar El Supremo');
    db.geoadd(rubros[4],'-32.488479','-58.241781','Supermercado DIA');
    db.geoadd(rubros[4],'-32.485651','-58.239735','Supermercado Yong Qiang');

    res.status(200).json('Base de datos inicializada');
}