# Parte 2 Redis + Flask

Hay que instalar Redis en la PC.
    
    $ sudo apt-get update
    $ sudo apt install redis-server


Luego instalar:

    $ sudo pip3 install flask
    $ sudo pip3 install redis
    $ sudo pip3 install flask_cors

# Tener en cuenta

La conexion a Redis se debe hacer de la siguiente manera

```python
conexion = redis.StrictRedis(host="localhost", port=6379, db=1, decode_responses=True)
```

# Modo desarrollo

Para escuchar los cambios en Flask:

```python
if __name__ == "__main__":

    app.run(debug=True)
```

# Cliente

Cliente angular en produccion: http://localhost:5000/