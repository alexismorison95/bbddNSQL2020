import requests
import pymongo
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
cors=CORS(app,resources={r"/*": {"origins":"*"}})


def get_db_connection():

    cliente = pymongo.MongoClient('mongodb://mongomcu:27017/')

    return cliente.mcupelis

db = get_db_connection()

API_URL1 = 'https://api.themoviedb.org/3/movie/'
API_URL2 = '?api_key=dfe3234b957f307e6e0db40c7052c2db&language=es'

@app.route('/api')
def index():

    peliculas = []

    for pelicula in db.peliculas.find({}):

        pelicula.pop('_id')
        peliculas.append(pelicula)

    return jsonify(peliculas)


@app.route('/api/iniciarbd', methods = ['GET'])
def iniciar():

    db.peliculas.delete_many({})

    peliculasID = ['1771', '1726', '1724', '10138', '10195', '24428']

    for pelicula in peliculasID:
        response = requests.get(API_URL1 + pelicula + API_URL2)

        db.peliculas.insert_one(response.json())
    
    return jsonify(db.peliculas.count_documents({}))


@app.route('/api/cargar/<id>', methods = ['GET'])
def cargar(id):

    response = requests.get(API_URL1 + id + API_URL2)

    db.peliculas.insert_one(response.json())

    return jsonify("Pelicula agregada")


@app.route('/api/modificar', methods = ['PUT'])
def modificar():

    pelicula = request.get_json()

    db.peliculas.replace_one({'id': pelicula['id']}, pelicula)

    return jsonify("Pelicula actualizada")


@app.route('/api/eliminar/<id>', methods = ['DELETE'])
def eliminar(id):

    db.peliculas.delete_one({'id': int(id)})

    return jsonify("Pelicula eliminada")