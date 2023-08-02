# `connect()` - Connexion à un compte

La fonction `connect()` permet de connecter l'application cliente à un compte utilisateur.

## Exemple d'utilisation

```js
majax.connect("user", "password_user", "YOUR_API_KEY"); // Connexion à un compte utilisateur commun
majax.connect("admin", "password_admin", "YOUR_API_KEY", "admin"); // Connexion à un compte administrateur
```

## Typage

```js
/**
 * @param {string} id - Identifiant de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @param {string} api_key - Clé API de l'utilisateur
 * @param {string} [role="common"] - Type de compte de l'utilisateur 
 * @returns {boolean} - Statut de la connexion
 */
```
