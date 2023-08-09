import { IconCirclePlus, IconX, IconUserCircle } from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import HeaderPrivate from "../components/HeaderPrivate";
import NavBarHome from "../components/NavBarHome";
import Majax from "../components/Majax/Majax";

const MessageSend = ({ message }) => {
    const { sender, content } = message;
    const isSentByMe = sender === localStorage.getItem("email");

    return (
        <div className={`message_conteneur`}>

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
    const scrollRef = useRef();
    const [latestMessages, setLatestMessages] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [isNewMessageReceived, setIsNewMessageReceived] = useState(false);
    const [userAccounts, setUserAccounts] = useState([]);
    const [newMessageContent, setNewMessageContent] = useState(() => '');

    useEffect(() => {
        const fetchData = async () => {
            const majax = new Majax();
            await majax.init("http://localhost:8000/api", "apikey");
            try {
                const messagesResponse = await majax.fetchUser('http://localhost:8000/api', email, "apikey", "fetchUserFilter");
                const messagesData = messagesResponse;
                const accountsResponse = await majax.fetchUserUniqueComunity("http://localhost:8000/api", email, "apikey", "fetchUserUniqueComunity");
                const latestMessagesByUser = Object.values(messagesData);
                setLatestMessages(latestMessagesByUser);
                setAllMessages(messagesData);
                setUserAccounts(accountsResponse);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };
        fetchData();
    }, [email]);

    useEffect(() => {
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

    const Message = ({ id }) => {

        const handleClick = () => {
            setSelectedEmail(userAccounts[id]);
        };

        return (
            <section onClick={handleClick}>
                <div>
                    <IconUserCircle size={56} />
                </div>
                <div className="contact_user_section">
                    <p className="pseudo">{userAccounts[id]}</p>
                </div>
            </section>
        );
    };

    const sendMessageToServer = async (Sender, Receiver, Content) => {
        const majax = new Majax();
        await majax.init("http://localhost:8000/api", "apikey");
        try {
          const response = await majax.sendMessage("http://localhost:8000/api", "apikey", "sendMessage", Content, Receiver, new Date().toISOString(), Sender);
          const responseData = response;
          setIsNewMessageReceived(true);
      
          // Mise à jour des messages locaux avec le nouveau message envoyé
          const newMessage = {
            id: responseData.id,
            sender: Sender,
            receiver: Receiver,
            content: Content,
            timestamp: responseData.timestamp,
            isNewMessage: true,
          };
      
          // Mettre à jour la liste des messages
          setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      
          // Mettre à jour les messages sélectionnés si l'utilisateur est actuellement en conversation avec le destinataire
          if (selectedEmail === Receiver) {
            setSelectedMessages((prevMessages) => [...prevMessages, newMessage]);
          } else {
            // Sinon, mettez à jour les derniers messages pour mettre à jour la liste de contacts
            const updatedLatestMessages = latestMessages.map((message) => {
              if ((message.sender === Sender && message.receiver === Receiver) || (message.sender === Receiver && message.receiver === Sender)) {
                return newMessage;
              }
              return message;
            });
            setLatestMessages(updatedLatestMessages);
          }
      
          return responseData;
        } catch (error) {
          console.error("Erreur lors de l'envoi du message:", error);
        }
    };
      
    const handleSendMessage = async (event) => {
        event.preventDefault();
        try {
            await sendMessageToServer(email, selectedEmail, newMessageContent);
            setNewMessageContent("");
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        } catch (error) {
            console.error("Erreur lors de l'envoi du message:", error);
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

    const handleNewMembre = (email) => {
        setSelectedEmail(email);
        setSelectedMessages([]);
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
        const [accounts] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');

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
                                <p className='nom'>{account.NomMessage}</p>
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
                        {userAccounts.map((message, index) => (
                            <Message key={index} message={message} id={index} />
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
                                            onChange={(event) => setNewMessageContent(event.target.value)}
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