# Parte 2, Redis + Flask

Hay que instalar Flask y Redis en la PC.

Luego instalar conexion python-redis:
> $ pip3 install redis

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
