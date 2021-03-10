import requests
import pymongo
from flask import Flask, jsonify, request
from flask_cors import CORS
from firebase import Firebase


app = Flask(__name__)
cors=CORS(app,resources={r"/*": {"origins":"*"}})


def get_mongo_connection():

    cliente = pymongo.MongoClient('mongodb://mongotp7:27017/')

    return cliente.mcupelis

## TP7 Firebase

def get_firebase_connection():

    firebaseConfig = {
        "apiKey": "AIzaSyCdL3158_TVXacixEu_JmQKQolimdzRBkM",
        "authDomain": "tp7-avengers.firebaseapp.com",
        "databaseURL": "https://tp7-avengers.firebaseio.com",
        "projectId": "tp7-avengers",
        "storageBucket": "tp7-avengers.appspot.com",
        "messagingSenderId": "504316915029",
        "appId": "1:504316915029:web:91af94ccde7fb7ca0853dc",
        "measurementId": "G-18DR8KP4FX"
    }

    client = Firebase(firebaseConfig)
    
    database = client.database()

    return database


db_firestore = get_firebase_connection()
db = get_mongo_connection()

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


# FIREBASE

@app.route('/api/personajes')
def getPersonajes():

    personajes = db_firestore.child("personajes").get()

    return jsonify(personajes.val())


@app.route('/api/personajes/<id>', methods=['GET', 'PUT', 'DELETE'])
def personaje(id):

    if request.method == 'GET':

        result = db_firestore.child("personajes").child(id).get()

        return jsonify(result.val())
    
    if request.method == 'DELETE':

        db_firestore.child("personajes").child(id).remove()
        
        return jsonify('Eliminado')

    if request.method == 'PUT':

        personaje = request.get_json()

        db_firestore.child("personajes").child(id).update(personaje)

        return jsonify('Modificado')


@app.route('/api/personajes/nuevo', methods=['POST'])
def personajeNuevo():

    personaje = request.get_json()

    db_firestore.child("personajes").child(personaje['id']).set(personaje)

    return jsonify(personaje)