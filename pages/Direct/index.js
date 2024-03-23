import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar/SideBar";
import Search from './components/Search';
import Info from './components/Info';
import ConversationData from './components/ConversationData';

import { Majax } from '../Majax/Majax';
import { IconFolder, IconSearch } from '@tabler/icons-react';

export default function Direct() {
    const [conversationData, setConversationData] = useState({});
    const [users, setUsers] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const majax = new Majax();

    const openNewConversationDialog = () => {
        majax.getUsers()
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

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

    const handleConversationClick = (conversation) => {
        setActiveConversation(conversation);
    };

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
    
            // Envoyer le message via l'API majax.sendMessage()
            const response = await majax.sendMessage(token, activeConversation.name, content, messageTime, activeConversation.email);
    
            // Réinitialiser le champ de saisie de nouveau message après l'envoi
            setNewMessage("");
        } catch (err) {
            console.error("Erreur lors de l'envoi du message :", err);
        }
    };
    

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
                <Search openNewConversationDialog={openNewConversationDialog} />
                <ConversationData conversationData={conversationData} handleConversationClick={handleConversationClick} />
            </div>

            {activeConversation ? (
                <div className='w-full mt-auto p-1 flex items-center'>
                    <IconFolder className='stroke-1 ml-1 mr-1 hover:bg-gray-200 rounded p-1 w-8 h-8 cursor-pointer' />
                    <div className="flex flex-row items-center border focus-within:border-purple-400 w-full rounded p-1 ">
                        <IconSearch className='w-4 stroke-1 mr-1 ml-1' />
                        <input
                            className="w-full outline-none caret-purple-500 text-sm"
                            placeholder='Envoyer un message...'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    
                </div>
            ) : (
                <Info openNewConversationDialog={openNewConversationDialog} />
            )}

        </div >
    );
}