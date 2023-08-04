# `connect()` - Connexion à un compte

La fonction `connect()` permet de connecter l'application cliente à un compte utilisateur.

## Exemple d'utilisation

```js
const majax = new Majax();

const handleLogin = async () => {
    await majax.init("http://localhost:8000/ConnecteServer", "apikey") // Connexion au serveur avec la clé api
        .then(() => {
            localStorage.setItem("email", email); // Enregistre l'email dans le local storage
            majax.connect(email, password, "http://localhost:8000/login", "/Accueil") // Connexion au compte utilisateur
                .then(() => {
                    console.log("Connexion réussie"); // Connexion réussie
                })
                .catch((error) => {
                    setError(error.message); // Affiche l'erreur
                });
        })
};
```

Note : La fonction `connect()` est asynchrone, il faut donc utiliser `await` ou `.then()` pour récupérer le résultat. Nous vous conseillons d'utiliser `await` pour plus de simplicité.

### Exemple de serveur

```python
from flask_session import Session  # Importation de la session
app = Flask(__name__) # Initialisation de l'application Flask
SECRET_KEY = "fq9f529er4f98re5d2c95ea4r85f2s5qe41rf95edcs" # Clé secrète de l'application
PORT = 8000 # Port de l'application

app.config['SESSION_TYPE'] = 'filesystem' # Type de session ( ici, session stockée dans le système de fichiers )
app.config['SECRET_KEY'] = SECRET_KEY # Clé secrète de l'application
Session(app) # Initialisation de la session

@app.route('/login', methods=['POST']) # Route de connexion
def login(): # Fonction de connexion
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

    
if __name__ == '__main__':
    socketio.run(app, port=PORT)
```

## Typage

```js
/**
 * Connecte l'application cliente à un compte utilisateur
 * @param {string} email - Email du compte utilisateur
 * @param {string} password - Mot de passe du compte utilisateur
 * @param {string} login_url - URL de la route de connexion
 * @param {string} home_url - URL de la route de redirection après connexion
 */
```