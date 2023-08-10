# `fetchUser()` - Récupération des informations d'un compte

La fonction `fetchUser()` permet de récupérer les informations d'un compte.

## Exemple d'utilisation

```js
const majax = new Majax();
const handleLoginSever = async () => {
    await majax.init("http://localhost:8000/ConnecteServer", "apikey") // Connexion au serveur avec la clé api
        .then(() => {
            majax.fetchUser(url, UserEmail, apikey, functionName) 
                .then((user) => {
                    console.log(user); 
                })
                .catch((error) => {
                    setError(error.message); 
                });
        })
        .catch((error) => {
            setError(error.message); 
        });
};
```

Note : on utilise une fonction asynchrone pour pouvoir utiliser le mot clé `await` qui permet d'attendre la fin de l'exécution de la fonction `init()` avant de passer à la suite du code. Ainsi on peut récupérer les informations d'un compte d'une façon sécurisée.

### Exemple de serveur

```python
def fetch_user(UserEmail):
    with open('./server/Message.json', 'r', encoding='utf-8') as f:
        content = f.read()
        # Trier par rapport à l'email UserEmail
        content = json.loads(content)
        content = [message for message in content if message['sender'] == UserEmail or message['receiver'] == UserEmail]
        return content
```

## Typage

```js
/**
 * @param {string} url - URL du serveur
 * @param {string} UserEmail - Email de l'utilisateur ciblé
 * @param {string} apikey - API key ( clé d'accer aux serveur )
 * @param {string} functionName - Nom de la fonction à appeller dans l'api
 */
```