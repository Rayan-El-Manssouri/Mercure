import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import axios from 'axios'; // Importer axios pour effectuer des requêtes HTTP
import { io } from 'socket.io-client';

const CONVERSATION_DATA_PATH = path.join(process.cwd(), 'pages', 'api', 'conversation', 'conv.json');

// URL de votre serveur WebSocket
const SOCKET_SERVER_URL = 'http://localhost:4000'; // L'URL de votre serveur WebSocket

export default function handler(req, res) {
    if (req.method === "POST") {
        const token = req.headers.authorization.split(' ')[1];
        const { content, email, received } = req.body;

        fs.readFile(CONVERSATION_DATA_PATH, 'utf-8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture du fichier:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(403).json({ error: 'Invalid token' });
                    return;
                }

                const usersEmail = decodedToken.email;
                const senderName = decodedToken.name;
                const messageTime = Date.now();

                // Parse du JSON des conversations
                let conversationData = JSON.parse(data);

                // Vérifie si la conversation existe déjà pour l'email de l'utilisateur
                if (!conversationData[usersEmail]) {
                    conversationData[usersEmail] = {
                        participants: [],
                        messages: {}
                    };
                }

                // Vérifie si la conversation existe déjà pour l'email de l'utilisateur qui reçoit le message
                if (!conversationData[email]) {
                    conversationData[email] = {
                        participants: [],
                        messages: {}
                    };
                }

                // Enregistrement du message dans la conversation de l'utilisateur
                if (!conversationData[usersEmail].messages[senderName]) {
                    conversationData[usersEmail].messages[senderName] = [];
                }

                conversationData[usersEmail].messages[received].push({
                    messageTime: messageTime,
                    content: content,
                    sender: "you" // Utilisation du nom de l'expéditeur
                });

                // Enregistrement du message dans la conversation de l'utilisateur qui reçoit le message
                if (!conversationData[email].messages[senderName]) {
                    conversationData[email].messages[senderName] = [];
                }

                conversationData[email].messages[senderName].push({
                    messageTime: messageTime,
                    content: content,
                    sender: senderName
                });

                // Écriture dans le fichier JSON
                fs.writeFile(CONVERSATION_DATA_PATH, JSON.stringify(conversationData, null, 2), (err) => {
                    if (err) {
                        console.error('Erreur d\'écriture dans le fichier:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    // Envoyer le message à l'autre utilisateur via WebSocket
                    const socket = io(SOCKET_SERVER_URL);
                    socket.emit('message', {
                        content: content,
                        sender: senderName,
                        messageTime: messageTime,
                        receiver: received // Email de l'utilisateur qui reçoit le message
                    });

                    res.status(200).json({ message: 'Message enregistré avec succès' });
                });
            });
        });
    } else {
        return res.status(403).json({ error: 'Méthode incorrecte reçue' });
    }
}
