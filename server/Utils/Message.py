from flask import request, jsonify, session
import json
import os

class Message:
    def init():
        return jsonify({"message": "Connexion réussie"}), 200, {'Content-Type': 'application/json'}

    def fetch_user(UserEmail):
        with open('./server/Message.json', 'r', encoding='utf-8') as f:
            content = f.read()
            # Trier par rapport à l'email UserEmail
            content = json.loads(content)
            content = [message for message in content if message['sender'] == UserEmail or message['receiver'] == UserEmail]
            return content
    
    def fetchUserUniqueComunity(user_email):
        unique_communicators = set()  # Use a set to store unique email accounts
        with open('./server/Message.json', 'r', encoding='utf-8') as f:
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
        with open('./server/auth/Compte.json', 'r', encoding='utf-8') as f:
            content = f.read()
            content = json.loads(content)
            return jsonify(content)
        
    def fetch_user_filter(UserEmail):
        with open('./server/Message.json', 'r', encoding='utf-8') as f:
            # Trier avec l'email est le timestamp
            content = json.loads(f.read())
            content = [message for message in content if message['sender'] == UserEmail or message['receiver'] == UserEmail]
            # Trier par timestamp
            content = sorted(content, key=lambda k: k['timestamp'])
        return jsonify(content)

    def message():
        messages = Message.read_messages_from_file()
        return jsonify(messages)  
    
    def read_messages_from_file():
        try:
            with open("./server/Message.json", "r") as file:
                return json.loads(file.read())
        except FileNotFoundError:
            return []
        
    def save_messages_to_file(messages):
        with open("./server/Message.json", "w") as file:
            file.write(json.dumps(messages, indent=4))

    def logout():
        # Supprimer les informations de session de l'utilisateur
        session.pop('user_email', None)

        # Rediriger l'utilisateur vers la page de connexion après la déconnexion
        return jsonify({"message": "Déconnexion réussie"}), 200, {'Content-Type': 'application/json'}

    def login():
        data = request.get_json()
        if data and 'email' in data and 'password' in data:
            # Lire les informations d'identification à partir du fichier JSON
            file_path = './server/auth/Compte.json'
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
        
    def login_admin():
        data = request.get_json()
        if data and 'email' in data and 'password' in data:
            # Lire les informations d'identification à partir du fichier JSON
            file_path = './server/www/admin/admin_accounts.json'
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding="utf-8") as file:
                    accounts_list = json.load(file)

                # Vérifier si l'e-mail et le mot de passe correspondent
                for account in accounts_list:
                    if account['email'] == data['email'] and account['password'] == data['password']:
                        session['user_email'] = data['email']
                        return jsonify({"message": "Connexion réussie", "email": data['email']}), 200
                # Si on sort de la boucle, cela signifie que les informations d'identification sont incorrectes
                return jsonify({"error": "Email ou mot de passe incorrect (admin) "}), 401
            else:
                return jsonify({"error": "Fichier de comptes introuvable"}), 500
        else:
            return jsonify({"error": "Données de connexion invalides"}), 400
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
            Message.save_messages_to_file(messages)
            return jsonify({"messages": messages}), 200, {'Content-Type': 'application/json', 'Indent': 4}
        else:
            return jsonify({"error": "Invalid JSON data"}), 400, {'Content-Type': 'application/json', 'Indent': 4}
        
    def check_login():
        user_email = request.args.get('user_email')
        if 'user_email' in session and session['user_email'] == user_email:
            return jsonify({"message": "Utilisateur connecté"}), 200
        else:
            return jsonify({"error": "Utilisateur non connecté"}), 401
        
messages = Message.read_messages_from_file()