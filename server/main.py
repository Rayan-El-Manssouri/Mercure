from flask import Flask, request, jsonify, Response
import json
from flask_cors import CORS
from flask_socketio import SocketIO, send

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")



def read_messages_from_file():
    try:
        with open("Message.txt", "r") as file:
            return json.loads(file.read())
    except FileNotFoundError:
        return []



def save_messages_to_file(messages):
    with open("Message.txt", "w") as file:
        json.dump(messages, file, indent=4)

messages = read_messages_from_file()

@app.route('/messages', methods=['GET'])
def get_messages():
    return jsonify({"messages": messages}), 200, {'Content-Type': 'application/json', 'Indent': 4}

@app.route('/new-messages', methods=['GET'])
def get_new_messages():
    last_message_id = int(request.args.get('lastMessageId', 0))
    new_messages = [message for message in messages if message['id'] > last_message_id]
    return jsonify({"messages": new_messages}), 200, {'Content-Type': 'application/json', 'Indent': 4}

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    if data and isinstance(data, dict):
        new_message = {
            "id": len(messages) + 1,
            "sender": data.get("sender"),
            "receiver": data.get("receiver"),
            "timestamp": data.get("timestamp"),
            "content": data.get("content"),
        }
        messages.append(new_message)
        save_messages_to_file(messages)

        socketio.emit('new_message', new_message)  # Supprime l'argument 'broadcast'

        return jsonify({"message": new_message}), 201, {'Content-Type': 'application/json', 'Indent': 4}
    else:
        return jsonify({"error": "Invalid JSON data"}), 400, {'Content-Type': 'application/json', 'Indent': 4}

if __name__ == '__main__':
    socketio.run(app, port=8000)
