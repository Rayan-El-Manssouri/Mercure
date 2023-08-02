/* eslint-disable no-unused-vars */
import { IconCirclePlus, IconX, IconUserCircle } from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import HeaderPrivate from "../components/HeaderPrivate";
import NavBarHome from "../components/NavBarHome";
import axios from "axios";
import io from "socket.io-client";
import { set } from "date-fns";

const MessageSend = ({ message }) => {
    const { sender, content, isNewMessage } = message;
    const isSentByMe = sender === localStorage.getItem("email");

    return (
        <div className={`message_conteneur ${message.isNewMessage ? "new-message" : ""}`}>

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
    const [latestMessages, setLatestMessages] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const scrollRef = useRef();
    const [newMessageContent, setNewMessageContent] = useState("");
    const [isNewMessageReceived, setIsNewMessageReceived] = useState(false);
    const [userAccounts, setUserAccounts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const messagesResponse = await fetch("http://localhost:8000/Message.txt");
                const messagesData = await messagesResponse.json();
                const accountsResponse = await fetch("http://localhost:8000/Compte.txt");
                const accountsData = await accountsResponse.json();
                const filteredMessages = messagesData.filter(
                    (message) => message.sender === email || message.receiver === email
                );
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

                // Set latestMessages with unique messages sorted by timestamp
                const latestMessagesWithDuplicates = Object.values(groupedMessages);
                latestMessagesWithDuplicates.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp) || a.id - b.id
                );
                const latestMessagesByUser = Array.from(
                    new Map(latestMessagesWithDuplicates.map((message) => [message.id, message])).values()
                );
                setLatestMessages(latestMessagesByUser);
                setAllMessages(filteredMessages);
                setUserAccounts(accountsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchData();
    }, [email]);


    useEffect(() => {
        // Update selectedMessages when selectedEmail changes
        if (selectedEmail) {
            const filteredMessages = allMessages.filter(
                (message) =>
                    (message.sender === selectedEmail && message.receiver === email) ||
                    (message.sender === email && message.receiver === selectedEmail),
            );
            filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setSelectedMessages(filteredMessages);
        }
    }, [selectedEmail, allMessages, email]);

    useEffect(() => {
        // Créer une instance socket.io-client et se connecter au serveur
        const socket = io("http://localhost:8000");

        // Écouter l'événement 'new_message' émis par le serveur
        socket.on("new_message", (newMessage) => {
            // Vérifier si le message existe déjà dans latestMessages
            const isMessageAlreadyInList = selectedMessages.some((message) => message.id === newMessage.id);

            if (!isMessageAlreadyInList) {
                // Ajouter la propriété isNewMessage au nouveau message
                newMessage.isNewMessage = true;

                // Définir isNewMessageReceived sur true après avoir mis à jour selectedMessages
                setIsNewMessageReceived(true);
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
                setSelectedMessages((prevMessages) => [...prevMessages, newMessage]);
                setIsNewMessageReceived(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [selectedEmail, latestMessages, selectedMessages, email, isNewMessageReceived]);



    const Message = ({ message }) => {
        const { sender, receiver } = message;

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
                    <p className="user_message">
                        {latestMessage && latestMessage.sender === email
                            ? `Vous: ${latestMessage.content}`
                            : latestMessage.content
                        }
                    </p>
                </div>
            </section>
        );
    };

    const sendMessageToServer = async (sender, receiver, content) => {
        try {
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



    const handleNewMessageChange = (event) => {
        setNewMessageContent(event.target.value);
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (newMessageContent.trim() !== "") {
            try {
                // Envoi du message au serveur
                // Après l'envoi du message au serveur avec succès
                await sendMessageToServer(email, selectedEmail, newMessageContent);
                setNewMessageContent("");

                // Créez un nouvel objet pour le nouveau message
                const newMessage = {
                    id: allMessages.length + 1,
                    sender: email,
                    receiver: selectedEmail,
                    content: newMessageContent,
                    timestamp: new Date().toISOString(),
                    isNewMessage: true,
                };

                // Mettez à jour l'état "selectedMessages" en ajoutant le nouveau message au début du tableau

                // Effectuer le défilement vers le bas ici, juste après avoir ajouté le nouveau message
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            } catch (error) {
                console.error("Erreur lors de l'envoi du message:", error);
            }
        }
    };

    useEffect(() => {
        // Update selectedMessages when selectedEmail changes
        if (selectedEmail) {
            const filteredMessages = allMessages.filter(
                (message) =>
                    (message.sender === selectedEmail && message.receiver === email) ||
                    (message.sender === email && message.receiver === selectedEmail),
            );
            filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setSelectedMessages(filteredMessages);
        }
    }, [selectedEmail, allMessages, email, isNewMessageReceived]);

    const [selectedContactEmail, setSelectedContactEmail] = useState(null);

    const handleNewMembre = (email) => {
        setSelectedEmail(email);
        setSelectedMessages([]);
        setSelectedContactEmail(email);
        handleModalClick();
    };

    const [chatContainerHeight, setChatContainerHeight] = useState();

    useEffect(() => {
        // Update chat container height and scroll to bottom when selectedMessages change
        const fixChatContainerHeight = () => {
            const chatContainer = document.querySelector('.scrollbar_msg');
            const messageInput = document.querySelector('.message_action input');
            if (chatContainer && messageInput) {
                const height =
                    window.innerHeight -
                    chatContainer.getBoundingClientRect().top -
                    messageInput.getBoundingClientRect().height;
                setChatContainerHeight(height);
                chatContainer.scrollTo(0, chatContainer.scrollHeight, {
                    behavior: 'initial',
                });
            }
        };
        window.addEventListener('resize', fixChatContainerHeight);
        fixChatContainerHeight(); // Call once to set initial height

        return () => {
            window.removeEventListener('resize', fixChatContainerHeight);
        };
    }, [selectedMessages]);

    // Créé un état pour stocker le display de la modal
    const [modalDisplay, setModalDisplay] = useState("none");

    // Fonction pour changer le display de la modal
    const handleModalClick = () => {
        if (modalDisplay === "none") {
            setModalDisplay("flex");
        } else {
            setModalDisplay("none");
        }
    };

    const Contact = () => {
        const [activeIndex, setActiveIndex] = useState(-1);
        const [accounts, setAccounts] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');

        useEffect(() => {
            fetch('http://localhost:8000/Compte.txt')
                .then(response => response.json())
                .then(data => setAccounts(data))
                .catch(error => console.error('Erreur lors de la récupération des comptes:', error));
        }, []);

        const handleDivClick = (index) => {
            setActiveIndex(index);
        };

        const handleSearchInputChange = (event) => {
            setSearchTerm(event.target.value);
        };

        const filteredAccounts = accounts.filter(account => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const lowerCasePseudo = account.pseudo.toLowerCase();
            const lowerCaseNomMessage = account.NomMessage.toLowerCase();
            return lowerCasePseudo.includes(lowerCaseSearchTerm) || lowerCaseNomMessage.includes(lowerCaseSearchTerm);
        });

        const handleButtonClick = (event, index) => {
            event.stopPropagation();
            handleNewMembre(filteredAccounts[index].email);
            handleModalClick();
        };

        return (
            <div className="list_user_contact">
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        placeholder="Rechercher un contact..."
                    />
                </div>
                <div className="scrollbar_list_contact"  >
                    {filteredAccounts.map((account, index) => (
                        <section
                            key={index}
                            className={`contact_section ${activeIndex === index ? "active" : ""}`}
                            onClick={() => handleDivClick(index)}
                        >
                            <div>
                                <IconUserCircle size={56} />
                            </div>
                            <div className='contact_user_section'>
                                <p className='pseudo'>{account.pseudo}</p>
                                <p className='sous_pseudo'>{account.NomMessage}</p>
                            </div>
                            {activeIndex === index && <button onClick={(event) => handleButtonClick(event, index)}>Confirmer / Discuter</button>}
                        </section>
                    ))}
                </div>
            </div>
        );
    };

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [selectedMessages]);

    return (
        <div className="body_private">
            <HeaderPrivate />
            <main>
                <nav>
                    <NavBarHome />
                </nav>
                <div className="global">
                    <div className="Contact" >
                        <div className="contact_header">
                            <h2>Messages</h2>
                            <div className="contact_add" onClick={handleModalClick}>
                                <IconCirclePlus size={36} />
                            </div>
                        </div>
                        {latestMessages.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                    </div>
                    <div className="message_content" style={{ flex: 1 }}  >
                        <div className="scrollbar_msg" ref={scrollRef} style={{ height: `${chatContainerHeight}px` }}>
                            {/* Condition pour afficher les messages seulement lorsque l'email est sélectionné */}
                            {selectedEmail ? (
                                <div className="scrollbar_msg" >
                                    {selectedMessages.map((message, index) => (
                                        <MessageSend key={index} message={message} />
                                    ))}
                                </div>
                            ) : (
                                <div className="message_action">
                                    <p>Sélectionnez un contact pour afficher les messages.</p>
                                </div>
                            )}
                            {/* Afficher la partie formulaire seulement si un email est cliqué */}
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
                    </div>
                    <div className='box_search_contact' style={{ display: modalDisplay }}>
                        <div className='search_contact'>
                            <h1 className='title'>Rechercher un contact</h1>
                            <div className='close' onClick={handleModalClick}>
                                <IconX size={36} />
                            </div>
                            <Contact onContactClick={handleNewMembre} />
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default Messagerie;