# `init()` - Connexion à un serveur

La fonction `init()` permet de connecter l'application cliente à un serveur.

## Exemple d'utilisation

```js
const majax = new Majax(); // Initialisation d'une instance de Majax
const status = majax.init("http://localhost:8000/"); // Connexion au serveur
console.log("Connexion réussie : " + status);
```

## Typage

```js
/**
 * @param {string} url - URL du serveur
 * @returns {boolean} - Statut de la connexion
 */
```
