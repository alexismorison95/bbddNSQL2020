# Tutorial de Docker Compose

https://dockertips.com/utilizando-docker-compose


# Importante
Para poder conectar Redis con Node dentro del contenedor

```javascript
const client = redis.createClient(6379, 'redis');
```


# Como hacer la receta

1. Crear Dockerfile
    
        From node:latest

        WORKDIR /api

        COPY api/ .

2. Crear docker-compose.yml
    
        web:
            build: ./
            command: sh -c 'npm install && node server.js'
            ports: 
                - '3000:3000'
            volumes:
                - /home/alexis/Escritorio/BBDDNSQL/TP2/parte-1-StarWars/codigo/api:/api
            links:
                - "db:redis"

            db:
            image: redis
            ports:
                - "6379:6379"

3. Crear .dockerignore

        /client

## Ejecutar contenedor

Dirigirse a la ruta

        /TP2/parte-1-StarWars/codigo 

y ejecutar el siguiente comando:

> $ docker-compose up


# Cliente

El cliente sera hecho en Angular. Una vez montado el contenedor abrir el navegador en http://localhost:3000/
