import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Chemin d'accès au fichier des utilisateurs
const usersFilePath = path.join(process.cwd(), 'pages', 'api', 'auth', 'users.json');

// Fonction de login
export default function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Méthode non autorisée
  }

  // Récupération des données du formulaire
  const { email, password } = req.body;

  // Vérification si le fichier des utilisateurs existe
  if (!fs.existsSync(usersFilePath)) {
    return res.status(500).json({ error: 'Le fichier des utilisateurs n\'existe pas' });
  }
  
  // Lecture des utilisateurs depuis le fichier JSON
  const usersData = fs.readFileSync(usersFilePath, 'utf-8');
  let users;

  try {
    users = JSON.parse(usersData).users;
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la lecture des données des utilisateurs' });
  }

  // Vérifier si users est un tableau
  if (!Array.isArray(users)) {
    return res.status(500).json({ error: 'Les données des utilisateurs ne sont pas valides' });
  }

  // Recherche de l'utilisateur dans la liste
  const userIndex = users.findIndex((user) => user.email === email);

  // Vérifier si l'utilisateur existe et si le mot de passe est correct
  if (userIndex === -1 || users[userIndex].password !== password) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }

  // Mettre à jour la propriété isLoggedIn à true
  users[userIndex].is_logged_in = true;

  // Enregistrer les modifications dans le fichier JSON
  const updatedData = JSON.stringify({ users }, null, 2);
  fs.writeFileSync(usersFilePath, updatedData);

  // Générer un token JWT avec le secret JWT
  const token = jwt.sign({
    email: users[userIndex].email,
    name: users[userIndex].username,
    premium: users[userIndex].premium,
    connected: users[userIndex].is_logged_in
  }, process.env.JWT_SECRET);

  // Répondre avec le token
  res.status(200).json({ token });
}
