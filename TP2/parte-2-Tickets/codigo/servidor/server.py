from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from routes import router


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(router)


# ANGULAR ROUTING
__angular_paths = []
__angular_default_path = "index.html"
__root = "./cliente/"

for root, subdirs, files in os.walk(__root):
    if len(root) > len(__root):
        root += "/"

    for file in files:
        relativePath = str.replace(root + file, __root, "")
        __angular_paths.append(relativePath)

# Special trick to capture all remaining routes
@app.route('/<path:path>')
@app.route('/', defaults={'path': ''})
def angular(path):    
    if path not in __angular_paths:
        path = __angular_default_path
    
    return send_from_directory('./cliente/', path)


# Main
if __name__ == "__main__":

    app.run(host='localhost', debug=True)