const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');


// Instancio express
const app = express();
app.set('port', process.env.PORT || 3000);


// Para enviar el cliente angular
app.use(express.static(__dirname + '/dist/client')) 


// Middlewares
app.use(express.json());
app.use(morgan('dev'));
//app.use(cors({ origin: 'http://localhost:4200' }));


// Rutas
app.use('/api/', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/client/index.html'));
});


app.listen(app.get('port'), () => {
    console.log(`Server listening on http://localhost:${app.get('port')}/`);
});
