# `init()` - Connexion à un serveur

La fonction `init()` permet de connecter l'application cliente à un serveur via une clé api.

## Exemple d'utilisation

```js
const handleLoginSever = async () => {
    await majax.init("http://localhost:8000/ConnecteServer", "apikey") // Connexion au serveur avec la clé api
        .then(() => {
            console.log("Connexion réussie"); // Connexion réussie
        })
        .catch((error) => {
            setError(error.message); // Affiche l'erreur
        });
};
```

### Exemple de serveur

```python
VALIDE_API_KEY = "apikey"

@app.route('/ConnecteServer', methods=['POST'])
def connect_server():
    # Récupérer les données JSON de la requête
    data = request.get_json()
    apiKey = data['apiKey']
    if  apiKey != VALIDE_API_KEY:
        # Retourner une erreur si la clé API en clair
        return jsonify({"error": "API key invalide"}), 401, {'Content-Type': 'application/json'}
        
    else:
        # Retourner une réponse réussie si la clé API est valide
        return jsonify({"message": "API key valide"}), 200, {'Content-Type': 'application/json'}
```

## Typage

```js
/**
 * @param {string} url - URL du serveur
 * @param {string} apiKey - Clé API
 */
```

Le serveur reçoit les données JSON envoyées par le client dans le champ apiKey. Il vérifie ensuite si cette clé correspond à la clé API valide (VALIDE_API_KEY). Si la clé est valide, le serveur renvoie une réponse réussie au format JSON, sinon il renvoie une erreur indiquant que la clé API est invalide.

En utilisant cette approche, l'application cliente peut se connecter au serveur de manière sécurisée en transmettant la clé API nécessaire.