import jwt from 'jsonwebtoken';

// Fonction pour obtenir les informations de l'utilisateur
export default function getUserInfo(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token JWT non fourni dans l\'en-tête Authorization' });
    }

    const token = authHeader.split(' ')[1]; // Récupérer le token JWT sans le préfixe "Bearer "

    try {
        // Vérification et décryptage du token JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extraire les informations de l'utilisateur du token décodé
        const { name, email, prenium } = decodedToken;

        // Si le token est valide, renvoyer les informations de l'utilisateur
        res.status(200).json({ name, email, prenium });
    } catch (error) {
        console.error('Erreur lors de la validation du token JWT :', error);
        return res.status(401).json({ error: 'Token JWT non valide' });
    }
}