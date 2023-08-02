# Fonction connect de Majax

## Description
La fonction connect permet de se connecter à un serveur distant et de récupérer les données JSON pour un serveur de type flask.

# Fonctionnement

## Exemple
```js
import Majax from "../components/Majax/Majax";
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

## Expliquation du code

Ici nous créons une fonction Private qui prend en paramètre isLoggedIn. Cette fonction va nous permettre de vérifier si l'utilisateur est connecté ou non. Si il est connecté, nous allons créer une instance de Majax et nous allons l'initialiser avec l'url du serveur. Ensuite nous allons retourner un composant qui va afficher "Hey !". Est dans la console nous allons voir les données JSON du serveur. Ce qui nous permes de vérifier que le serveur flask est bien connecté à notre application React.