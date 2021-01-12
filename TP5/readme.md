# Crypto Mongo App

## Docker y Mongo

Para poder instalar la imagen de mongodb ejecutamos lo siguiente:

    $ docker pull mongo

Una vez terminada la descarga levantamos el siguiente contenedor:

    $ docker run --name mongo-crypto -d mongo

# API CoinMarketCap

API de donde se van a obtener los datos actuales de las cryptomonedas.
Para saber como funciona, ver:

> https://coinmarketcap.com/api/documentation/v1/#section/Introduction

# Agente

1. Crear Dockerfile

        FROM python

        WORKDIR /agente 

        RUN pip install requests flask pymongo

        COPY main.py ./agente.py

        CMD ["python", "agente.py"]

2. Construir imagen del agente con la receta Dockerfile

        $ docker build -t="crypto-agente" .

3. Ejecutar la imagen en un contenedor

        $ docker run -it --link=mongo-crypto:mongo-crypto crypto-agente
    
    * **-it**: Es para tener una consola interactiva y que se ejecute en primer plano, si queremos que se ejecute en segundo plano hay que usar **-d**.

    * **--link**: Especificamos el nombre del contenedor de MongoDB y el alias que tendra dentro de nuestro contenedo agente.

## Importante

A la hora de hacer la conexion con mongo-crypto desde python hay que hacer lo siguiente:

```python
client = pymongo.MongoClient('mongodb://mongo-crypto:27017/')
```


# API

1. Crear Dockerfile

        FROM python

        ENV FLASK_APP api.py

        WORKDIR /api 

        RUN pip install flask pymongo flask-cors

        COPY main.py ./api.py

        EXPOSE 5000

        CMD flask run --host=0.0.0.0

2. Construir imagen de la API con la receta Dockerfile

        $ docker build -t="crypto-api" .

3. Ejecutar la imagen en un contenedor

        $ docker run -it --link=mongo-crypto:mongo-crypto -p 5000:5000 crypto-api



# Cliente

Ir a la carpeta

        ./cliente

Y ejecutar:

> $ ng serve