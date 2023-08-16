from flask import Flask
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO
import json
import logging


class RouteManager:
    def __init__(self):
        # Configuration du serveur Flask
        self.app = Flask(__name__)
        self.load_config()
        self.app.logger.setLevel(logging.ERROR)
        CORS(self.app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
        self.VALIDE_API_KEY = self.config["API_KEY_DECRYPT"]
        self.messages = self.read_messages_from_file()
        Session(self.app)
        self.socketio = SocketIO(self.app, cors_allowed_origins="*", cors_allowed_methods="*")

    def load_config(self):
        with open("./server/config.json", "r") as config_file:
            self.config = json.load(config_file)

    def read_messages_from_file(self):
        try:
            with open("./server/Message.json", "r") as file:
                return json.loads(file.read())
        except FileNotFoundError:
            return []

    def save_messages_to_file(self, messages):
        with open("./server/Message.json", "w") as file:
            json.dump(messages, file, indent=4)

    def run(self, port):
        self.app.run(port=port)
