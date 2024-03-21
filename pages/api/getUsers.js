import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const token = req.headers.authorization;

        // Vérifier si le token est présent dans la requête
        if (!token) {
            res.status(401).json({ message: 'Token manquant' });

            return;
        }

        // Chemin vers le fichier users.json
        const usersFilePath = path.join(process.cwd(), 'pages', 'api', 'auth', 'users.json');

        // Lire le contenu du fichier users.json
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier:', err);
                res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
                return;
            }

            // Parser les données JSON
            const users = JSON.parse(data);

            // Récupérer uniquement les noms d'utilisateur
            const usernames = users.map(user => user.UsersName);

            // Renvoyer uniquement les noms d'utilisateur
            res.status(200).json(usernames);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
}
