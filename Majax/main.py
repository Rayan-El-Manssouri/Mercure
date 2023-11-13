from flask import Flask, request, session, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = '6d145f11cd0e4905b93c51c20aa1450f'
CORS(app=app)

def hash_mdp(mdp):
   return generate_password_hash(mdp)

@app.route('/Subscribe', methods=['POST'])
def Subscribe():
    data = request.get_json()
    if data and 'pseudo' in data and 'password' and 'email':
        file_path = './Majax/Database/Users.json'
        try:
            with open(file_path, "r") as existing_file:
                existing_data = json.load(existing_file)
        except FileNotFoundError:
            existing_data = []

        for user in existing_data:
            if user.get("email") == data['email']:
                print(user.get("email"))
                return jsonify({"message": "Cet e-mail est déjà utilisé"}), 400
    
        # Ajouter le nouveau contenu
        new_content = {
            "Pseudo": data['pseudo'],
            "Password_Hash": hash_mdp(data['password']),
            "email": data['email']
        }

        existing_data.append(new_content)

        # Écrire le contenu mis à jour dans le fichier
        with open(file_path, "w") as jsonFile:
            json.dump(existing_data, jsonFile, indent=4)
            return jsonify({"message": "Inscription réussie"}), 200
    else :
        return jsonify({"message": "Inscription réussie"}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data and 'email' in data and 'password' in data:
        file_path = './Majax/Database/Users.json'
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding="utf-8") as f:
                accounts_list = json.load(f)
            for account in accounts_list:
                if(data['email'] == account['email']):
                    if (check_password_hash(account['Password_Hash'], data['password']) == True):
                        session['user_pseudo'] = data['email']
                        return jsonify({"message": "Connexion réussie", "email": data['email']}), 200
                else:
                    return jsonify({"message": "Aucune email trouvée.", "email": data['email']}), 400
            # Si on sort de la boucle, cela signifie que les informations d'identification sont incorrectes
            return jsonify({"message": "Email ou mot de passe incorrect"}), 401
        return jsonify({"message": "Fichier JSON introuvable ou vide."}), 401
    else:
        return jsonify({"message": "Requête / argument mal envoyer."}), 401

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run('localhost', 5000, debug=True)