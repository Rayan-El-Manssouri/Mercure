from Route.RouteManger import RouteManager
from flask import request, jsonify, session
import os
import json
PORT = 8000

# Créez une instance de la classe RouteManager
route_manager = RouteManager()
@route_manager.app.route('/api', methods=['POST'])
def proxy():
    # Récupérer les données JSON de la requête
    data = request.get_json()
    apiKey = data['apikey']
    if  apiKey !=  route_manager.VALIDE_API_KEY:
        # Retourner une erreur si la clé API en clair
        return jsonify({"error": "API key invalide"}), 401, {'Content-Type': 'application/json'}
    else:
        # Chercher le nom de la fonction à appeler
        function_name = data['functionName']
        # Appeler la fonction correspondante
        if function_name == 'init':
            return init()
        elif function_name == 'connect':
            return login()
        elif function_name == 'fetchUser':
            user_email = data['UserEmail']
            return fetch_user(user_email)
        elif function_name == 'fetchUserFilter':
            user_email = data['UserEmail']
            return fetch_user_filter(user_email)
        elif function_name == 'Message':
            return message()
        elif function_name == 'fetchCompte':
            return fetch_compte()
        elif function_name == 'fetchUserUniqueComunity':
            user_email = data['UserEmail']
            return fetchUserUniqueComunity(user_email)
        elif function_name == 'sendMessage':
            return send_message()
        elif function_name == 'logout':
            return logout()
    return jsonify({"error": "Invalid function name"}), 400, {'Content-Type': 'application/json'}
   
        

def init():
    return jsonify({"message": "Connexion réussie"}), 200, {'Content-Type': 'application/json'}


def fetch_user(UserEmail):
    with open('./server/Message.txt', 'r', encoding='utf-8') as f:
        content = f.read()
        # Trier par rapport à l'email UserEmail
        content = json.loads(content)
        content = [message for message in content if message['sender'] == UserEmail or message['receiver'] == UserEmail]
        return content
    
def fetchUserUniqueComunity(user_email):
    unique_communicators = set()  # Use a set to store unique email accounts
    with open('./server/Message.txt', 'r', encoding='utf-8') as f:
        content = json.load(f)
        for message in content:
            # Check if the message involves the specified user_email
            if message['sender'] == user_email:
                unique_communicators.add(message['receiver'])
            elif message['receiver'] == user_email:
                unique_communicators.add(message['sender'])
    
    # Convert the set back to a list before returning
    return list(unique_communicators)


def fetch_compte():
    with open('./server/auth/Compte.txt', 'r', encoding='utf-8') as f:
        content = f.read()
        content = json.loads(content)
        return jsonify(content)
    
def fetch_user_filter(UserEmail):
    with open('./server/Message.txt', 'r', encoding='utf-8') as f:
        # Trier avec l'email est le timestamp
        content = json.loads(f.read())
        content = [message for message in content if message['sender'] == UserEmail or message['receiver'] == UserEmail]
        # Trier par timestamp
        content = sorted(content, key=lambda k: k['timestamp'])
        return jsonify(content)

def message():
    messages = read_messages_from_file()
    return jsonify(messages)  

    
def read_messages_from_file():
    try:
        with open("./server/Message.txt", "r") as file:
            return json.loads(file.read())
    except FileNotFoundError:
        return []
    
def save_messages_to_file(messages):
    with open("./server/Message.txt", "w") as file:
        file.write(json.dumps(messages, indent=4))

messages = read_messages_from_file()

def logout():
    # Supprimer les informations de session de l'utilisateur
    session.pop('user_email', None)

    # Rediriger l'utilisateur vers la page de connexion après la déconnexion
    return jsonify({"message": "Déconnexion réussie"}), 200, {'Content-Type': 'application/json'}

def login():
    data = request.get_json()
    if data and 'email' in data and 'password' in data:
        # Lire les informations d'identification à partir du fichier JSON
        file_path = './server/auth/Compte.txt'
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


@route_manager.app.route('/checkLogin', methods=['GET'])
def check_login():
    user_email = request.args.get('user_email')
    
    if 'user_email' in session and session['user_email'] == user_email:
        return jsonify({"message": "Utilisateur connecté"}), 200
    else:
        return jsonify({"error": "Utilisateur non connecté"}), 401
    
    
@route_manager.app.route('/new-messages', methods=['GET'])
def get_new_messages():
    last_message_id = int(request.args.get('lastMessageId', 0))
    new_messages = [message for message in messages if message['id'] > last_message_id]
    return jsonify({"messages": new_messages}), 200, {'Content-Type': 'application/json', 'Indent': 4}

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

        return jsonify({"messages": messages}), 200, {'Content-Type': 'application/json', 'Indent': 4}
    else:
        return jsonify({"error": "Invalid JSON data"}), 400, {'Content-Type': 'application/json', 'Indent': 4}

if __name__ == '__main__':
    route_manager.run(PORT)