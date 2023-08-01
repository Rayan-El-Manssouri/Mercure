/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import HeaderPrivate from "../components/HeaderPrivate";
import NavBarHome from "../components/NavBarHome";
import axios from "axios";
import io from "socket.io-client";
import { IconCirclePlus, IconX, IconUserCircle } from "@tabler/icons-react";
const MessageSend = ({ message }) => {
    const { sender, content } = message;
    const isSentByMe = sender === localStorage.getItem("email");

    return (
        <div className="message_conteneur">
            <div className={isSentByMe ? "message_receipt" : "message_send"}>
                {!isSentByMe && (
                    <div>
                        <IconUserCircle size={36} />
                    </div>
                )}
                <p>{content}</p>
                {isSentByMe && <div className="separator"></div>}
            </div>
        </div>
    );
};

const Messagerie = () => {
    const email = localStorage.getItem("email");
    // État pour stocker les derniers messages de chaque utilisateur
    const [latestMessages, setLatestMessages] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const scrollRef = useRef();

    const [userAccounts, setUserAccounts] = useState([]); // État pour stocker les comptes des utilisateurs
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:8000/Message.txt");
                const data = await response.json();
                // Filtrer les messages en fonction de l'utilisateur connecté (email)
                const filteredMessages = data.filter(
                    (message) => message.sender === email || message.receiver === email,
                );

                // Regrouper les messages par expéditeur (sender) ou destinataire (receiver) tout en conservant les doublons
                const groupedMessages = {};

                filteredMessages.forEach((message) => {
                    const otherUser = message.sender === email ? message.receiver : message.sender;
                    if (
                        !groupedMessages[otherUser] ||
                        new Date(message.timestamp) > new Date(groupedMessages[otherUser].timestamp)
                    ) {
                        groupedMessages[otherUser] = message;
                    }
                });

                // Obtenir les derniers messages de chaque utilisateur (avec les doublons)
                const latestMessagesWithDuplicates = Object.values(groupedMessages);

                // Trier les messages par timestamp, le plus récent d'abord (ordre stable)
                latestMessagesWithDuplicates.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp) || a.id - b.id,
                );

                // Afficher le contenu des derniers messages pour vérifier s'ils sont corrects

                // Supprimer les doublons basés sur l'ID (conserver uniquement le dernier message de chaque utilisateur)
                const latestMessagesByUser = Array.from(
                    new Map(latestMessagesWithDuplicates.map((message) => [message.id, message])).values(),
                );

                // Afficher le contenu des derniers messages sans doublons

                setLatestMessages(latestMessagesByUser);
                setAllMessages(filteredMessages); // Stocker tous les messages dans l'état allMessages
            } catch (error) {
                console.error("Erreur lors de la récupération des messages:", error);
            }
        };

        fetchMessages();
    }, [email]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch les messages
                const messagesResponse = await fetch("http://localhost:8000/Message.txt");
                const messagesData = await messagesResponse.json();

                // Fetch les comptes d'utilisateurs
                const accountsResponse = await fetch("http://localhost:8000/Compte.txt");
                const accountsData = await accountsResponse.json();

                // Filtrer les messages en fonction de l'utilisateur connecté (email)
                const filteredMessages = messagesData.filter(
                    (message) => message.sender === email || message.receiver === email,
                );

                // Regrouper les messages par expéditeur (sender) ou destinataire (receiver) tout en conservant les doublons
                const groupedMessages = {};

                filteredMessages.forEach((message) => {
                    const otherUser = message.sender === email ? message.receiver : message.sender;
                    if (
                        !groupedMessages[otherUser] ||
                        new Date(message.timestamp) > new Date(groupedMessages[otherUser].timestamp)
                    ) {
                        groupedMessages[otherUser] = message;
                    }
                });

                // Obtenir les derniers messages de chaque utilisateur (avec les doublons)
                const latestMessagesWithDuplicates = Object.values(groupedMessages);

                // Trier les messages par timestamp, le plus récent d'abord (ordre stable)
                latestMessagesWithDuplicates.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp) || a.id - b.id,
                );

                // Supprimer les doublons basés sur l'ID (conserver uniquement le dernier message de chaque utilisateur)
                const latestMessagesByUser = Array.from(
                    new Map(latestMessagesWithDuplicates.map((message) => [message.id, message])).values(),
                );

                setLatestMessages(latestMessagesByUser);
                setAllMessages(filteredMessages); // Stocker tous les messages dans l'état allMessages
                setUserAccounts(accountsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchData();
    }, [email]);

    // Mettre la scrollbar en bas par défaut
    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [selectedMessages]);

    useEffect(() => {
        if (selectedEmail) {
            // Filtrer les messages en fonction de l'email sélectionné
            const filteredMessages = allMessages.filter(
                (message) =>
                    (message.sender === selectedEmail && message.receiver === email) ||
                    (message.sender === email && message.receiver === selectedEmail),
            );

            // Trier les messages par timestamp, le plus récent d'abord
            filteredMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            // Mettre à jour l'état avec les messages associés à l'email sélectionné
            setSelectedMessages(filteredMessages);
        }
    }, [selectedEmail, allMessages, email]);

    useEffect(() => {
        // Créer une instance socket.io-client et se connecter au serveur
        const socket = io("http://localhost:8000");

        // Écouter l'événement 'new_message' émis par le serveur
        socket.on("new_message", (newMessage) => {
            // Traiter le nouveau message reçu du serveur

            setAllMessages((prevMessages) => {
                const existingMessage = prevMessages.find((message) => message.id === newMessage.id);
                if (existingMessage) {
                    return prevMessages.map((message) => {
                        if (message.id === newMessage.id) {
                            return newMessage;
                        } else {
                            return message;
                        }
                    });
                } else {
                    return [...prevMessages, newMessage];
                }
            });

            // Update latestMessages with the new message
            const updatedLatestMessages = latestMessages.map((message) => {
                if (
                    (message.sender === email && message.receiver === newMessage.sender) ||
                    (message.sender === newMessage.sender && message.receiver === email)
                ) {
                    return newMessage;
                }
                return message;
            });

            setLatestMessages(updatedLatestMessages);
        });

        // Fermer la connexion socket.io lorsque le composant est démonté pour éviter les fuites de mémoire
        return () => {
            socket.disconnect();
        };
    }, [email, latestMessages]);

    const Message = ({ message }) => {
        const { sender, receiver } = message;

        // Find the account data for the other user (either sender or receiver)
        const otherUserAccount = userAccounts.find(
            (account) => account.email === (sender === email ? receiver : sender),
        );

        const handleClick = () => {
            setSelectedEmail(otherUserAccount?.email || "");
        };

        // Find the latest message for this user (either sent or received)
        const latestMessage = latestMessages.find(
            (msg) =>
                (msg.sender === email && msg.receiver === otherUserAccount?.email) ||
                (msg.sender === otherUserAccount?.email && msg.receiver === email),
        );

        return (
            <section onClick={handleClick}>
                <div>
                    <IconUserCircle size={56} />
                </div>
                <div className="contact_user_section">
                    {userAccounts.length === 0 ? (
                        <p className="pseudo">Loading...</p>
                    ) : otherUserAccount ? (
                        <p className="pseudo">{otherUserAccount.NomMessage}</p>
                    ) : (
                        <p className="pseudo">Unknown User</p>
                    )}
                    {/* Display the latest message or "Vous : ..." */}
                    <p className="user_message">
                        {latestMessage && latestMessage.sender === email
                            ? `Vous : ${latestMessage.content}`
                            : latestMessage?.content || "Aucun message"}
                    </p>
                </div>
            </section>
        );
    };

    const sendMessageToServer = async (sender, receiver, content) => {
        try {
            // Mettre à jours en temps réel les messages avec socket.io
            const response = await axios.post("http://localhost:8000/send-message", {
                sender,
                receiver,
                content,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du message:", error);
        }
    };

    const [newMessageContent, setNewMessageContent] = useState("");

    const handleNewMessageChange = (event) => {
        setNewMessageContent(event.target.value);
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (newMessageContent.trim() !== "") {
            sendMessageToServer(email, selectedEmail, newMessageContent);
            setNewMessageContent("");

            const newMessage = {
                id: allMessages.length + 1,
                sender: email,
                receiver: selectedEmail,
                content: newMessageContent,
                timestamp: new Date().toISOString(),
            };

            setAllMessages([...allMessages, newMessage]);

            // Update latestMessages with the new message
            const updatedLatestMessages = latestMessages.map((message) => {
                if (
                    (message.sender === email && message.receiver === selectedEmail) ||
                    (message.sender === selectedEmail && message.receiver === email)
                ) {
                    return newMessage;
                }
                return message;
            });

            setLatestMessages(updatedLatestMessages);

            setTimeout(() => {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }, 100);
        }
    };

    const handleNewMembre = () => {
        alert("Fonctionnalité en cours de développement");
    };

    return (
        <div className="body_private">
            <HeaderPrivate />
            <main>
                <nav>
                    <NavBarHome />
                </nav>
                <div className="global">
                    <div className="Contact">
                        <div className="contact_header">
                            <h2>Messages</h2>
                            <div className="contact_add">
                                <IconCirclePlus size={36} onClick={handleNewMembre} />
                            </div>
                        </div>
                        {latestMessages.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                    </div>
                    <div className="message_content">
                        <div className="scrollbar_msg" ref={scrollRef}>
                            {/* Utilisez le composant MessageSend pour afficher les messages sélectionnés */}
                            {selectedMessages
                                .slice()
                                .reverse()
                                .map((message, index) => (
                                    <MessageSend key={index} message={message} />
                                ))}
                        </div>
                        {/* Afficher la partie formulaire seulement si un email est clicker */}
                        {selectedEmail && (
                            <div className="message_action">
                                <form onSubmit={handleSendMessage}>
                                    <input
                                        type="text"
                                        placeholder="Envoyer un message..."
                                        value={newMessageContent}
                                        onChange={handleNewMessageChange}
                                    />
                                </form>
                            </div>
                        )}
                    </div>
                    {/* <div className='box_search_contact'>
            <div className='search_contact'>
              <h1 className='title'>Rechercher un contact</h1>
              <div className='close'>
                <IconX size={36} />
              </div>
              <input type='text' placeholder='Rechercher un contact...' />
            </div>
          </div> */}
                </div>
            </main>
        </div>
    );
};

export default Messagerie;
