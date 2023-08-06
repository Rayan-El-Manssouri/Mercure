from flask import Flask
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO
import json

SECRET_KEY = "fq9f529er4f98re5d2c95ea4r85f2s5qe41rf95edcs"

class RouteManager:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['SESSION_TYPE'] = 'filesystem'
        self.app.config['SECRET_KEY'] = SECRET_KEY

        # Autoriser les requêtes cross-origin (CORS) seulement si le nom de domaine est localhost
        cors = CORS(self.app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
        Session(self.app)

        self.socketio = SocketIO(self.app, cors_allowed_origins="*", cors_allowed_methods="*")

        # Clé API valide
        self.VALIDE_API_KEY = "apikey"

        self.messages = self.read_messages_from_file()

        # Les routes peuvent être définies ici en utilisant self.app.route()

    def read_messages_from_file(self):
        try:
            with open("./server/Message.txt", "r") as file:
                return json.loads(file.read())
        except FileNotFoundError:
            return []

    def save_messages_to_file(self, messages):
        with open("./server/Message.txt", "w") as file:
            json.dump(messages, file, indent=4)

    def run(self, port):
        self.app.run(port=port)