# Crypto Mongo App

## 1 - Docker y Mongo

Para poder instalar la imagen de mongodb ejecutamos lo siguiente:

    $ docker pull mongo

Una vez terminada la descarga levantamos el siguiente contenedor:

    $ docker run --name mongo-crypto -d mongo


# Agente


1. Crear Dockerfile

        FROM python

        WORKDIR /agente 

        RUN pip install requests flask pymongo

        COPY main.py ./agente.py

        CMD ["python", "agente.py"]

2. Construir imagen del agente con la receta Dockerfile

        $ docker build -t="agente" .

3. Ejecutar la imagen en un contenedor

        $ docker run -it --link=mongo-crypto:mongo-crypto agente
    
    * **-it**: Es para tener una consola interactiva y que se ejecute en primer plano, si queremos que se ejecute en segundo plano hay que usar **-d**.

    * **--link**: Especificamos el nombre del contenedor de MongoDB y el alias que tendra dentro de nuestro contenedo agente.

## Importante

A la hora de hacer la conexion con mongo-crypto desde python hay que hacer lo siguiente:

```python
client = pymongo.MongoClient('mongodb://mongo-crypto:27017/')
```


# API


# Cliente

