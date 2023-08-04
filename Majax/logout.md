# `logout()` - Déconnexion d'un compte

La fonction `logout()` permet de déconnecter un compte utilisateur.

## Exemple d'utilisation

```js
const handleLogout = async () => {
    const majax = new Majax();
    await majax.init("http://localhost:8000/ConnecteServer", "apikey");
    majax.logout("http://localhost:8000/logout", "/Connect")
};
```

Note : La fonction `logout()` est asynchrone, il faut donc utiliser `await` ou `.then()` pour récupérer le résultat. Nous vous conseillons d'utiliser `await` pour plus de simplicité.

### Exemple de serveur

```python
@app.route('/logout', methods=['GET'])
def logout():
    # Supprimer les informations de session de l'utilisateur
    session.pop('user_email', None)

    # Rediriger l'utilisateur vers la page de connexion après la déconnexion
    return jsonify({"message": "Déconnexion réussie"}), 200, {'Content-Type': 'application/json'}
```

## Typage

```js
/**
 * @param {string} url - URL du serveur
 * @param {string} redirect - URL de redirection
 */
```

## Erreurs

| Code | Message | Description |
| ---- | ------- | ----------- |
| 200 | Déconnexion réussie | L'utilisateur est déconnecté |