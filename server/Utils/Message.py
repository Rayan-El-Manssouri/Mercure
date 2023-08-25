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
        unique_communicators = []  # Utilisez une liste pour stocker les communicateurs uniques
        with open('./server/Message.json', 'r', encoding='utf-8') as f:
            content = json.load(f)
            for message in content:
                if message['sender']['email'] == user_email:
                    communicator = {
                        'role': message['sender']['role'],
                        'email': message['sender']['email'],
                        'pseudo': message['sender']['pseudo'],
                        'content': message['content'],
                        'sender': message['sender'],
                        'receiver': message['receiver']
                    }
                    if communicator not in unique_communicators:
                        unique_communicators.append(communicator)
                elif message['receiver'] == user_email:
                    communicator = {
                        'role': message['sender']['role'],
                        'email': message['sender']['email'],
                        'pseudo': message['sender']['pseudo'],
                        'content': message['content'],
                        'sender': message['sender'],
                        'receiver': message['receiver']
                    }
                    if communicator not in unique_communicators:
                        unique_communicators.append(communicator)

        # Convertissez la liste de dictionnaires en une chaîne JSON avant de la renvoyer
        return json.dumps(unique_communicators)

    
    def fetch_compte():
        with open('./server/auth/Compte.json', 'r', encoding='utf-8') as f:
            content = f.read()
            content = json.loads(content)
            return jsonify(content)
        
    def fetch_user_filter(UserEmail, AdminEmail):
        with open('./server/Message.json', 'r', encoding='utf-8') as f:
            # Charger les données JSON
            content = json.loads(f.read())
            
            # Filtrer les messages où l'utilisateur est l'expéditeur ou le destinataire
            content = [message for message in content if (message['sender']['email'] == UserEmail or message['receiver'] == UserEmail) and (message['sender']['email'] == AdminEmail or message['receiver'] == AdminEmail)]
            
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