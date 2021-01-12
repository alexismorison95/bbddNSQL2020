import pymongo
import time
from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json


# API info
url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
api_key = '6bf5eeac-0693-4b09-8449-03d21db9d58a'


# Traer los datos de la api
def get_data_api():

    parameters = {
        'start':'1',
        'limit':'5000',
        'convert':'USD'
    }

    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': api_key
    }

    session = Session()
    session.headers.update(headers)

    try:
        response = session.get(url, params=parameters)
        data = json.loads(response.text)
        
        return data

    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)

        return None


def get_db_connection():

    client = pymongo.MongoClient('mongodb://mongo-crypto:27017/')

    return client.cryptobbdd # Nombre de la base de datos: cryptobbdd


def save_data(db: pymongo.database.Database, data):

    # Nombre de la coleccion: cryptocolection
    db.cryptocolection.insert_one(data)


if __name__ == "__main__":

    while True:

        db = get_db_connection()

        crypto_values = get_data_api()

        if crypto_values:

            print("Guadando informacion en bbdd: mongo-crypto,", time.strftime("%c"))

            db.cryptocolection.delete_many({})

            for data in crypto_values['data']:

                save_data(db, data)
        
        else:
            print("Error en API coinmarketcap,", time.strftime("%c"))

        time.sleep(240)