import jwt from 'jsonwebtoken'

export default function handler(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token JWT non fourni dans l\'en-tête Authorization' });
        }

        const token = authHeader.split(' ')[1];
        // Vérification et décryptage du token JWT
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extraire les informations de l'utilisateur du token décodé
        const { name } = decodedToken;

        res.status(200).json({ message: name });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
}