from flask import Flask
from flask_session import Session
from flask_cors import CORS
import json

# Ouverture du fichier JSON
with open('./server/www/config.json') as f:
    dataconfig = json.load(f)

VALIDE_API_KEY = dataconfig['API_KEY_DECRYPT']
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_TYPE = 'filesystem'

class RouteManager:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['SESSION_TYPE'] = SESSION_TYPE
        self.app.config['SESSION_COOKIE_SAMESITE'] = SESSION_COOKIE_SAMESITE
        self.app.config['SECRET_KEY'] = VALIDE_API_KEY
        CORS(self.app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
        Session(self.app)

    def read_messages_from_file(self):
        try:
            with open("./server/Message.json", "r") as file:
                return json.loads(file.read())
        except FileNotFoundError:
            return []

    def save_messages_to_file(self, messages):
        with open("./server/Message.json", "w") as file:
            json.dump(messages, file, indent=4)

    def run(self, port, host):
        self.app.run(host=host, port=port)