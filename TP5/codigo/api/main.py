from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import pymongo



app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


def get_db_conection():

    client = pymongo.MongoClient('mongodb://mongo-crypto:27017/')

    return client.cryptobbdd # Nombre de la base de datos: cryptobbdd



@app.route('/crypto/<limit>', methods=['GET'])
def index(limit):

    db = get_db_conection()

    results = []

    for data in db.cryptocolection.find().limit(int(limit)):

        data.pop('_id')
        results.append(data)
    
    return jsonify(results)
