from flask import Flask, request, jsonify, session, make_response
import json
from flask_cors import CORS
from flask_socketio import SocketIO, send
import os

SECRET_KEY = 'fq9f529er4f98re5d2c95ea4r85f2s5qe41rf95edcs'
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY  # Définir la clé secrète pour Flask
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*", cors_allowed_methods="*")  # Ajoutez cette ligne pour configurer CORS pour SocketIO
def read_messages_from_file():
    try:
        with open("./server/Message.txt", "r") as file:
            return json.loads(file.read())
    except FileNotFoundError:
        return []

@app.route('/Message.txt')
def get_file():
    messages = read_messages_from_file()
    return jsonify(messages)  # Utilise jsonify pour renvoyer les données JSON avec l'en-tête approprié



def save_messages_to_file(messages):
    with open("Message.txt", "w") as file:
        json.dump(messages, file, indent=4)

messages = read_messages_from_file()

@app.route('/logout', methods=['GET'])
def logout():
    # Supprimer les informations de session de l'utilisateur
    session.pop('user_email', None)

    # Rediriger l'utilisateur vers la page de connexion après la déconnexion
    return jsonify({"message": "Déconnexion réussie"}), 200, {'Content-Type': 'application/json'}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data and 'email' in data and 'password' in data:
        # Lire les informations d'identification à partir du fichier JSON
        file_path = './server/Compte.txt'
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding="utf-8") as file:
                accounts_list = json.load(file)

            # Vérifier si l'e-mail et le mot de passe correspondent
            for account in accounts_list:
                if account['email'] == data['email'] and account['password'] == data['password']:
                    session['user_email'] = data['email']
                    return jsonify({"message": "Connexion réussie", "email": data['email']}), 200
            # Si on sort de la boucle, cela signifie que les informations d'identification sont incorrectes
            return jsonify({"error": "Email ou mot de passe incorrect"}), 401
        else:
            return jsonify({"error": "Fichier de comptes introuvable"}), 500
    else:
        return jsonify({"error": "Données de connexion invalides"}), 400


# Ouvrir le fichier texte et lire son contenu avec l'encodage UTF-8
with open('./server/Compte.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Si la route est /Compte.txt, renvoyer le contenu du fichier
@app.route('/Compte.txt')
def get_file_compte():
    return content

@app.route('/checkLogin', methods=['GET'])
def check_login():
    # Vérifier si l'utilisateur est connecté en vérifiant la présence de l'adresse e-mail dans la session
    if 'user_email' in session:
        return jsonify({"message": "Utilisateur connecté"}), 200
    else:
        return jsonify({"error": "Utilisateur non connecté"}), 401

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
