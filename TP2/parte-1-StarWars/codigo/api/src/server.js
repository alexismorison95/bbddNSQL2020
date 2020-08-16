const redis = require('redis');
const express = require('express');

// Instancio express
const app = express();

app.set('port', process.env.PORT || 3000);


// Redis
const client = redis.createClient(6379, 'redis');

client.on("connect", () => {
    console.log('Conectado a redis');
});

// Inserto un valor en redis
client.set("key", "value", redis.print);

// Leo un valor de redis
client.get("key", redis.print);


// Rutas
app.get('/', (req, res) => {
    return res.send('Hello world');
});


app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
