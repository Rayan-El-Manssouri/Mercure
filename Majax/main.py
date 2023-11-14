from flask import Flask, request, session, jsonify
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import json

app = Flask(__name__)

app.config['SECRET_KEY'] = '6d145f11cd0e4905b93c51c20aa1450f'
app.config['JWT_SECRET_KEY'] = '85115s61d54df899f4es5d1f'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_TYPE'] = 'filesystem'

CORS(app=app)
Session(app)
jwt = JWTManager(app)

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
                if data['email'] == account['email']:
                    if check_password_hash(account['Password_Hash'], data['password']):
                        # Générer le jeton JWT
                        access_token = create_access_token(identity=data['email'])
                        session['user_email'] = data['email']
                        print('Nouvelle utilisateur connecter : ', data['email'])
                        return jsonify({"message": "Connexion réussie", "access_token": access_token, "email": data['email']}), 200
                    else:
                        return jsonify({"message": "Mot de passe incorrect"}), 401
            return jsonify({"message": "Aucun compte trouvé pour cet email"}), 404
        return jsonify({"message": "Fichier JSON introuvable ou vide."}), 401
    else:
        return jsonify({"message": "Requête / argument mal envoyé."}), 400

@app.route('/Logged', methods=['POST'])
@jwt_required()
def Logged():
    current_users = get_jwt_identity()
    return jsonify({"message": "Utilisateur connecté", "email": current_users}), 200

@app.route('/check_login', methods=['POST'])
@jwt_required()
def check_login():
    user_email = request.args.get('user_email')
    if 'user_email' in session and session['user_email'] == user_email:
        return jsonify({"message": "Utilisateur connecté"}), 200
    else:
        return jsonify({"error": "Utilisateur non connecté"}), 401
    
@app.route('/Fetch_Pseudo', methods=['POST'])
@jwt_required()
def fetch_pseudo():
    try:
        data = request.get_json()
        email = data['user_email']
        with open('./Majax/Database/Users.json', 'r', encoding='utf-8') as f:
            users_data = json.load(f)
            for user in users_data:
                print("Email:", user['email'], "user_email", email)
                if user['email'] == email:
                    return jsonify({"message": "Email trouvée !", "pseudo": user['Pseudo']})
            
            # Si l'email n'est pas trouvé dans la boucle, retourner un message approprié
            return jsonify({"message": "Email non trouvée."})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Non accessible."}), 401

if __name__ == "__main__":
    app.run('localhost', 5000)