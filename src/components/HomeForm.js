import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const HomeForm = () => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isSendingMessage, setIsSendingMessage] = useState(false);

    useEffect(() => {
        // Charger les messages une seule fois au montage du composant
        loadMessages();

        // Écouter l'événement "new_message" du serveur une seule fois lors du montage du composant
        const newMessageListener = (message) => {
            const isMessageExist = messages.some((msg) => msg.id === message.id);
            if (!isMessageExist) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };
        socket.on("new_message", newMessageListener);

        // Nettoyage : désabonner l'écouteur de l'événement lorsque le composant est démonté
        return () => {
            socket.off("new_message", newMessageListener);
        };
    }, []); // Tableau de dépendances vide pour exécuter une seule fois au montage

    const loadMessages = () => {
        fetch("http://localhost:8000/messages")
            .then((response) => response.json())
            .then((data) => setMessages(data.messages))
            .catch((error) => console.error("Erreur lors de la récupération des messages:", error));
    };

    const handleSendMessage = () => {
        if (isSendingMessage) {
            return; // Ne rien faire si un envoi est déjà en cours
        }

        const newMessageData = {
            id: messages.length + 1,
            sender: "compte_utilisateur_1",
            receiver: "compte_utilisateur_2",
            timestamp: new Date().toISOString(),
            content: newMessage,
        };

        setIsSendingMessage(true); // Désactiver le bouton "Envoyer"

        fetch("http://localhost:8000/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessageData),
        })
            .then((response) => {
                // Vérifier si la réponse est OK (statut 200)
                if (!response.ok) {
                    throw new Error("Erreur lors de la requête de l'envoi du message.");
                }
                return response.json();
            })
            .then((data) => {
                // Le nouveau message est envoyé par le serveur, le message est déjà ajouté dans la liste des messages côté serveur
                // Pas besoin d'ajouter à nouveau le message localement
                setNewMessage("");
                setIsSendingMessage(false); // Réactiver le bouton "Envoyer" après la fin de la requête
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi du message:", error);
                setIsSendingMessage(false); // Réactiver le bouton "Envoyer" en cas d'erreur
            });
    };

    return (
        <div>
            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}: </strong>
                        {message.content}
                    </div>
                ))}
            </div>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Envoyer</button>
        </div>
    );
};

export default HomeForm;
