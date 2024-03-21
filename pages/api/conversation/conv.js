// Importez fs pour la gestion des fichiers
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken'; // Assurez-vous d'avoir installé le package jsonwebtoken

// Définissez le chemin absolu vers le fichier JSON
const CONVERSATION_DATA_PATH = path.join(process.cwd(), 'pages', 'api', 'conversation', 'conv.json');

// Fonction pour vérifier si l'email de l'utilisateur est dans les participants
function isUserInConversation(userEmail, conversation) {
    return userEmail in conversation;
}

// Définissez la fonction handler qui gère la route de l'API
export default function handler(req, res) {
    // Vérifiez la méthode de la requête
    if (req.method === 'POST') {
        try {
            // Lisez le fichier JSON de manière asynchrone
            fs.readFile(CONVERSATION_DATA_PATH, 'utf-8', (err, data) => {
                if (err) {
                    // En cas d'erreur de lecture du fichier, renvoyez une erreur 500
                    console.error('Erreur de lecture du fichier:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                // Parsez les données JSON
                const conversationData = JSON.parse(data);

                // Obtenez le token de la requête (exemple)
                const token = req.headers.authorization.split(' ')[1];

                // Vérifiez si le token est valide et extrayez l'email de l'utilisateur
                jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                    if (err) {
                        // Si le token est invalide, renvoyez une erreur 403
                        res.status(403).json({ error: 'Invalid token' });
                        return;
                    }

                    // Récupérez l'email de l'utilisateur à partir du token décodé
                    const userEmail = decodedToken.email;

                    // Vérifiez si l'utilisateur est dans la conversation
                    if (isUserInConversation(userEmail, conversationData)) {
                        // Si oui, renvoyez la conversation
                        res.status(200).json(conversationData[userEmail]);
                    } else {
                        // Si non, renvoyez un message indiquant que l'utilisateur n'est pas autorisé
                        res.status(403).json({ error: 'User not authorized for this conversation' });
                    }
                });
            });
        } catch (error) {
            // En cas d'autres erreurs, renvoyez une erreur 500
            console.error('Erreur lors de la gestion de la requête:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Si la méthode de la requête n'est pas POST, renvoyez une erreur 405
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
