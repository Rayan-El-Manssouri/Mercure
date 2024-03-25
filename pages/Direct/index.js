// Importation des modules / icons
import React, { useEffect, useState } from 'react';
import ConversationData from './components/ConversationData';
import jwt from 'jsonwebtoken';
import { IconCamera, IconFolder, IconFolderUp, IconPhoneCall, IconSend } from '@tabler/icons-react';
import io from 'socket.io-client';

// Immport des composants personalisé
import Message from './components/Message';
import { Majax } from '../Majax/Majax';
import Search from './components/Search';
import Info from './components/Info';
import SideBar from "../components/SideBar/SideBar";

// Initialisation de l'url de socket
const socket = io('http://localhost:4000');

export default function Direct() {
    // Initialisations des states
    const [conversationData, setConversationData] = useState({});
    const [activeConversation, setActiveConversation] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    // Initialisations de la class gérant l'api plus facillement
    const majax = new Majax();

    // Récupération des conversations de l'utilisateur
    const getConv = async () => {
        try {
            const token = localStorage.getItem('token');
            const convData = await majax.getConv(token);
            setConversationData(convData);
        } catch (err) {
            console.log("Erreur dans la récupération des conversations :", err);
        }
    };

    useEffect(() => {
        getConv();
    }, []);

    useEffect(() => {
        // On écoute le signale sur message pour le rajouter à la liste
        socket.on('message', (data) => {
            // Vérifier si la liste de messages pour le destinataire existe déjà dans conversationData
            const receiver = data.receiver;
            const decoded = jwt.decode(majax.getToken(), process.env.JWT_SECRET);
            const sender = data.sender == decoded.name ? "you" : data.sender;

            const newMessage = {
                content: data.content,
                sender: sender,
                messageTime: data.messageTime
            };
            
            const keyToUpdate = (sender === "you") ? receiver : sender;
            
            setConversationData(prevData => {
                const updatedMessages = {
                    ...prevData.messages,
                    [keyToUpdate]: [
                        ...(prevData.messages[keyToUpdate] || []),
                        newMessage
                    ]
                };
            
                console.log(updatedMessages);
                return {
                    ...prevData,
                    messages: updatedMessages
                };
            });
            
        });


        return () => {
            socket.off('message');
        };

    }, [conversationData]);

    // Gestion d'une variable de la conversation
    const handleConversationClick = (conversation) => {
        setActiveConversation(conversation);
    };

    // Fonction pour envoyer un message
    const sendMessage = async () => {
        try {
            // Récupérer le contenu du nouveau message et le temps du message
            const content = newMessage;
            const messageTime = new Date().toISOString(); // Utilisation de la date actuelle pour le temps du message

            // Vérifier si le contenu du message n'est pas vide
            if (content.trim() === "") {
                console.error("Le contenu du message ne peut pas être vide.");
                return;
            }

            // Récupérer le token d'authentification depuis le localStorage
            const token = localStorage.getItem('token');

            // Vérifier si une conversation est active
            if (!activeConversation) {
                console.error("Aucune conversation active.");
                return;
            }

            // Envoyer le message via l'API Majax
            const response = await majax.sendMessage(token, activeConversation.name, content, messageTime, activeConversation.email);

            // Réinitialiser le champ de saisie de nouveau message après l'envoi
            setNewMessage("");
        } catch (err) {
            console.error("Erreur lors de l'envoi du message :", err);
        }
    };

    // Racourcie pour envoyer les messages
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await sendMessage();
        }
    };

    return (
        <div className="flex flex-1 h-full">
            <SideBar activeItem={1} />
            <div className="flex flex-col">
                <Search />
                <ConversationData conversationData={conversationData} handleConversationClick={handleConversationClick} />
            </div>
            {activeConversation ? (
                <div className='w-full flex items-center flex-col'>
                    <div className='flex w-full border items-center border-t-0 border-r-0 border-l-0 p-1'>
                        <p style={{ fontFamily: "Cantarell" }}>{activeConversation.name}</p>
                        <div className='ml-auto flex'>
                            <IconPhoneCall className='stroke-1 hover:bg-gray-100 rounded' />
                            <IconCamera className='stroke-1 hover:bg-gray-100 rounded ml-2' />
                        </div>
                    </div>
                    <div className='flex flex-1 flex-row w-full overflow-auto h-full'>
                        {activeConversation && conversationData.messages && conversationData.messages[activeConversation.name] && (
                            <div className="w-full overflow-auto p-1 flex flex-col" >
                                {conversationData.messages[activeConversation.name].map((message, index) => {
                                    const isLastMessage = index === conversationData.messages[activeConversation.name].length - 1 || conversationData.messages[activeConversation.name][index + 1]?.sender !== message.sender;
                                    const isCurrentUser = message.sender === 'you';

                                    return (
                                        <Message key={index} message={message} isLastMessage={isLastMessage} isCurrentUser={isCurrentUser} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className='w-full flex mt-auto p-1'>
                        <div>
                            <IconFolderUp className='stroke-1 ml-1 mr-1 hover:bg-gray-200 rounded p-1 w-8 h-8 cursor-pointer' />
                        </div>
                        <div className="flex flex-row items-center border focus-within:border-purple-400 w-full rounded p-1 ">
                            <IconSend className='w-4 transition-all stroke-1 mr-1 ml-1' />
                            <input
                                className="w-full outline-none caret-purple-500 text-sm"
                                placeholder='Envoyer un message...'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {newMessage.length > 0 && (
                                <p className='mr-1 ml-1 text-sm text-purple-400' style={{ whiteSpace: 'nowrap' }}>Send</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Info />
            )}
        </div >
    );
}