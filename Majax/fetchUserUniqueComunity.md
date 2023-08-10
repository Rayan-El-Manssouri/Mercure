# `fetchUserUniqueComunity()` - Connexion à un serveur

La fonction `fetchUserUniqueComunity()` permet de récupérer les compte ayant communiquer avec l'utilisateur.

## Exemple d'utilisation

```js
const majax = new Majax();

const handleFetchUserUnique = async () => {
    await majax.init("http://localhost:8000/ConnecteServer", "apikey") // Connexion au serveur avec la clé api
        .then(() => {
            majax.fetchUserUniqueComunity(url, UserEmail, apikey, functionName) // Récupération des informations d'un compte
                .then((user) => {
                    console.log(user); // Affiche les informations du compte
                })
                .catch((error) => {
                    setError(error.message); // Affiche l'erreur
                });
        })
        .catch((error) => {
            setError(error.message); // Affiche l'erreur
        });
};
```
# Exemple serveur python

```python
def fetch_user_filter(UserEmail):
        with open('./server/Message.json', 'r', encoding='utf-8') as f:
            # Trier avec l'email est le timestamp
            content = json.loads(f.read())
            content = [message for message in content if message['sender'] == UserEmail or message['receiver'] == UserEmail]
            # Trier par timestamp
            content = sorted(content, key=lambda k: k['timestamp'])
        return jsonify(content)
```

Note : Le serveur doit retourner un tableau d'objet JSON avec les champs suivant :
    
```json
{
    "sender": "string",
    "receiver": "string",
    "timestamp": "string",
    "message": "string"
}
```

# Paramètres

| Paramètre | Type | Description |
| - | - | - |
| url | string | URL du serveur |
| UserEmail | string | Email de l'utilisateur ciblé |
| apikey | string | API key ( clé d'accer aux serveur ) |
| functionName | string | Nom de la fonction à appeller dans l'api |


# Typage

```js
/**
 * @param {string} url - URL du serveur
 * @param {string} UserEmail - Email de l'utilisateur ciblé
 * @param {string} apikey - API key ( clé d'accer aux serveur )
 * @param {string} functionName - Nom de la fonction à appeller dans l'api
 */
```