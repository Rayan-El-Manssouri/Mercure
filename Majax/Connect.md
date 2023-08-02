# Fonction connect de Majax

## Description
La fonction connect permet de se connecter à un serveur distant et de récupérer les données JSON pour un serveur de type flask.

# Fonctionnement

## Exemple
```js
import Majax from "../components/Majax/Majax";
import { useEffect } from "react";
const Private = (isLoggedIn) => {

    useEffect(() => {
        if (isLoggedIn) {
            const majax = new Majax();
            majax.init("http://localhost:8000/");
            isLoggedIn = false;
        }
    }, [isLoggedIn]);
    return (
        
        <div className="body_private">
            <p>Hey !</p>
        </div>
    );
};

export default Private;
```

Afin de démarrer le serveur flask, il faut installer flask et flask-cors avec pip. Ensuite il faut créer un fichier app.py et y mettre le code suivant :

```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
PORT = 8000

@app.route("/")
def index():
    return jsonify({"message": "Connexion réussie !"})

if __name__ == "__main__":
    app.run(port=PORT, debug=True)
```

## Expliquation du code

Ici nous créons une fonction Private qui prend en paramètre isLoggedIn. Cette fonction va nous permettre de vérifier si l'utilisateur est connecté ou non. Si il est connecté, nous allons créer une instance de Majax et nous allons l'initialiser avec l'url du serveur. Ensuite nous allons retourner un composant qui va afficher "Hey !". Est dans la console nous allons voir les données JSON du serveur. Ce qui nous permes de vérifier que le serveur flask est bien connecté à notre application React.