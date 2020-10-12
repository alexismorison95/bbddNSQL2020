import redis

# Conexion a Redis
def conexionRedis():

    # conexion = redis.StrictRedis(host="localhost", port=6379, db=1, decode_responses=True)

    conexion = redis.Redis(host='localhost', port=6379, db=1, decode_responses=True)

    try:
        if conexion.ping():
            print("\nConectado a Redis\n")
    
    except ValueError:
        print(ValueError)
    
    return conexion