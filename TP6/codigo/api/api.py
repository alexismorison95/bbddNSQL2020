import requests
import pymongo
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors=CORS(app,resources={r"/*": {"origins":"*"}})


def get_db_connection():

    cliente = pymongo.MongoClient('mongodb://mongomcu:27017/')

    return cliente


db = get_db_connection()


@app.route('/')
def index():

    result = db.mcupelis.command('ping')

    return jsonify(result)
