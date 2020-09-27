const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');


// Instancio express
const app = express();
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));


// Rutas
app.use('/api', routes);


app.listen(app.get('port'), () => {
    console.log(`Server listening on http://localhost:${app.get('port')}/api`);
});
