from flask import Flask
from flask_cors import CORS
from routes import router


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(router)


# Main
if __name__ == "__main__":

    app.run(host='localhost', debug=True)