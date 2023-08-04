# `verifyaccount()` - Vérification d'un compte si il est connecté

La fonction `verifyaccount()` permet de vérifier si un compte utilisateur est connecté.

## Exemple d'utilisation

```js
const majax = new Majax();
const [isConnected, setIsConnected] = useState(false);

useEffect(() => {
    const handleinit = async () => {
        try {
            await majax.init("http://localhost:8000/ConnecteServer", "apikey"); // Connexion au serveur avec la clé api
            const status = await majax.verifyaccount(localStorage.getItem("email"), "http:/localhost:8000/checkLogin"); // Vérification du compte utilisateur
            setIsConnected(status); // Enregistre le statut dans le state isConnected (true si connecté, false sinon)
        } catch (error) {
            console.log("Error in handleinit:", error);
            setIsConnected(false);
        }
    };
    handleinit();
}, []);
```

Note : La fonction `verifyaccount()` est asynchrone, il faut donc utiliser `await` ou `.then()` pour récupérer le résultat. Nous vous conseillons d'utiliser `await` pour plus de simplicité.

### Exemple de serveur

```python
@app.route('/checkLogin', methods=['GET'])
def check_login():
    user_email = request.args.get('user_email')
    
    if 'user_email' in session and session['user_email'] == user_email:
        return jsonify({"message": "Utilisateur connecté"}), 200
    else:
        return jsonify({"error": "Utilisateur non connecté"}), 401
```

## Typage

```js
/**
 * @param {string} email - Email de l'utilisateur
 * @param {string} url - URL du serveur
 * @returns {Promise<boolean>} - Retourne true si l'utilisateur est connecté, false sinon
 */
```

## Erreurs

| Code | Message | Description |
| ---- | ------- | ----------- |
| 401 | Utilisateur non connecté | L'utilisateur n'est pas connecté |
| 200 | Utilisateur connecté | L'utilisateur est connecté |


Note : La fonction `verifyaccount()` renverra false ou true.